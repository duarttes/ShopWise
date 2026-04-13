/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Free-text search query
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       400:
 *         description: Query parameter is required
 */
export {};