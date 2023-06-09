import { Router } from "express";
import { addSuperAdmin, addUsers, deleteUsers, getUsers, updateUsers } from "../controllers/usersController";
import { addItems, deleteItems, getItems, updateItems } from "../controllers/itemsController";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { createAccount, login, logout, resetPassword } from "../controllers/authController";

const router: Router = Router();

router.post("/api/createAccount", createAccount);
router.post("/api/login", login);
router.post("/api/logout", logout);
router.post("/api/resetPassword", resetPassword);

router.post("/api/addSuperAdmin", addSuperAdmin);

router.post("/api/addUsers", authenticate, addUsers);
router.get("/api/getUsers", authenticate, getUsers);
router.patch("/api/updateUsers", authenticate, updateUsers);
router.delete("/api/deleteUsers", authenticate, deleteUsers);

router.post("/api/addItems", authenticate, addItems);
router.get("/api/getItems", authenticate, getItems);
router.patch("/api/updateItems", authenticate, updateItems);
router.delete("/api/deleteItems", authenticate, deleteItems);

export default router;
