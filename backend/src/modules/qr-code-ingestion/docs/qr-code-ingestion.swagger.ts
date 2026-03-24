/**
 * @swagger
 * tags:
 *   name: QR Code Ingestion
 *   description: Receipt QR code parsing endpoints
 */

/**
 * @swagger
 * /qr-codes/parse:
 *   post:
 *     summary: Parse a receipt QR code URL
 *     tags: [QR Code Ingestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260353533386000406653180000430951004007527|2|1|1|d2c212316206b3a4c892537981d033c1c44e765b
 *     responses:
 *       200:
 *         description: QR code parsed successfully
 *       400:
 *         description: Unsupported QR code format or invalid URL
 */
export {};