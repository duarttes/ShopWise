/**
 * @swagger
 * /markets/{id}/display-name:
 *   patch:
 *     summary: Update a market display name
 *     tags: [Markets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Market id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - displayName
 *             properties:
 *               displayName:
 *                 type: string
 *                 example: São Vicente
 *     responses:
 *       200:
 *         description: Market display name updated successfully
 *       404:
 *         description: Market not found
 */