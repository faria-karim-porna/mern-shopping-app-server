import { Response, Request, NextFunction } from "express";
import { IUsers } from "../types/usersType";
import { Users } from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// (find the user through email,
//   if old and new password matches show error message,
//   if no email and password show error message,
//   if has email and no password show create an account error,
//   if has email and password then allow reset to the system)
const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const email = body.email;
    const existingUser: IUsers[] = await Users.find({ email: email });
    if (existingUser.length === 0) {
      const plainTextPassword = body.password;
      const encryptedPassword = bcrypt.hashSync(plainTextPassword, 10);
      const user: IUsers = new Users({
        id: body.id,
        name: body.name,
        email: body.email,
        password: encryptedPassword,
        createdAt: body.createdAt,
        createdBy: body.name,
        accessType: "User",
        creatorId: body.id,
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

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, JWT_SECRET);

    req.user = decode;
    next();
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

const addUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;

    const user: IUsers = new Users({
      id: body.id,
      name: "",
      email: body.email,
      password: "",
      createdAt: body.createdAt,
      createdBy: body.createdBy,
      accessType: body.accessType,
      creatorId: body.creatorId,
    });

    const newUser: IUsers = await user.save();
    const allUsers: IUsers[] = await Users.find();

    res.status(201).json({ message: `${body.accessType} has been added`, user: newUser, users: allUsers });
  } catch (error) {
    throw error;
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers: IUsers[] = await Users.find();
    res.status(200).json({ allUsers });
  } catch (error) {
    throw error;
  }
};

const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const user: IUsers = new Users({
      name: body.name,
      email: body.email,
      accessType: body.accessType,
    });
    await Users.updateOne<IUsers | null>(
      { id: body.id },
      {
        $set: { name: user.name, email: user.email, accessType: user.accessType },
      }
    );
    const allUsers: IUsers[] = await Users.find();
    res.status(200).json({
      message: "User info has been updated",
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    await Users.deleteOne({ id: body.id });
    const allUsers: IUsers[] = await Users.find();
    res.status(200).json({
      message: "User has been deleted",
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

export { createAccount, login, addUsers, getUsers, updateUsers, deleteUsers };
