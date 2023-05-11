import { Response, Request } from "express";
import { IUsers } from "../types/userType";
import { Users } from "../models/usersModel";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const plainTextPassword = body.password;
    const encryptedPassword = bcrypt.hashSync(plainTextPassword, 10);

    if (!body.name || typeof body.name !== "string") {
      res.status(403).json({ status: "error", error: "Invalid username" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      res.status(403).json({ status: "error", error: "Invalid password" });
    }

    if (plainTextPassword.length < 5) {
      res.status(403).json({
        status: "error",
        error: "Password too small. Should be atleast 6 characters",
      });
    }
    const user: IUsers = new Users({
      id: body.id,
      name: body.name,
      email: body.email,
      password: encryptedPassword,
      createdAt: body.createdAt,
      createdBy: body.createdBy,
      accessType: body.accessType,
    });

    const newUser: IUsers = await user.save();
    const allUsers: IUsers[] = await Users.find();

    res.status(201).json({ message: "Account Created Successfully", user: newUser, Users: allUsers });
  } catch (error) {
    throw error;
  }
};

export { createAccount };
