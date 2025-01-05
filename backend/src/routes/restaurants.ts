import express from "express";
import { getAllRestaurants, getRestaurantInfo } from "../controllers/restaurants";
import { param } from "express-validator";

const router = express.Router();

router.get("/", getAllRestaurants);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id must be a valid string"),
  getRestaurantInfo
);

export default router;
