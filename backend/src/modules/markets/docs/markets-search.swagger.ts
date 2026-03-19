/**
 * @swagger
 * /markets/search:
 *   get:
 *     summary: Search markets
 *     tags: [Markets]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Free-text search query
 *     responses:
 *       200:
 *         description: Markets retrieved successfully
 *       400:
 *         description: Query parameter is required
 */
export {};