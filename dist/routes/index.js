"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const itemsController_1 = require("../controllers/itemsController");
const router = (0, express_1.Router)();
router.post("/api/createAccount", usersController_1.createAccount);
router.post("/api/addUsers", usersController_1.addUsers);
router.get("/api/getUsers", usersController_1.getUsers);
router.patch("/api/updateUsers", usersController_1.updateUsers);
router.delete("/api/deleteUsers", usersController_1.deleteUsers);
router.post("/api/addItems", itemsController_1.addItems);
router.get("/api/getItems", itemsController_1.getItems);
router.patch("/api/updateItems", itemsController_1.updateItems);
router.delete("/api/deleteItems", itemsController_1.deleteItems);
exports.default = router;
