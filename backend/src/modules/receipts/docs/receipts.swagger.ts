/**
 * @swagger
 * tags:
 *   name: Receipts
 *   description: Receipt management endpoints
 */

/**
 * @swagger
 * /receipts:
 *   post:
 *     summary: Create a new receipt
 *     tags: [Receipts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - market
 *               - totalAmount
 *               - purchasedAt
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 0f9d4a1b-0f9d-4a1b-8c0f-9d4a1b8c0f9d
 *               market:
 *                 type: object
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Supermarket Central
 *                   cnpj:
 *                     type: string
 *                     example: 12345678000199
 *                   city:
 *                     type: string
 *                     example: Americana
 *                   state:
 *                     type: string
 *                     example: SP
 *               externalCode:
 *                 type: string
 *                 example: NFE123456789
 *               sourceType:
 *                 type: string
 *                 example: MANUAL
 *               totalAmount:
 *                 type: number
 *                 example: 120.5
 *               purchasedAt:
 *                 type: string
 *                 example: 2026-03-18T12:00:00.000Z
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - nameRaw
 *                     - unitPrice
 *                   properties:
 *                     nameRaw:
 *                       type: string
 *                       example: BANANA NANICA KG
 *                     unit:
 *                       type: string
 *                       example: kg
 *                     quantity:
 *                       type: number
 *                       example: 1
 *                     unitPrice:
 *                       type: number
 *                       example: 5.99
 *                     totalPrice:
 *                       type: number
 *                       example: 5.99
 *                     productId:
 *                       type: string
 *                       example: 0f9d4a1b-0f9d-4a1b-8c0f-9d4a1b8c0f9d
 *     responses:
 *       201:
 *         description: Receipt created successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /receipts:
 *   get:
 *     summary: List all receipts
 *     tags: [Receipts]
 *     responses:
 *       200:
 *         description: Receipts retrieved successfully
 */

/**
 * @swagger
 * /receipts/{id}:
 *   get:
 *     summary: Get a receipt by id
 *     tags: [Receipts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receipt id
 *     responses:
 *       200:
 *         description: Receipt retrieved successfully
 *       404:
 *         description: Receipt not found
 */
export {};