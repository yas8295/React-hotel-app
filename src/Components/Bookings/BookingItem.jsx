import React from "react";
import { motion } from "framer-motion";
import { formatDistanceFromNow, formatCurrency } from "../../Services/Helpers";
import BookingOptionModal from "./BookingOptionModal";
import { format } from "date-fns";
import {
  useDeleteBooking,
  useUpdateBooking,
} from "../../Services/Bookings/useBookingsHook";
import Loader from "../../Reusable/Loader";

export default function BookingItem({ booking }) {
  const { mutate: checkOutBooking, isLoading: isUpdating } = useUpdateBooking();
  const { mutate: deleteBookingFn, isLoading: isDeleting } = useDeleteBooking();

  function updeteBooking(id) {
    let newBooking = {
      status: "checked-out",
    };
    checkOutBooking({ id, newBooking });
  }

  function deleteBooking(id) {
    deleteBookingFn(id);
  }

  if (isUpdating || isDeleting) return <Loader></Loader>;

  return (
    <div className="grid relative grid-cols-[0.4fr_1.6fr_1.9fr_1fr_0.8fr_0.3fr] ps-3 pe-1 gap-4 items-center bg-white dark:bg-[#18212f] border-b-[1px] dark:border-b-gray-700 py-1">
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {booking.cabins.name}
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-medium w-full flex flex-col"
      >
        {booking.guests.fullName}
        <span className="opacity-60 text-[11px]">{booking.guests.email}</span>
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-medium text-[12px] w-full flex flex-col"
      >
        <p>
          {formatDistanceFromNow(booking.startDate)} &rarr; {booking.numNights}{" "}
          night stay
        </p>
        <span className="opacity-60 text-[11px]">
          {format(new Date(booking.startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.endDate), "MMM dd yyyy")}
        </span>
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-[10px] w-fit text-center font-semibold px-2 py-[2px] ${
          booking.status === "unconfirmed"
            ? "bg-sky-100 dark:bg-sky-800"
            : booking.status === "checked-out"
            ? "bg-slate-200 dark:bg-slate-700"
            : "bg-green-100 dark:bg-green-800"
        } rounded-3xl dark:text-white`}
      >
        {booking.status.toUpperCase().replace("-", " ")}
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[12px] font-semibold"
      >
        {formatCurrency(booking.totalPrice)}
      </motion.h1>
      <BookingOptionModal.Menu onClick={(e) => e.stopPropagation()}>
        <BookingOptionModal.Open id={booking.id}></BookingOptionModal.Open>
        <BookingOptionModal.Window
          key={booking.id}
          id={booking.id}
          booking={booking}
          updeteBooking={updeteBooking}
          deleteBooking={deleteBooking}
        ></BookingOptionModal.Window>
      </BookingOptionModal.Menu>
    </div>
  );
}
