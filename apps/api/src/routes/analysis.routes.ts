import { Router } from "express";

import { AnalysisController } from "../controllers/analysis.controller.js";
import { analysisService, userService } from "../container.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { ensureSyncedUser } from "../middlewares/ensure-synced-user.js";

const analysisController = new AnalysisController(analysisService);

export const analysisRouter = Router();

analysisRouter.use(ensureSyncedUser(userService));

analysisRouter.get("/", asyncHandler(analysisController.list));
analysisRouter.get("/:id", asyncHandler(analysisController.getById));
analysisRouter.post("/", asyncHandler(analysisController.create));
