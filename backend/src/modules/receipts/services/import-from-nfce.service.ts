import { inject, injectable } from 'tsyringe';

import { ImportFromNfceDTO } from '../dtos/import-from-nfce.dto';
import { ParsedReceipt } from '../domain/parsed-receipt';
import { NfceProvider } from '../providers/nfce-provider';
import { parseNfceScan } from '../utils/parse-nfce-scan';

interface ImportParsedReceiptResult {
  id: string;
}

interface PurchasesImportGateway {
  importParsedReceipt(receipt: ParsedReceipt, userId: string): Promise<ImportParsedReceiptResult>;
}

interface ExecuteResponse {
  receipt: ParsedReceipt;
  importedPurchaseId?: string;
  warnings: string[];
  previewOnly: boolean;
}

@injectable()
export class ImportFromNfceService {
  constructor(
    @inject('NfceProviders')
    private readonly providers: NfceProvider[],
    @inject('PurchasesImportGateway')
    private readonly purchasesImportGateway: PurchasesImportGateway,
  ) {}

  async execute(payload: ImportFromNfceDTO): Promise<ExecuteResponse> {
    const scan = parseNfceScan(payload);

    if (!scan.rawText) {
      throw new Error('Nenhum dado informado para leitura da NFC-e.');
    }

    const provider = this.providers.find((item) => item.canHandle(scan));

    if (!provider) {
      throw new Error('Nenhum provider compatível para esta NFC-e.');
    }

    const receipt = await provider.fetchReceipt(scan);

    const warnings: string[] = [];

    if (!receipt.items.length) {
      warnings.push('Nenhum item foi identificado na nota.');
    }

    if (!receipt.total) {
      warnings.push('Total da nota não identificado.');
    }

    if (!payload.confirmImport) {
      return {
        receipt,
        warnings,
        previewOnly: true,
      };
    }

    const importedPurchase = await this.purchasesImportGateway.importParsedReceipt(
      receipt,
      payload.userId,
    );

    return {
      receipt,
      importedPurchaseId: importedPurchase.id,
      warnings,
      previewOnly: false,
    };
  }
}