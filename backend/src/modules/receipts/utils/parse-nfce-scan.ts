import { ImportFromNfceDTO } from '../dtos/import-from-nfce.dto';

export type NfceScanSource = 'qr_url' | 'access_key' | 'manual';

export interface NfceScanResult {
  rawText: string;
  url?: string;
  accessKey?: string;
  state?: string;
  source: NfceScanSource;
}

function normalizeRawText(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function extractUrl(text: string): string | undefined {
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match?.[0];
}

function extractAccessKey(text: string): string | undefined {
  const cleaned = text.replace(/\D/g, '');
  const exact44 = cleaned.match(/\d{44}/);
  return exact44?.[0];
}

function detectStateFromUrl(url?: string): string | undefined {
  if (!url) return undefined;

  const normalizedUrl = url.toLowerCase();

  if (
    normalizedUrl.includes('nfce.fazenda.sp.gov.br') ||
    normalizedUrl.includes('fazenda.sp.gov.br')
  ) {
    return 'SP';
  }

  if (normalizedUrl.includes('sefaz.rs.gov.br')) return 'RS';
  if (normalizedUrl.includes('sefaz.es.gov.br')) return 'ES';
  if (normalizedUrl.includes('sefaz.ba.gov.br')) return 'BA';
  if (normalizedUrl.includes('sefaz.ce.gov.br')) return 'CE';
  if (normalizedUrl.includes('sefaz.pe.gov.br')) return 'PE';
  if (normalizedUrl.includes('fazenda.rj.gov.br')) return 'RJ';
  if (normalizedUrl.includes('fazenda.pr.gov.br')) return 'PR';
  if (normalizedUrl.includes('sefaz.mt.gov.br')) return 'MT';
  if (normalizedUrl.includes('sefaz.am.gov.br')) return 'AM';
  if (normalizedUrl.includes('sefaz.go.gov.br')) return 'GO';
  if (normalizedUrl.includes('sefaz.se.gov.br')) return 'SE';

  return undefined;
}

export function parseNfceScan(input: ImportFromNfceDTO): NfceScanResult {
  const rawCandidate = input.rawText || input.url || input.accessKey || '';
  const rawText = normalizeRawText(rawCandidate);

  const url = input.url || extractUrl(rawText);
  const accessKey = input.accessKey || extractAccessKey(rawText);
  const state = detectStateFromUrl(url);

  let source: NfceScanSource = 'manual';

  if (url) source = 'qr_url';
  else if (accessKey) source = 'access_key';

  return {
    rawText,
    url,
    accessKey,
    state,
    source,
  };
}