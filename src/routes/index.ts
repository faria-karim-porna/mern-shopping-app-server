import { Router } from "express";
import { addMultipleMovies, getMoviesInfo, updateSeatStatus } from "../controllers/moviesController";
import { createAccount } from "../controllers/usersController";

const router: Router = Router();

// router.post("/addAllData", addMultipleMovies);

// router.get("/showMoviesInfo", getMoviesInfo);

// router.patch("/updateStatus", updateSeatStatus);

router.post("/api/createAccount", createAccount);

// router.get("/getBookings", getBookingsData);


export default router;
