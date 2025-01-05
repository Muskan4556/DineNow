"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BookingType } from "../type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeleteBooking } from "../client-api/booking";

const BookingSummary = ({
  booking,
  onDeleteBooking,
}: {
  booking: BookingType;
  onDeleteBooking: (bookingId: string) => void;
}) => {
  const { user, restaurant, datetime, guest } = booking;
  const { deleteBooking } = useDeleteBooking();

  const handleDelete = async () => {
    console.log("Deleting booking...");
    try {
      await deleteBooking(booking._id as string);
      onDeleteBooking(booking._id as string);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-md border border-gray-200 rounded-lg">
        <CardHeader className="flex justify-between items-center">
          <div className="text-center text-xl font-semibold text-green-600 my-4">
            <p>Your booking has been confirmed!</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {restaurant?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {restaurant?.locality}, {restaurant?.city}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4 flex justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-700">
                Booking Details
              </h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Contact No:</strong> {user.contactNo}
              </p>
            </div>
            {/* Delete Button */}
            <Button
              onClick={handleDelete}
              className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer transition duration-200 ease-in-out mr-12"
            >
              Delete
            </Button>
          </div>

          {/* Reservation Info */}
          <div className="space-y-2 mb-4">
            <h3 className="font-medium text-lg text-gray-700">
              Reservation Info
            </h3>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(datetime).toLocaleString()}
            </p>
            <p>
              <strong>Guest Count:</strong> {guest}
            </p>
          </div>

          {/* Restaurant Details */}
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src="https://img.freepik.com/free-photo/grilled-beef-pork-with-fresh-guacamole-generated-by-ai_188544-38177.jpg"
              alt={restaurant?.name || "restaurant"}
              width={400}
              height={200}
              className="w-24 h-24 object-cover rounded-full"
            />
            <div className="space-y-1">
              <p className="font-medium text-gray-800">{restaurant?.name}</p>
              <p className="text-sm text-gray-500">
                {restaurant?.cuisines.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Avg. Rating: {restaurant?.avgRating}
              </p>
              <p className="text-sm text-gray-500">
                Cost for Two: ₹{restaurant?.costForTwo}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
