/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Shopping recommendation endpoints
 */

/**
 * @swagger
 * /shopping-lists/{id}/recommendation:
 *   get:
 *     summary: Get a market recommendation for a shopping list
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list id
 *       - in: query
 *         name: userLatitude
 *         required: false
 *         schema:
 *           type: number
 *         description: User latitude for closest market calculation
 *       - in: query
 *         name: userLongitude
 *         required: false
 *         schema:
 *           type: number
 *         description: User longitude for closest market calculation
 *     responses:
 *       200:
 *         description: Recommendation generated successfully
 *       400:
 *         description: Shopping list has no linked products
 *       404:
 *         description: Shopping list or price data not found
 */
export {};