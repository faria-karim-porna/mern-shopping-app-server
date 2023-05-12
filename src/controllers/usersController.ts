import { Response, Request } from "express";
import { IUsers } from "../types/usersType";
import { Users } from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ICounters } from "../types/countersType";
import { Counters } from "../models/countersModel";

const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

const addUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const allCounter: ICounters[] = await Counters.find();
    const { userCount } = allCounter[0];
    const id = (userCount ?? 0) + 1;
    const user: IUsers = new Users({
      id: id,
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

export { addUsers, getUsers, updateUsers, deleteUsers };
