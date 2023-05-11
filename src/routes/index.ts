import { Router } from "express";
import { createAccount } from "../controllers/usersController";
import { addItems, deleteItems, getItems, updateItems } from "../controllers/itemsController";

const router: Router = Router();

router.post("/api/createAccount", createAccount);

router.post("/api/addItems", addItems);
router.get("/api/getItems", getItems);
router.patch("/api/updateItems", updateItems);
router.delete("/api/deleteItems", deleteItems);

export default router;
