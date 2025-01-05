"use client";

import { useEffect, useState } from "react";
import { useGetBookings } from "../client-api/booking";
import { BookingType } from "../type";
import BookingSummary from "./BookingSummary";
import Loader from "@/components/Loader";

const Booking = () => {
  const { bookings, fetchBookings, isLoading } = useGetBookings();
  const [bookingInfo, setBookingInfo] = useState<BookingType[]>([]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    if (bookings) {
      setBookingInfo(bookings);
    }
  }, [bookings]);

  const handleDeleteBooking = (bookingId: string) => {
    setBookingInfo((prevBookings) =>
      prevBookings.filter((booking) => booking._id !== bookingId)
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 md:mx-12 my-8 rounded-lgbg-blue-100">
      <div className=" text-center py-6">
        <h1 className="md:text-4xl  text-3xl  font-semibold text-blue-600">
          Your booking has been confirmed!
        </h1>
        <p className="md:text-lg text-gray-600 mt-2 px-12 md:px-0">
          {` We're excited to confirm your reservation. Here's the detail:`}
        </p>
      </div>

      <div className="space-y-4">
        {bookingInfo.length > 0 &&
          bookingInfo.map((booking) => (
            <BookingSummary
              key={booking._id}
              booking={booking}
              onDeleteBooking={handleDeleteBooking}
            />
          ))}
      </div>
    </div>
  );
};

export default Booking;
