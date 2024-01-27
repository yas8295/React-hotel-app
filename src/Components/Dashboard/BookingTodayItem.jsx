import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateBooking } from "../../Services/Bookings/useBookingsHook";
import Button from "../../Reusable/Button";
import MiniLoader from "../../Reusable/MiniLoader";

export default function BookingTodayItem({ booking }) {
  const { mutate, isLoading: isUpdating } = useUpdateBooking();
  const navigate = useNavigate();

  function checkOut(id) {
    const newBooking = { status: "checked-out" };
    mutate({ id, newBooking });
  }

  if (booking.status === "checked-out") return;

  return (
    <div className="grid sm:grid-cols-[0.8fr_1.6fr_0.7fr_0.9fr] sm:grid-rows-1 grid-rows-2 grid-cols-[1fr_1fr_1fr] items-center gap-2">
      <h1
        className={`text-[10px] w-fit text-center font-semibold px-2 py-[2px] ${
          booking.status === "unconfirmed"
            ? "bg-green-100 dark:bg-green-800"
            : booking.status === "checked-in"
            ? "bg-sky-100 dark:bg-sky-800"
            : ""
        } rounded-3xl dark:text-white`}
      >
        {booking.status === "unconfirmed"
          ? "ARRIVING"
          : booking.status === "checked-in"
          ? "DEPARTING"
          : null}
      </h1>
      <div className="flex gap-2 items-center font-semibold text-[12px] text-start">
        <img src={booking.guests?.countryFlag} alt="" width={"15px"} />
        <h1>{booking.guests?.fullName}</h1>
      </div>
      <h1 className="font-medium text-[11px]">{booking.numNights} nights</h1>
      <Button
        onClick={() => {
          booking.status === "unconfirmed"
            ? navigate(`/bookings/${booking.id}?checkIn=true`)
            : checkOut(booking.id);
        }}
        className="text-[9px] font-semibold sm:col-span-1 col-span-3"
        padding="px-3 py-1"
        disabled={isUpdating}
      >
        {isUpdating ? (
          <MiniLoader></MiniLoader>
        ) : booking.status === "unconfirmed" ? (
          "CHECK IN"
        ) : booking.status === "checked-in" ? (
          "CHECK OUT"
        ) : null}
      </Button>
    </div>
  );
}
