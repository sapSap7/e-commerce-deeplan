import { connectToDatabase } from "./db.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByName,
  router,
} from "./routes/route.js";
import express from "express";
import CORS from "cors";

const app = express();
app.use(CORS());
app.use(express.json());

getProducts(router);
createProduct(router);
updateProduct(router);
deleteProduct(router);
getProductById(router);
getProductByName(router);
app.use(router);

connectToDatabase().then(() => {
  console.log("Database connection established.");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

// const https = require("https");
// https.createServer({  }, app).listen(443)
