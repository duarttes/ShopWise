/**
 * @swagger
 * /analytics/users/{userId}/monthly-spending:
 *   get:
 *     summary: Get monthly spending for a user
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
 *         description: Monthly spending retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /analytics/users/{userId}/spending-by-category:
 *   get:
 *     summary: Get user spending grouped by category
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
 *         description: Spending by category retrieved successfully
 *       404:
 *         description: User not found
 */
export {};