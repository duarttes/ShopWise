/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Product analytics and price intelligence endpoints
 */

/**
 * @swagger
 * /analytics/products/{productId}/price-history:
 *   get:
 *     summary: Get the full price history for a product
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product price history retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /analytics/products/{productId}/latest-prices:
 *   get:
 *     summary: Get the latest known price for a product in each market
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       200:
 *         description: Latest prices retrieved successfully
 *       404:
 *         description: Product not found
 */
export {};