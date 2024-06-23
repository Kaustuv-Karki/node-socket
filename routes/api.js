import express from "express";
import AuthController from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/auth/register", AuthController.register);

export default router;
