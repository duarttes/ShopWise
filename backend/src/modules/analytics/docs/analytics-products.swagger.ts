/**
 * @swagger
 * /analytics/users/{userId}/top-products:
 *   get:
 *     summary: Get the user's top purchased products
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *         description: End date filter
 *     responses:
 *       200:
 *         description: Top products retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /analytics/users/{userId}/most-expensive-products:
 *   get:
 *     summary: Get the user's highest spending products
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *         description: End date filter
 *     responses:
 *       200:
 *         description: Most expensive products retrieved successfully
 *       404:
 *         description: User not found
 */
export {};