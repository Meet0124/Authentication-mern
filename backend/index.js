import express from "express";
import dbConnection from "./Models/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Working Fine");
});

dbConnection();
//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth",AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
