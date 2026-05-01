/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - normalizedName
 *             properties:
 *               name:
 *                 type: string
 *                 example: Banana Nanica
 *               normalizedName:
 *                 type: string
 *                 example: banana nanica
 *               brand:
 *                 type: string
 *                 example: Camil
 *               category:
 *                 type: string
 *                 example: Fruits
 *               unit:
 *                 type: string
 *                 example: kg
 *     responses:
 *       201:
 *         description: Product created successfully
 *       409:
 *         description: Normalized product name is already in use
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}/market-comparison:
 *   get:
 *     summary: Compare the latest observed prices of a product across markets
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product market comparison retrieved successfully
 *       404:
 *         description: Product not found
 */
export {};