/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /users/me/recommendation-strategy:
 *   patch:
 *     summary: Update the authenticated user's default recommendation strategy
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recommendationStrategy
 *             properties:
 *               recommendationStrategy:
 *                 type: string
 *                 enum: [balanced, cheapest, closest]
 *                 example: balanced
 *     responses:
 *       200:
 *         description: Recommendation strategy updated successfully
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /shopping-lists/{id}/multi-market-recommendation:
 *   get:
 *     summary: Get a multi-market recommendation for a shopping list
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list id
 *     responses:
 *       200:
 *         description: Multi-market recommendation generated successfully
 *       404:
 *         description: Shopping list not found
 */
/**
 * @swagger
 * /shopping-lists/{id}/multi-market-recommendation:
 *   get:
 *     summary: Get a multi-market recommendation for a shopping list
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
 *         description: User latitude
 *       - in: query
 *         name: userLongitude
 *         required: false
 *         schema:
 *           type: number
 *         description: User longitude
 *       - in: query
 *         name: maxMarkets
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3]
 *         description: Maximum number of markets to compare
 *     responses:
 *       200:
 *         description: Multi-market recommendation generated successfully
 *       404:
 *         description: Shopping list not found
 */