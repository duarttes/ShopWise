/**
 * @swagger
 * tags:
 *   name: Shopping Lists
 *   description: Shopping list management endpoints
 */

/**
 * @swagger
 * /shopping-lists:
 *   post:
 *     summary: Create a new shopping list
 *     tags: [Shopping Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 0f9d4a1b-0f9d-4a1b-8c0f-9d4a1b8c0f9d
 *               name:
 *                 type: string
 *                 example: Weekly grocery list
 *     responses:
 *       201:
 *         description: Shopping list created successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /shopping-lists/{id}:
 *   get:
 *     summary: Get a shopping list by id
 *     tags: [Shopping Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list id
 *     responses:
 *       200:
 *         description: Shopping list retrieved successfully
 *       404:
 *         description: Shopping list not found
 */

/**
 * @swagger
 * /users/{id}/shopping-lists:
 *   get:
 *     summary: List all shopping lists from a user
 *     tags: [Shopping Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: Shopping lists retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /shopping-lists/{id}/items:
 *   post:
 *     summary: Add an item to a shopping list
 *     tags: [Shopping Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Banana Nanica
 *               quantity:
 *                 type: number
 *                 example: 2
 *               unit:
 *                 type: string
 *                 example: kg
 *               productId:
 *                 type: string
 *                 example: 0f9d4a1b-0f9d-4a1b-8c0f-9d4a1b8c0f9d
 *     responses:
 *       201:
 *         description: Shopping list item created successfully
 *       404:
 *         description: Shopping list or product not found
 */

/**
 * @swagger
 * /shopping-lists/{id}/items/{itemId}:
 *   delete:
 *     summary: Remove an item from a shopping list
 *     tags: [Shopping Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list id
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shopping list item id
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Shopping list or item not found
 */
export {};