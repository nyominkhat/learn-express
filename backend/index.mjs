import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRouter from "./routes/productRoute.mjs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(productRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running ...");
});
