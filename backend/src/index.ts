import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import restaurantRoute from "./routes/restaurants";
import bookingRoute from "./routes/booking";
import RestaurantInfos from "./model/restaurants";

mongoose.set("debug", true); // Enable Mongoose query logging

mongoose
  .connect(process.env.MONGODB_CONNECTIONS_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(4000, () => {
      console.log(`Server is running at PORT_NO: 4000: http://localhost:4000/`);
    });
  })
  .catch((err) => console.log("MongoDB error: ", err));


const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health Ok" });
});

app.use("/api/v1/restaurants", restaurantRoute);
app.use("/api/v1/bookings", bookingRoute);
