"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const usersModel_1 = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
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
        const user = new usersModel_1.Users({
            id: body.id,
            name: body.name,
            email: body.email,
            password: encryptedPassword,
            createdAt: body.createdAt,
            createdBy: body.createdBy,
            accessType: body.accessType,
        });
        const newUser = yield user.save();
        const allUsers = yield usersModel_1.Users.find();
        res.status(201).json({ message: "Account Created Successfully", user: newUser, Users: allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.createAccount = createAccount;
