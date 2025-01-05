import { useCallback, useState } from "react";
import { BookingType } from "../type";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useCreateBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (formData: BookingType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to create booking");
        throw new Error(errorData.message || "Failed to create booking");
      }

      toast.success("Booking created successfully");

      return await response.json();
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createBooking, isLoading, error };
};

export const useGetBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to fetch bookings");
        throw new Error(errorData.message || "Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings);
      toast.success("Bookings fetched successfully");
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchBookings, bookings, isLoading, error };
};

export const useDeleteBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to delete booking");
        throw new Error(errorData.message || "Failed to delete booking");
      }

      toast.success("Booking deleted successfully");
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteBooking, isLoading, error };
};
