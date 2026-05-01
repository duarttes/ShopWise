import { AppError } from "../../../shared/errors/app-error";
import { parseSpNfceQrCode } from "../parsers/sp-nfce-qr-code.parser";
import { parseSpNfceHtml } from "../parsers/sp-nfce-html.parser";
import { FetchSpReceiptDTO } from "../dtos/fetch-sp-receipt.dto";

const SEFAZ_SP_CONSULTA_URL =
  "https://www.nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx";

function hasCaptcha(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("captcha") ||
    lower.includes("recaptcha") ||
    lower.includes("digite os caracteres") ||
    lower.includes("não sou um robô") ||
    lower.includes("nao sou um robo") ||
    lower.includes("verificação de segurança") ||
    (lower.includes("verificacao") && lower.includes("seguranca"))
  );
}

async function fetchViaSefazXml(accessKey: string) {
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeConsultaProtocolo4">
      <consSitNFe versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe">
        <tpAmb>1</tpAmb>
        <xServ>CONSULTAR</xServ>
        <chNFe>${accessKey}</chNFe>
      </consSitNFe>
    </nfeDadosMsg>
  </soap12:Body>
</soap12:Envelope>`;

  const response = await fetch(SEFAZ_SP_CONSULTA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml; charset=utf-8",
      "User-Agent": "ShopWise/1.0",
    },
    body: soapBody,
  });

  if (!response.ok) {
    throw new AppError(
      `SEFAZ webservice returned HTTP ${response.status}`,
      502
    );
  }

  return response.text();
}

function parseXmlValue(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([^<]+)<\/${tag}>`, "i");
  const match = xml.match(regex);
  return match?.[1]?.trim() ?? null;
}

function parseXmlItems(xml: string) {
  const items: Array<{
    nameRaw: string;
    code: string | null;
    quantity: number | null;
    unit: string | null;
    unitPrice: number | null;
    totalPrice: number | null;
  }> = [];

  const detRegex = /<det[^>]*>([\s\S]*?)<\/det>/gi;
  let detMatch;

  while ((detMatch = detRegex.exec(xml)) !== null) {
    const det = detMatch[1];
    const nameRaw = parseXmlValue(det, "xProd") ?? "";
    if (!nameRaw) continue;

    const qCom = parseXmlValue(det, "qCom");
    const uCom = parseXmlValue(det, "uCom");
    const vUnCom = parseXmlValue(det, "vUnCom");
    const vProd = parseXmlValue(det, "vProd");
    const cProd = parseXmlValue(det, "cProd");

    items.push({
      nameRaw,
      code: cProd,
      quantity: qCom ? parseFloat(qCom.replace(",", ".")) : null,
      unit: uCom,
      unitPrice: vUnCom ? parseFloat(vUnCom.replace(",", ".")) : null,
      totalPrice: vProd ? parseFloat(vProd.replace(",", ".")) : null,
    });
  }

  return items;
}

function buildReceiptFromXml(xml: string, accessKey: string) {
  const name = parseXmlValue(xml, "xNome");
  const cnpj = parseXmlValue(xml, "CNPJ");
  const xLgr = parseXmlValue(xml, "xLgr");
  const nro = parseXmlValue(xml, "nro");
  const xBairro = parseXmlValue(xml, "xBairro");
  const xMun = parseXmlValue(xml, "xMun");
  const UF = parseXmlValue(xml, "UF");
  const dhEmi = parseXmlValue(xml, "dhEmi");
  const vNF = parseXmlValue(xml, "vNF");
  const vPag = parseXmlValue(xml, "vPag");
  const nNF = parseXmlValue(xml, "nNF");
  const serie = parseXmlValue(xml, "serie");

  const address = [xLgr, nro, xBairro, xMun, UF]
    .filter(Boolean)
    .join(", ");

  const items = parseXmlItems(xml);

  const issuedAt = dhEmi
    ? new Date(dhEmi).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    : null;

  const totalAmount = vNF ? parseFloat(vNF) : null;
  const amountToPay = vPag ? parseFloat(vPag) : null;

  return {
    issuer: {
      name: name ?? null,
      cnpj: cnpj ?? null,
      address: address || null,
      city: xMun ?? null,
      state: UF ?? null,
    },
    items,
    totals: {
      itemsCount: items.length,
      totalAmount,
      discountsAmount: null,
      amountToPay: amountToPay ?? totalAmount,
      changeAmount: null,
    },
    payments: [],
    receiptInfo: {
      number: nNF ?? null,
      series: serie ?? null,
      issuedAt,
      protocol: null,
      accessKey,
      environment: "Ambiente de Produção",
    },
    parsing: {
      confidenceScore: items.length > 0 ? 85 : 40,
      warnings: items.length === 0 ? ["XML parsed but no items found"] : [],
    },
  };
}

export class FetchSpReceiptService {
  async execute(data: FetchSpReceiptDTO) {
    const qrCodeData = parseSpNfceQrCode(data.url);

    // Tenta scraping normal primeiro
    let html: string | null = null;
    let scrapingFailed = false;

    try {
      const response = await fetch(data.url, {
        method: "GET",
        headers: { "User-Agent": "Mozilla/5.0 ShopWise/1.0" },
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        html = await response.text();
      }
    } catch {
      scrapingFailed = true;
    }

    // Se o HTML tem CAPTCHA ou scraping falhou, tenta webservice SEFAZ
    if (!html || hasCaptcha(html) || scrapingFailed) {
      if (!qrCodeData.accessKey) {
        throw new AppError(
          "Não foi possível acessar a nota. A página exige verificação e a chave de acesso não está disponível.",
          503
        );
      }

      try {
        const xmlResponse = await fetchViaSefazXml(qrCodeData.accessKey);
        const receipt = buildReceiptFromXml(xmlResponse, qrCodeData.accessKey);

        if (receipt.items.length === 0) {
          throw new AppError(
            "A nota foi consultada via SEFAZ mas não retornou itens. Tente novamente mais tarde.",
            503
          );
        }

        return {
          qrCode: qrCodeData,
          receipt,
          source: "sefaz_xml",
        };
      } catch (err: any) {
        if (err instanceof AppError) throw err;
        throw new AppError(
          "Não foi possível consultar a nota. A página exige verificação humana (CAPTCHA). Tente novamente mais tarde.",
          503
        );
      }
    }

    const parsedReceipt = parseSpNfceHtml(html);

    return {
      qrCode: qrCodeData,
      receipt: parsedReceipt,
      source: "html_scraping",
    };
  }
}