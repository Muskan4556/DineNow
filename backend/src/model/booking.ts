import mongoose from "mongoose";

const userSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  contactNo: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
};

const bookingSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantInfos",
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    guest: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    user: userSchema,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
