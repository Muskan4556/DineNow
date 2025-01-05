import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookings,
} from "../controllers/booking";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.delete("/", deleteBooking);

export default router;
