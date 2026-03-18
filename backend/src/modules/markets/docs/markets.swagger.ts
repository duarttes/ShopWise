/**
 * @swagger
 * tags:
 *   name: Markets
 *   description: Market management endpoints
 */

/**
 * @swagger
 * /markets:
 *   post:
 *     summary: Create a new market
 *     tags: [Markets]
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
 *                 example: Supermarket Central
 *               cnpj:
 *                 type: string
 *                 example: 12345678000199
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               city:
 *                 type: string
 *                 example: Americana
 *               state:
 *                 type: string
 *                 example: SP
 *               zipCode:
 *                 type: string
 *                 example: 13465000
 *               latitude:
 *                 type: number
 *                 example: -22.7392
 *               longitude:
 *                 type: number
 *                 example: -47.3313
 *     responses:
 *       201:
 *         description: Market created successfully
 *       409:
 *         description: CNPJ is already in use
 */

/**
 * @swagger
 * /markets:
 *   get:
 *     summary: List all markets
 *     tags: [Markets]
 *     responses:
 *       200:
 *         description: Markets retrieved successfully
 */

/**
 * @swagger
 * /markets/{id}:
 *   get:
 *     summary: Get a market by id
 *     tags: [Markets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Market id
 *     responses:
 *       200:
 *         description: Market retrieved successfully
 *       404:
 *         description: Market not found
 */
export {};