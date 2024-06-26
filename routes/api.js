import express from "express";
import AuthController from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

export default router;
