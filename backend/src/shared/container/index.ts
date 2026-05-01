import { container } from 'tsyringe';

import { NfceProvider } from '../../modules/receipts/providers/nfce-provider';
import { SpNfceProvider } from '../../modules/receipts/providers/sp-nfce.provider';
import { ParsedReceipt } from '../../modules/receipts/domain/parsed-receipt';
import { ReceiptsRepository } from '../../modules/receipts/repositories/receipts.repository';
import { CreateReceiptService } from '../../modules/receipts/services/create-receipt.service';

class PurchasesImportGatewayImpl {
  async importParsedReceipt(receipt: ParsedReceipt, userId: string): Promise<{ id: string }> {
    const receiptsRepository = new ReceiptsRepository();
    const service = new CreateReceiptService(receiptsRepository);

    const result = await service.execute({
      userId,
      sourceType: 'IMPORTED',
      externalCode: receipt.accessKey || undefined,
      totalAmount: receipt.total ?? 0,
      purchasedAt: receipt.issuedAt ?? new Date().toISOString(),
      market: {
        name: receipt.storeName ?? 'Mercado desconhecido',
        cnpj: receipt.storeDocument ?? undefined,
        state: receipt.state ?? undefined,
      },
      items: receipt.items
        .filter((item) => item.unitPrice != null)
        .map((item) => ({
          nameRaw: item.description,
          unit: item.unit ?? undefined,
          quantity: item.quantity ?? undefined,
          unitPrice: item.unitPrice as number,
          totalPrice: item.totalPrice ?? undefined,
        })),
    });

    return { id: result.receipt.id };
  }
}

const nfceProviders: NfceProvider[] = [new SpNfceProvider()];

container.registerInstance('NfceProviders', nfceProviders);
container.registerSingleton('PurchasesImportGateway', PurchasesImportGatewayImpl);