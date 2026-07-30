import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { analysisRouter } from "./routes/analysis.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
// Her isteğe Clerk oturum bilgisini ekler (`req.auth()`), ama tek başına
// erişimi kısıtlamaz -- korumalı route'lar ayrıca `requireAuth()` kullanır.
app.use(clerkMiddleware());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRouter);
app.use("/analyses", analysisRouter);

// Error handler EN SONDA tanımlanmalı — Express, 4 parametreli
// middleware'leri (err, req, res, next) diğerlerinden bu şekilde ayırt eder
// ve zincirin sonuna koyar ki önceki route'lardan next(err) ile buraya
// düşülebilsin.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
