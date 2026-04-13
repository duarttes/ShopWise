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

/**
 * @swagger
 * /analytics/users/{userId}/home-insights:
 *   get:
 *     summary: Get a compact home dashboard for the authenticated user
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: User home insights retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
export {};