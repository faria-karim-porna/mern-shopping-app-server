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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.login = exports.createAccount = void 0;
const usersModel_1 = require("../models/usersModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const existingUser = yield usersModel_1.Users.find({ email: email });
        if (existingUser.length === 0) {
            const plainTextPassword = body.password;
            const encryptedPassword = bcryptjs_1.default.hashSync(plainTextPassword, 10);
            const user = new usersModel_1.Users({
                id: body.id,
                name: body.name,
                email: body.email,
                password: encryptedPassword,
                createdAt: body.createdAt,
                createdBy: body.name,
                accessType: "User",
                creatorId: body.id,
            });
            const newUser = yield user.save();
            const allUsers = yield usersModel_1.Users.find();
            res.status(201).json({ message: "User account has been created Successfully", user: newUser, Users: allUsers });
        }
        else if (existingUser[0].email && !existingUser[0].password) {
            const plainTextPassword = body.password;
            const encryptedPassword = bcryptjs_1.default.hashSync(plainTextPassword, 10);
            const user = new usersModel_1.Users({
                name: body.name,
                password: encryptedPassword,
            });
            yield usersModel_1.Users.updateOne({ id: existingUser[0].id }, {
                $set: { name: user.name, password: encryptedPassword },
            });
            const allUsers = yield usersModel_1.Users.find();
            res.status(200).json({
                message: `${existingUser[0].accessType} account has been created Successfully`,
                users: allUsers,
            });
        }
        else {
            res.status(403).json({ status: "error", error: "Account already exists" });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createAccount = createAccount;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const existingUser = yield usersModel_1.Users.find({ email: email });
        if (existingUser.length === 0) {
            res.status(403).json({ status: "error", error: "Account does not exist" });
        }
        else if (existingUser[0].email && !existingUser[0].password) {
            res.status(403).json({ status: "error", error: "First set up your account" });
        }
        else {
            if (bcryptjs_1.default.compareSync(body.password, existingUser[0].password)) {
                const token = jsonwebtoken_1.default.sign({
                    email: body.email,
                    passowrd: body.password,
                }, JWT_SECRET);
                res.status(200).json({ status: "ok", data: token });
            }
            else {
                res.status(403).json({
                    status: "error",
                    error: "Invalid email/password",
                });
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenWithoutBearer = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (tokenWithoutBearer) {
            const decode = jsonwebtoken_1.default.verify(tokenWithoutBearer, JWT_SECRET);
            res.status(200).json({ message: "Logout is successful" });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.logout = logout;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const existingUser = yield usersModel_1.Users.find({ email: email });
        if (existingUser.length === 0) {
            res.status(403).json({ status: "error", error: "Account does not exist" });
        }
        else if (existingUser[0].email && !existingUser[0].password) {
            res.status(403).json({ status: "error", error: "First set up your account" });
        }
        else {
            if (!bcryptjs_1.default.compareSync(body.password, existingUser[0].password)) {
                const plainTextPassword = body.password;
                const encryptedPassword = bcryptjs_1.default.hashSync(plainTextPassword, 10);
                const user = new usersModel_1.Users({
                    password: encryptedPassword,
                });
                yield usersModel_1.Users.updateOne({ id: existingUser[0].id }, {
                    $set: { password: user.password },
                });
                res.status(200).json({
                    message: "Password has been reset successfully",
                });
            }
            else {
                res.status(403).json({
                    status: "error",
                    error: "Old password can not be set as new password",
                });
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.resetPassword = resetPassword;
