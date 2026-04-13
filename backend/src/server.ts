/**
 * Server entry point.
 *
 * This file is responsible only for starting the HTTP server.
 * Application configuration belongs in app.ts.
 */

import app from "./app";

const port = Number(process.env.PORT || 3333);

app.listen(port, () => {
  console.log(`🚀 ShopWise API running on port ${port}`);
});