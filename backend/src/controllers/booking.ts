import { Request, Response } from "express";
import Booking from "../model/booking";

export const createBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { restaurantId, datetime, guest, user } = req.body;

  try {
    const existingBooking = await Booking.findOne({
      datetime: datetime,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot you already booked. Please choose another time.",
      });
    }

    const validDatetime = new Date(datetime);
    const newBooking = new Booking({
      restaurant: restaurantId,
      datetime: validDatetime,
      guest,
      user,
    });

    await newBooking.save();

    return res.status(201).json({
      message: "Booking created successfully.",
      booking: newBooking,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong. ",
    });
  }
};

export const getBookings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bookings = await Booking.find({}).populate("restaurant");

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found.",
      });
    }

    return res.status(200).json({
      bookings,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }
    return res.status(200).json({
      message: "Booking deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
