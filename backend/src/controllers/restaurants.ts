import { Request, Response } from "express";
import Restaurant from "../model/restaurants";

export const getAllRestaurants = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const restaurants = await Restaurant.find({});
    if (restaurants.length === 0) {
      return res.status(404).json({
        message: "No restaurants found",
      });
    }
    res.status(200).json({ restaurants });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getRestaurantInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const resId = req.params.restaurantId;
    const restaurant = await Restaurant.findOne({ _id: resId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
