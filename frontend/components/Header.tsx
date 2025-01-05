import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-bold">
          Dine Now
        </Link>
        <Link href="/bookings">
          <div className="px-6 py-2 cursor-pointer">My Booking</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
