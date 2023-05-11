"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const itemsSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    createdAt: { type: String, required: true },
    createdBy: { type: String, required: true },
    creatorId: { type: Number, required: true },
});
exports.Item = (0, mongoose_1.model)("Item", itemsSchema);
