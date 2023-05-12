import { Response, Request, NextFunction } from "express";
import { IUsers } from "../types/usersType";
import { Users } from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

interface CustomRequest extends Request {
  user?: any;
}

const authenticate = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tokenWithoutBearer = req.headers.authorization?.split(" ")[1];
    if (tokenWithoutBearer) {
      const decode = jwt.verify(tokenWithoutBearer, JWT_SECRET);
      req.user = decode;
      next();
    }
  } catch (error) {
    res.json({ message: "Authentication failed" });
  }
};

export { authenticate };
