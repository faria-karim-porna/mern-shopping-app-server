import { Response, Request } from "express";
import { IUsers } from "../types/usersType";
import { Users } from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ICounters } from "../types/countersType";
import { Counters } from "../models/countersModel";

const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const email = body.email;
    const existingUser: IUsers[] = await Users.find({ email: email });
    if (existingUser.length === 0) {
      const plainTextPassword = body.password;
      const encryptedPassword = bcrypt.hashSync(plainTextPassword, 10);

      const allCounter: ICounters[] = await Counters.find();
      const { userCount } = allCounter[0];
      const id = (userCount ?? 0) + 1;
      const _id = allCounter[0]._id;
      const updateUserCount = await Counters.findByIdAndUpdate<ICounters | null>({ _id: _id }, { userCount: id });
      const user: IUsers = new Users({
        id: id,
        name: body.name,
        email: body.email,
        password: encryptedPassword,
        createdAt: body.createdAt,
        createdBy: body.name,
        accessType: "User",
        creatorId: id,
      });

      const newUser: IUsers = await user.save();
      const allUsers: IUsers[] = await Users.find();

      res.status(201).json({ message: "User account has been created Successfully", user: newUser, Users: allUsers });
    } else if (existingUser[0].email && !existingUser[0].password) {
      const plainTextPassword = body.password;
      const encryptedPassword = bcrypt.hashSync(plainTextPassword, 10);
      const user: IUsers = new Users({
        name: body.name,
        password: encryptedPassword,
      });

      await Users.updateOne<IUsers | null>(
        { id: existingUser[0].id },
        {
          $set: { name: user.name, password: encryptedPassword },
        }
      );
      const allUsers: IUsers[] = await Users.find();
      res.status(200).json({
        message: `${existingUser[0].accessType} account has been created Successfully`,
        users: allUsers,
      });
    } else {
      res.status(403).json({ status: "error", error: "Account already exists" });
    }
  } catch (error) {
    throw error;
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const email = body.email;
    const existingUser: IUsers[] = await Users.find({ email: email });
    if (existingUser.length === 0) {
      res.status(403).json({ status: "error", error: "Account does not exist" });
    } else if (existingUser[0].email && !existingUser[0].password) {
      res.status(403).json({ status: "error", error: "First set up your account" });
    } else {
      if (bcrypt.compareSync(body.password, existingUser[0].password)) {
        const token = jwt.sign(
          {
            email: body.email,
            passowrd: body.password,
          },
          JWT_SECRET
        );
        res.status(200).json({ status: "ok", data: token });
      } else {
        res.status(403).json({
          status: "error",
          error: "Invalid email/password",
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenWithoutBearer = req.headers.authorization?.split(" ")[1];
    if (tokenWithoutBearer) {
      const decode = jwt.verify(tokenWithoutBearer, JWT_SECRET);
      res.status(200).json({ message: "Logout is successful" });
    }
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const email = body.email;
    const existingUser: IUsers[] = await Users.find({ email: email });
    if (existingUser.length === 0) {
      res.status(403).json({ status: "error", error: "Account does not exist" });
    } else if (existingUser[0].email && !existingUser[0].password) {
      res.status(403).json({ status: "error", error: "First set up your account" });
    } else {
      if (!bcrypt.compareSync(body.password, existingUser[0].password)) {
        const plainTextPassword = body.password;
        const encryptedPassword = bcrypt.hashSync(plainTextPassword, 10);
        const user: IUsers = new Users({
          password: encryptedPassword,
        });

        await Users.updateOne<IUsers | null>(
          { id: existingUser[0].id },
          {
            $set: { password: user.password },
          }
        );
        res.status(200).json({
          message: "Password has been reset successfully",
        });
      } else {
        res.status(403).json({
          status: "error",
          error: "Old password can not be set as new password",
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

export { createAccount, login, resetPassword, logout };
