import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { errorHandler } from "./middlewares/error-handler.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRouter);

// Error handler EN SONDA tanımlanmalı — Express, 4 parametreli
// middleware'leri (err, req, res, next) diğerlerinden bu şekilde ayırt eder
// ve zincirin sonuna koyar ki önceki route'lardan next(err) ile buraya
// düşülebilsin.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
