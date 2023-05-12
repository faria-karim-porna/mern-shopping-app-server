"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const itemsController_1 = require("../controllers/itemsController");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/api/createAccount", authController_1.createAccount);
router.post("/api/login", authController_1.login);
router.post("/api/logout", authController_1.logout);
router.post("/api/resetPassword", authController_1.resetPassword);
router.post("/api/addUsers", authenticateMiddleware_1.authenticate, usersController_1.addUsers);
router.get("/api/getUsers", authenticateMiddleware_1.authenticate, usersController_1.getUsers);
router.patch("/api/updateUsers", authenticateMiddleware_1.authenticate, usersController_1.updateUsers);
router.delete("/api/deleteUsers", authenticateMiddleware_1.authenticate, usersController_1.deleteUsers);
router.post("/api/addItems", authenticateMiddleware_1.authenticate, itemsController_1.addItems);
router.get("/api/getItems", authenticateMiddleware_1.authenticate, itemsController_1.getItems);
router.patch("/api/updateItems", authenticateMiddleware_1.authenticate, itemsController_1.updateItems);
router.delete("/api/deleteItems", authenticateMiddleware_1.authenticate, itemsController_1.deleteItems);
exports.default = router;
