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
exports.deleteUsers = exports.updateUsers = exports.getUsers = exports.addUsers = exports.addSuperAdmin = void 0;
const usersModel_1 = require("../models/usersModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const countersModel_1 = require("../models/countersModel");
const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
const addSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plainTextPassword = "admin012!";
        const encryptedPassword = bcryptjs_1.default.hashSync(plainTextPassword, 10);
        const user = new usersModel_1.Users({
            id: 1,
            name: "Super Admin",
            email: "superAdmin@admin.com",
            password: encryptedPassword,
            createdAt: "5-13-2023 (10.00 AM)",
            createdBy: "Super Admin",
            accessType: "Super Admin",
            creatorId: 1,
        });
        const newUser = yield user.save();
        const allUsers = yield usersModel_1.Users.find();
        res.status(201).json({ message: "Super admin has been added", user: newUser, users: allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.addSuperAdmin = addSuperAdmin;
const addUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const allCounter = yield countersModel_1.Counters.find();
        const { userCount } = allCounter[0];
        const id = (userCount !== null && userCount !== void 0 ? userCount : 0) + 1;
        const user = new usersModel_1.Users({
            id: id,
            name: "",
            email: body.email,
            password: "",
            createdAt: body.createdAt,
            createdBy: body.createdBy,
            accessType: body.accessType,
            creatorId: body.creatorId,
        });
        const newUser = yield user.save();
        const allUsers = yield usersModel_1.Users.find();
        res.status(201).json({ message: `${body.accessType} has been added`, user: newUser, users: allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.addUsers = addUsers;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield usersModel_1.Users.find();
        res.status(200).json({ allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new usersModel_1.Users({
            name: body.name,
            email: body.email,
            accessType: body.accessType,
        });
        yield usersModel_1.Users.updateOne({ id: body.id }, {
            $set: { name: user.name, email: user.email, accessType: user.accessType },
        });
        const allUsers = yield usersModel_1.Users.find();
        res.status(200).json({
            message: "User info has been updated",
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield usersModel_1.Users.deleteOne({ id: body.id });
        const allUsers = yield usersModel_1.Users.find();
        res.status(200).json({
            message: "User has been deleted",
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUsers = deleteUsers;
