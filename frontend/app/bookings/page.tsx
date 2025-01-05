"use client";

import { useEffect, useState } from "react";
import { useGetBookings } from "../client-api/booking";
import { BookingType } from "../type";
import BookingSummary from "./BookingSummary";

const Booking = () => {
  const { bookings, fetchBookings, isLoading, error } = useGetBookings();
  const [bookingInfo, setBookingInfo] = useState<BookingType[]>([]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // This effect will update the booking info when the 'bookings' data changes
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
