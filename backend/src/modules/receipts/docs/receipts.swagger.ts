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
 *               market:
 *                 type: object
 *               externalCode:
 *                 type: string
 *               sourceType:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               purchasedAt:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Receipt created successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You are not allowed to create a receipt for another user
 *       404:
 *         description: User not found
 *       409:
 *         description: A receipt with this external code already exists
 */

/**
 * @swagger
 * /receipts:
 *   get:
 *     summary: List receipts for the authenticated user
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
 *       403:
 *         description: You are not allowed to access this receipt
 *       404:
 *         description: Receipt not found
 */

/**
 * @swagger
 * /markets/{id}/geocode:
 *   post:
 *     summary: Geocode a market using its stored address
 *     tags: [Markets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Market id
 *     responses:
 *       200:
 *         description: Market geocoded successfully
 *       404:
 *         description: Market not found
 *       422:
 *         description: Could not geocode market address
 */
export {};