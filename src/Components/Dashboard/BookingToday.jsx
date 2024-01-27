import React from "react";
import { useTodayBookings } from "../../Services/Dashboard/useDashboard.Hooks";
import Loader from "../../Reusable/Loader";
import BookingTodayItem from "./BookingTodayItem";
import { motion } from "framer-motion";

export default function BookingToday() {
  const { data, isLoading } = useTodayBookings();

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "just", duration: 0.6 }}
      className="p-4 rounded-md dark:bg-[#18212f] bg-white text-[13px] grow"
    >
      <h1 className="font-semibold mb-5 text-[16px]">Today</h1>
      <div className="flex flex-col gap-1 flex-wrap">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          data.map((b) => (
            <BookingTodayItem key={b.id} booking={b}></BookingTodayItem>
          ))
        )}
      </div>
    </motion.div>
  );
}
