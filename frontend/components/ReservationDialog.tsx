import { useEffect, useMemo, useState } from "react";
import { format, addDays, isToday } from "date-fns";
import { Calendar, Clock, Users, User, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { Restaurant } from "@/app/type";

interface ReservationDialogProps {
  restaurant: Restaurant;
}

const ReservationDialog = ({ restaurant }: ReservationDialogProps) => {
  const formSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits")
      .optional(),
    selectedDate: z.string().min(1, "Date is required"),
    selectedTime: z.string().min(1, "Time is required"),
    guests: z.number().min(1, "At least 1 guest is required"),
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [guests, setGuests] = useState<number>(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentDate = useMemo(() => new Date(), []);

  const currentTime = format(new Date(), "HH:mm");

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(format(currentDate, "yyyy-MM-dd"));
    }
  }, [currentDate, selectedDate]);

  const daysOfWeek = [...Array(7)].map((_, i) => addDays(currentDate, i));

  const timeSlots = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const isFormValid =
    selectedDate && selectedTime && guests && fullName && email && phone;

  const handleConfirmReservation = () => {
    const formData = {
      fullName,
      email,
      phone,
      selectedDate: selectedDate || "",
      selectedTime,
      guests,
    };

    const validation = formSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};

      for (const [key, value] of Object.entries(fieldErrors)) {
        if (value && value.length > 0) {
          formattedErrors[key] = value[0];
        }
      }

      setErrors(formattedErrors);
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        selectedDate: true,
        selectedTime: true,
        guests: true,
      });
    } else {
      setErrors({});
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full">
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-auto h-96 md:w-full w-[90%] rounded-md">
        <DialogHeader>
          <h1 className="text-2xl font-bold text-gray-900">
            Table Reservation
          </h1>
          <p className="text-gray-500 mt-1">Book your dining experience</p>
        </DialogHeader>

        <div className="p-6">
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Calendar className="w-5 h-5" />
              Select Date
            </label>
            <div className="grid md:grid-cols-7 grid-cols-3 gap-2">
              {daysOfWeek.map((date, i) => {
                const day = format(date, "d");
                const dayOfWeek = format(date, "EEE");
                const formattedDate = format(date, "yyyy-MM-dd");
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(formattedDate)}
                    className={`p-4 rounded-lg border text-center hover:border-blue-500 transition-colors
                            ${
                              selectedDate === formattedDate
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white"
                            }
                            ${isToday(date) ? "bg-blue-500" : ""}`}
                  >
                    <div className="text-sm">{dayOfWeek}</div>
                    <div className="font-bold">{day}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Clock className="w-5 h-5" />
              Select Time
            </label>
            <div className="grid md:grid-cols-4 grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border text-center hover:border-blue-500 transition-colors
                          ${
                            selectedTime === time
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white"
                          }
                          ${currentTime > time ? "text-gray-400" : ""}`}
                  disabled={currentTime > time}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Users className="w-5 h-5" />
              Number of Guests
            </label>
            <div className="grid md:grid-cols-4 grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => setGuests(num)}
                  className={`p-3 rounded-lg border text-center hover:bg-blue-500 hover:text-white transition-colors
                          ${
                            guests === num
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white"
                          }`}
                >
                  {num} {num === 1 ? "Guest" : "Guests"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              <p className="font-semibold">Reservation at {restaurant.name}:</p>
              <p>
                {`${format(
                  new Date(selectedDate || currentDate),
                  "MMM d, yyyy"
                )} at ${selectedTime} for ${guests} Guest${
                  guests > 1 ? "s" : ""
                }`}
              </p>
            </div>
            <button
              onClick={handleConfirmReservation}
              className={`w-full sm:w-auto px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                !isFormValid ? "bg-gray-300 cursor-not" : ""
              }`}
              disabled={!isFormValid}
            >
              Confirm Reservation
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;
