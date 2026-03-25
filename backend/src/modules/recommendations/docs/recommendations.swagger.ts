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