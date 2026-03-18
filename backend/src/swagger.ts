/**
 * Swagger configuration.
 *
 * This file generates the OpenAPI specification used by Swagger UI.
 * Route-level documentation will be added as the modules are created.
 */

import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopWise API",
      version: "1.0.0",
      description: "Backend API for ShopWise",
    },
  },
  apis: ["./src/routes/*.ts", "./src/modules/**/docs/*.ts"],
});

export default swaggerSpec;