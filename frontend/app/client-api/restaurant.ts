
import { useCallback, useEffect, useState } from "react";
import { Restaurant } from "../type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAllResturants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllRestaurants = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/restaurants`);

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant info");
      }

      const data = await response.json();

      if (data?.restaurants && Array.isArray(data.restaurants)) {
        setRestaurants(data.restaurants);
      } else {
        console.error("Unexpected API response:", data);
        setRestaurants([]);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);

  return { restaurants, isLoading, error, refetch: getAllRestaurants };
};
