/**
 * @swagger
 * /qr-codes/preview-sp-receipt-import:
 *   post:
 *     summary: Preview a São Paulo NFC-e import without saving the receipt
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
 *       200:
 *         description: Import preview generated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You are not allowed to preview an import for another user
 *       404:
 *         description: User not found
 *       502:
 *         description: Could not fetch the public consultation page
 */
export {};