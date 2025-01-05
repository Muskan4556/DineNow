import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true },
  imageUrl: { type: String },
});

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    locality: { type: String, required: true, trim: true },
    areaName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    costForTwo: { type: String, required: true, trim: true },
    avgRating: { type: Number, min: 0, max: 5 },
    deliveryPrice: { type: Number, required: true, min: 0 },
    deliveryTime: { type: Number, required: true, min: 0, max: 120 },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
  },
  {
    collection: "restaurantInfos", 
    timestamps: true, 
  }
);

const RestaurantInfos = mongoose.model("RestaurantInfos", restaurantSchema);

export default RestaurantInfos;
