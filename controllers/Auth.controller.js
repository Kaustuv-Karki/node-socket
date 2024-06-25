import prisma from "../db/db.config.js";
import Joi from "joi";
import { registerValidation } from "../validations/auth.validation.js";

import bcrypt from "bcryptjs";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const { error, value } = registerValidation(body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      const user = await prisma.users.create({ data: body });

      return res.status(200).json({
        status: 200,
        success: true,
        message: "User registered successfully",
        data: user,
      });
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
