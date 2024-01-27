import React from "react";
import BookingItem from "./BookingItem";
import BookingOptionModal from "./BookingOptionModal";
import { AnimatePresence, motion } from "framer-motion";

export default function BookingContent({ bookings }) {
  if (bookings.length === 0)
    return (
      <h1 className="w-full h-full flex items-center justify-center text-center">
        Empty bookings
      </h1>
    );

  return (
    <BookingOptionModal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="overflow-x-auto mt-4 shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] bg-white dark:bg-[#18212f] rounded-ss-lg rounded-se-lg"
      >
        <div className="text-[13px] font-semibold min-w-[650px]">
          <div className="grid grid-cols-[0.4fr_1.6fr_1.9fr_1fr_0.8fr_0.3fr] pe-1 gap-4 items-center py-3 ps-3 bg-[#f5f5f4] dark:bg-[#101620]">
            <h1>CABIN</h1>
            <h1>GUEST</h1>
            <h1>DATES</h1>
            <h1>STATUS</h1>
            <h1>AMOUNT</h1>
            <div></div>
          </div>
          <AnimatePresence mode="sync">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking}></BookingItem>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </BookingOptionModal>
  );
}
