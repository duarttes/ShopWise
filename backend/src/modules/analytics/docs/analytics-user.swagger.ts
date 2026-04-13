/**
 * @swagger
 * /analytics/users/{userId}/summary:
 *   get:
 *     summary: Get dashboard summary for a user
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
 *         description: User summary retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /analytics/users/{userId}/spending-by-market:
 *   get:
 *     summary: Get user spending grouped by market
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
 *         description: User spending by market retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /analytics/users/{userId}/recent-receipts:
 *   get:
 *     summary: Get user's recent receipts
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum number of receipts to return
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
 *         description: User recent receipts retrieved successfully
 *       404:
 *         description: User not found
 */
export {};