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
    <div>
      {bookingInfo.map((booking) => (
        <BookingSummary
          key={booking._id}
          booking={booking}
          onDeleteBooking={handleDeleteBooking}
        />
      ))}
    </div>
  );
};

export default Booking;
