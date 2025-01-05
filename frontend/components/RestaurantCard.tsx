import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Restaurant } from "@/app/type";
import ReservationDialog from "./ReservationDialog";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div>
      <Card
        key={restaurant._id}
        className="shadow-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105"
      >
        <CardHeader className="relative">
          <Image
            src="https://img.freepik.com/free-photo/grilled-beef-pork-with-fresh-guacamole-generated-by-ai_188544-38177.jpg"
            alt={restaurant.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-2 py-1 rounded-md">
            {restaurant.cuisines.join(", ")}
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold text-gray-800">
            {restaurant.name}
          </CardTitle>
          <p className="text-sm text-gray-600">
            Rating:{" "}
            <span className="text-green-600 font-semibold">
              {restaurant.avgRating}⭐
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Delivery Time: {restaurant.deliveryTime} mins
          </p>
          <p className="text-sm text-gray-600">
            Cost for Two: {restaurant.costForTwo}
          </p>
          <p className="text-sm text-gray-600">Area: {restaurant.areaName}</p>
        </CardContent>
        <CardFooter>
          <ReservationDialog  key={restaurant._id} restaurant={restaurant} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
