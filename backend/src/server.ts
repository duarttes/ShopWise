import 'reflect-metadata';
import './shared/container';
import app from "./app";

const port = Number(process.env.PORT || 3333);

app.listen(port, () => {
  console.log(`🚀 ShopWise API running on port ${port}`);
});