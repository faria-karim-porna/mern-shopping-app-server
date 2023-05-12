"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const countersSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    userCount: { type: Number, required: true },
    itemCount: { type: Number, required: true },
});
exports.Counters = (0, mongoose_1.model)("Counters", countersSchema);
