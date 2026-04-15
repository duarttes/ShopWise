import { container } from 'tsyringe';

import { NfceProvider } from '../../modules/receipts/providers/nfce-provider';
import { SpNfceProvider } from '../../modules/receipts/providers/sp-nfce.provider';

// implementação temporária/adaptador
class PurchasesImportGatewayImpl {
  async importParsedReceipt(receipt: any): Promise<{ id: string }> {
    // TODO:
    // aqui você pluga no fluxo real do projeto
    // exemplo:
    // const service = container.resolve(ImportParsedReceiptService);
    // return service.execute(receipt);

    return {
      id: 'preview-temp-id',
    };
  }
}

const nfceProviders: NfceProvider[] = [new SpNfceProvider()];

container.registerInstance('NfceProviders', nfceProviders);

container.registerSingleton(
  'PurchasesImportGateway',
  PurchasesImportGatewayImpl,
);