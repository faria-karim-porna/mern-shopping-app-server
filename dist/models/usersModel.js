"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const usersSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    createdAt: { type: String, required: true },
    createdBy: { type: String, required: true },
    accessType: { type: String, required: true },
    creatorId: { type: Number, required: true },
});
exports.Users = (0, mongoose_1.model)("Users", usersSchema);
