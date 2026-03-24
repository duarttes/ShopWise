/**
 * @swagger
 * /qr-codes/import-sp-receipt:
 *   post:
 *     summary: Import a São Paulo NFC-e QR code URL as a ShopWise receipt
 *     tags: [QR Code Ingestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - url
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 0f9d4a1b-0f9d-4a1b-8c0f-9d4a1b8c0f9d
 *               url:
 *                 type: string
 *                 example: https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260353533386000406653180000430951004007527|2|1|1|d2c212316206b3a4c892537981d033c1c44e765b
 *     responses:
 *       201:
 *         description: São Paulo receipt imported successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You are not allowed to import a receipt for another user
 *       409:
 *         description: Receipt already imported
 *       422:
 *         description: Required receipt fields could not be parsed
 *       502:
 *         description: Could not fetch the public consultation page
 */
export {};