import { Router } from "express";
import { addUsers, createAccount, deleteUsers, getUsers, updateUsers } from "../controllers/usersController";
import { addItems, deleteItems, getItems, updateItems } from "../controllers/itemsController";

const router: Router = Router();

router.post("/api/createAccount", createAccount);

router.post("/api/addUsers", addUsers);
router.get("/api/getUsers", getUsers);
router.patch("/api/updateUsers", updateUsers);
router.delete("/api/deleteUsers", deleteUsers);

router.post("/api/addItems", addItems);
router.get("/api/getItems", getItems);
router.patch("/api/updateItems", updateItems);
router.delete("/api/deleteItems", deleteItems);

export default router;
