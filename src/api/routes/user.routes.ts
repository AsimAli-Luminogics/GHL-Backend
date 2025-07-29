import { Router } from "express";
import userController from "../controllers/user/user.controller";
import authorize from "../../middleware/authorize.middleware";

const router = Router();

export default router;
