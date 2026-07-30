import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
