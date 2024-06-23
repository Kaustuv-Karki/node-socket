import prisma from "../db/db.config.js";
import Joi from "joi";
import { registerValidation } from "../validations/auth.validation.js";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const { error, value } = registerValidation(body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      return res.json({ value });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default AuthController;
