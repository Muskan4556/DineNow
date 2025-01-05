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
      <Card className="shadow-xl border border-gray-200 rounded-lg overflow-hidden bg-white">
        <CardHeader className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold text-gray-50">
              {restaurant?.name}
            </h2>
            <p className="text-sm text-gray-200">
              {restaurant?.locality}, {restaurant?.city}
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-800">
                Booking Details
              </h3>
              <p>
                <span className="font-semibold">Name: </span>
                {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Contact No:</span>{" "}
                {user.contactNo}
              </p>
            </div>
            <Button
              variant={"outline"}
              onClick={handleDelete}
              className=" hover:bg-red-700 hover:text-white cursor-pointer transition duration-200 ease-in-out"
            >
              Delete
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-lg text-gray-800">
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

          <div className="flex items-center space-x-6 mb-6">
            <Image
              src="https://img.freepik.com/free-photo/grilled-beef-pork-with-fresh-guacamole-generated-by-ai_188544-38177.jpg"
              alt={restaurant?.name || "restaurant"}
              width={400}
              height={200}
              className="w-24 h-24 object-cover rounded-lg shadow-lg"
            />
            <div className="space-y-2">
              <p className="font-semibold text-xl text-gray-800">
                {restaurant?.name}
              </p>
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
