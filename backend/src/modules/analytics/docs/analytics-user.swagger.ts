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
 *     responses:
 *       200:
 *         description: User recent receipts retrieved successfully
 *       404:
 *         description: User not found
 */
export {};