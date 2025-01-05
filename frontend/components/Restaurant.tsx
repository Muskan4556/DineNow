"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Hero from "./Hero";
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "@/app/type";
import { useAllResturants } from "@/app/client-api/restaurant";
import Loader from "./Loader";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { restaurants } = useAllResturants();
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (restaurants) {
      setRestaurantData(restaurants);
    }
  }, [restaurants]);

  const filteredRestaurants = restaurantData.filter((restaurant) => {
    const matchesName = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCuisines = restaurant.cuisines.some((cuisine) =>
      cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchesName || matchesCuisines;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Hero />

      <div className="container mx-auto px-4 py-6">
        <div className="relative w-full max-w-lg mx-auto">
          <Input
            placeholder="Search for a restaurant or cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-blue-600 rounded-lg text-gray-700 focus:ring-blue-300 py-3 pl-10 pr-4 text-sm"
          />
          <div className="absolute left-3 top-2.5 text-blue-600">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">
          Featured Restaurants
        </h2>
        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
