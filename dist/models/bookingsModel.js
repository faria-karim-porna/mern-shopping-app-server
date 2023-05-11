"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const bookingsSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    movieName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seatId: { type: String, required: true },
});
exports.Bookings = (0, mongoose_1.model)("Bookings", bookingsSchema);
