import prisma from "../db/db.config.js";
import Joi from "joi";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const { error, value } = registerValidation(body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      const userExist = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (userExist) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "User already exists",
        });
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
        status: 500,
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const { error, value } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.details[0].message,
      });
    }
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email or password is incorrect",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email or password is incorrect",
      });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
      data: user,
      access_token: `Bearer ${token}`,
    });
  }
}

export default AuthController;
