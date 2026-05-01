// nfce-provider.ts
import { ParsedReceipt } from '../domain/parsed-receipt';
import { NfceScanResult } from '../utils/parse-nfce-scan';

export interface NfceProvider {
  canHandle(scan: NfceScanResult): boolean;
  fetchReceipt(scan: NfceScanResult): Promise<ParsedReceipt>;
}