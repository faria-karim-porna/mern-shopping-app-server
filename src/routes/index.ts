import { Router } from "express";
import { createAccount } from "../controllers/usersController";
import { addItems, deleteItems, getItems, updateItems } from "../controllers/itemsController";

const router: Router = Router();

router.post("/api/createAccount", createAccount);

router.post("/api/addItems", addItems);
router.post("/api/getItems", getItems);
router.post("/api/updateItems", updateItems);
router.post("/api/deleteItems", deleteItems);

export default router;
