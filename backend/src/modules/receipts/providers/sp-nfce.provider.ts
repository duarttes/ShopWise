import axios from 'axios';
import * as cheerio from 'cheerio';

import { ParsedReceipt, ParsedReceiptItem } from '../domain/parsed-receipt';
import { NfceProvider } from './nfce-provider';
import { NfceScanResult } from '../utils/parse-nfce-scan';

export class SpNfceProvider implements NfceProvider {
  canHandle(scan: NfceScanResult): boolean {
    return (
      scan.state === 'SP' ||
      !!scan.url?.toLowerCase().includes('fazenda.sp.gov.br') ||
      !!scan.url?.toLowerCase().includes('nfce.fazenda.sp.gov.br')
    );
  }

  async fetchReceipt(scan: NfceScanResult): Promise<ParsedReceipt> {
    if (!scan.url) {
      throw new Error('URL da NFC-e não encontrada para o provider SP.');
    }

    const response = await axios.get<string>(scan.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36',
      },
      timeout: 15000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const accessKey =
      scan.accessKey ||
      this.extractAccessKeyFromHtml(html) ||
      this.extractAccessKeyFromUrl(scan.url) ||
      '';

    const storeName =
      this.firstText($, [
        '#u20',
        '.txtTopo',
        '.txtCenter',
        '.txtTit',
        'div.txtTopo',
      ]) || this.extractStoreNameFallback($);

    const issuedAt =
      this.findLabelValue($, ['Data de Emissão', 'Emissão']) ||
      this.extractIssuedAtFallback(html);

    const total =
      this.parseBrazilianCurrency(
        this.findLabelValue($, ['Valor total', 'Valor a pagar', 'Total'])
      ) || this.extractTotalFallback(html);

    const storeDocument =
      this.findLabelValue($, ['CNPJ', 'CPF']) ||
      this.extractDocumentFallback(html);

    const items = this.extractItems($);

    return {
      accessKey,
      state: 'SP',
      url: scan.url,
      issuedAt,
      storeName,
      storeDocument,
      total,
      items,
    };
  }

  private extractItems($: cheerio.CheerioAPI): ParsedReceiptItem[] {
    const items: ParsedReceiptItem[] = [];

    $('.txtTit, .item, tr, li').each((_, element) => {
      const root = $(element);
      const text = root.text().replace(/\s+/g, ' ').trim();

      if (!text || text.length < 3) return;

      const description =
        root.find('.txtTit').first().text().trim() ||
        root.find('.descricao').first().text().trim() ||
        this.extractDescriptionFromText(text);

      if (!description) return;

      const quantity = this.extractNumberByPatterns(text, [
        /Qtde\.?:?\s*([\d.,]+)/i,
        /Quantidade:?\s*([\d.,]+)/i,
      ]);

      const unit = this.extractTextByPatterns(text, [
        /UN:?\s*([A-ZÀ-Úa-zà-ú]+)/i,
        /Unidade:?\s*([A-ZÀ-Úa-zà-ú]+)/i,
      ]);

      const unitPrice = this.extractCurrencyByPatterns(text, [
        /Vl\.?\s*Unit\.?:?\s*([\d.,]+)/i,
        /Valor Unit[aá]rio:?\s*([\d.,]+)/i,
      ]);

      const totalPrice = this.extractCurrencyByPatterns(text, [
        /Vl\.?\s*Total:?\s*([\d.,]+)/i,
        /Valor Total:?\s*([\d.,]+)/i,
        /R\$\s*([\d.,]+)/i,
      ]);

      const gtin = this.extractTextByPatterns(text, [/GTIN:?\s*(\d+)/i]);
      const brandText = this.extractBrandHint(description);

      const alreadyExists = items.some(
        (item) =>
          item.description === description &&
          item.totalPrice === totalPrice &&
          item.quantity === quantity,
      );

      if (!alreadyExists) {
        items.push({
          description,
          quantity,
          unit,
          unitPrice,
          totalPrice,
          gtin,
          brandText,
        });
      }
    });

    return items.filter((item) => item.description.length >= 2);
  }

  private extractDescriptionFromText(text: string): string {
    const sanitized = text
      .replace(/Qtde\.?:?\s*[\d.,]+/gi, '')
      .replace(/Vl\.?\s*Unit\.?:?\s*[\d.,]+/gi, '')
      .replace(/Vl\.?\s*Total:?\s*[\d.,]+/gi, '')
      .replace(/R\$\s*[\d.,]+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    return sanitized.slice(0, 180);
  }

  private extractBrandHint(description: string): string | undefined {
    const tokens = description.split(' ').filter(Boolean);
    if (!tokens.length) return undefined;

    const first = tokens[0];
    if (first.length >= 3) return first;

    return undefined;
  }

  private firstText(
    $: cheerio.CheerioAPI,
    selectors: string[],
  ): string | undefined {
    for (const selector of selectors) {
      const value = $(selector).first().text().replace(/\s+/g, ' ').trim();
      if (value) return value;
    }

    return undefined;
  }

  private findLabelValue(
    $: cheerio.CheerioAPI,
    labels: string[],
  ): string | undefined {
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

    for (const label of labels) {
      const regex = new RegExp(`${label}\\s*:??\\s*([^\\n\\r|]+)`, 'i');
      const match = bodyText.match(regex);
      if (match?.[1]) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  private extractAccessKeyFromUrl(url: string): string | undefined {
    const cleaned = url.replace(/\D/g, '');
    const match = cleaned.match(/\d{44}/);
    return match?.[0];
  }

  private extractAccessKeyFromHtml(html: string): string | undefined {
    const cleaned = html.replace(/\D/g, '');
    const match = cleaned.match(/\d{44}/);
    return match?.[0];
  }

  private extractIssuedAtFallback(html: string): string | undefined {
    const match = html.match(
      /(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/i,
    );

    return match?.[1];
  }

  private extractDocumentFallback(html: string): string | undefined {
    const match = html.match(
      /\b(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})\b/,
    );

    return match?.[1];
  }

  private extractStoreNameFallback($: cheerio.CheerioAPI): string | undefined {
    const candidates = [
      $('title').first().text().trim(),
      $('h1').first().text().trim(),
      $('h2').first().text().trim(),
    ].filter(Boolean);

    return candidates[0];
  }

  private extractTotalFallback(html: string): number | undefined {
    const patterns = [
      /Valor total\s*:?\s*R\$\s*([\d.,]+)/i,
      /Valor a pagar\s*:?\s*R\$\s*([\d.,]+)/i,
      /Total\s*:?\s*R\$\s*([\d.,]+)/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        return this.parseBrazilianCurrency(match[1]);
      }
    }

    return undefined;
  }

  private extractNumberByPatterns(
    text: string,
    patterns: RegExp[],
  ): number | undefined {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        return this.parseBrazilianNumber(match[1]);
      }
    }

    return undefined;
  }

  private extractCurrencyByPatterns(
    text: string,
    patterns: RegExp[],
  ): number | undefined {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        return this.parseBrazilianCurrency(match[1]);
      }
    }

    return undefined;
  }

  private extractTextByPatterns(
    text: string,
    patterns: RegExp[],
  ): string | undefined {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  private parseBrazilianCurrency(value?: string): number | undefined {
    if (!value) return undefined;
    return this.parseBrazilianNumber(value);
  }

  private parseBrazilianNumber(value?: string): number | undefined {
    if (!value) return undefined;

    const normalized = value.replace(/\./g, '').replace(',', '.').trim();
    const parsed = Number(normalized);

    if (Number.isNaN(parsed)) return undefined;
    return parsed;
  }
}