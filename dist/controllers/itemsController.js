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
exports.deleteItems = exports.updateItems = exports.getItems = exports.addItems = void 0;
const itemsModel_1 = require("../models/itemsModel");
const countersModel_1 = require("../models/countersModel");
const addItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const allCounter = yield countersModel_1.Counters.find();
        const { itemCount } = allCounter[0];
        const id = (itemCount !== null && itemCount !== void 0 ? itemCount : 0) + 1;
        const _id = allCounter[0]._id;
        const updateItemCount = yield countersModel_1.Counters.findByIdAndUpdate({ _id: _id }, { itemCount: id });
        const item = new itemsModel_1.Items({
            id: id,
            name: body.name,
            quantity: body.quantity,
            unitPrice: body.unitPrice,
            createdAt: body.createdAt,
            createdBy: body.createdBy,
            creatorId: body.creatorId,
        });
        const newItem = yield item.save();
        const allItems = yield itemsModel_1.Items.find();
        res.status(201).json({ message: "Item has been added", item: newItem, items: allItems });
    }
    catch (error) {
        throw error;
    }
});
exports.addItems = addItems;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield itemsModel_1.Items.find();
        res.status(200).json({ allItems });
    }
    catch (error) {
        throw error;
    }
});
exports.getItems = getItems;
const updateItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const item = new itemsModel_1.Items({
            name: body.name,
            quantity: body.quantity,
            unitPrice: body.unitPrice,
        });
        yield itemsModel_1.Items.updateOne({ id: body.id }, {
            $set: { name: item.name, quantity: item.quantity, unitPrice: item.unitPrice },
        });
        const allItems = yield itemsModel_1.Items.find();
        res.status(200).json({
            message: "Item has been updated",
            items: allItems,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateItems = updateItems;
const deleteItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield itemsModel_1.Items.deleteOne({ id: body.id });
        const allItems = yield itemsModel_1.Items.find();
        res.status(200).json({
            message: "Item has been deleted",
            items: allItems,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteItems = deleteItems;
