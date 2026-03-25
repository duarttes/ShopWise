/**
 * @swagger
 * /shopping-lists/{id}/recommendation:
 *   get:
 *     summary: Get recommendation for a shopping list
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
 *         name: strategy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [balanced, cheapest, closest]
 *         description: Recommendation ranking strategy
 *     responses:
 *       200:
 *         description: Recommendation generated successfully
 *       404:
 *         description: Shopping list not found
 */