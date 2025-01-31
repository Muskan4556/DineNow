export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  user: string;
  locality: string;
  areaName: string;
  city: string;
  costForTwo: string;
  deliveryPrice: number;
  deliveryTime: number;
  avgRating?: number;
  cuisines: Array<string>;
  menuItems: Array<MenuItem>;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookingType = {
  _id?: string;
  restaurantId?: string;
  restaurant?: Restaurant;
  datetime: string;
  guest: number;
  user: {
    name: string;
    email: string;
    contactNo: string;
  };
};
