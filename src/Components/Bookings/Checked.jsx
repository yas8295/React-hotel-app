import React, { useState } from "react";
import { formatCurrency } from "../../Services/Helpers";
import Button from "../../Reusable/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Checked({
  settings,
  booking,
  navigate,
  checkIn,
  checkInOutBooking,
}) {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [paid, setPaid] = useState(false);

  function updeteBooking(id) {
    if (!paid && !booking[0].isPaid)
      return toast.error("should confirmed paid before checked in");
    let newBooking = {
      isPaid: true,
      status:
        booking[0].status === "unconfirmed" ? "checked-in" : "checked-out",
      hasBreakfast: booking[0].hasBreakfast || addBreakfast,
      totalPrice: addBreakfast
        ? booking[0].cabinPrice +
          settings[0]?.breakfastPrice *
            booking[0].numNights *
            booking[0].numGuests
        : booking[0].totalPrice,
    };
    checkInOutBooking({ id, newBooking });
  }

  return (
    <>
      {!booking[0].hasBreakfast && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex sm:items-center items-start gap-3 mt-5 rounded-md py-5 sm:px-5 px-3 dark:bg-[#18212f] bg-white text-[14px] font-medium"
        >
          <input
            className="min-w-4 min-h-4 cursor-pointer rounded-lg"
            type="checkbox"
            id="breakfast"
            onChange={() => setAddBreakfast((e) => !e)}
          />
          <label className="cursor-pointer" htmlFor="breakfast">
            Want to add breakfast for{" "}
            {formatCurrency(
              settings[0]?.breakfastPrice *
                booking[0].numNights *
                booking[0].numGuests
            )}
            ?
          </label>
        </motion.div>
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="flex sm:items-center items-start gap-3 mt-5 rounded-md py-5 sm:px-5 px-3 dark:bg-[#18212f] bg-white text-[14px] font-medium"
      >
        <input
          className="min-w-4 min-h-4 cursor-pointer rounded-lg"
          type="checkbox"
          id="price"
          onChange={() => setPaid((e) => !e)}
          disabled={booking[0].isPaid}
          defaultChecked={booking[0].isPaid}
        />
        <label className="cursor-pointer" htmlFor="price">
          I confirm that Aleksander K has paid the total amount of{" "}
          {formatCurrency(
            addBreakfast
              ? booking[0].totalPrice +
                  settings[0]?.breakfastPrice *
                    booking[0].numNights *
                    booking[0].numGuests
              : booking[0].totalPrice
          )}{" "}
          {booking[0].hasBreakfast || addBreakfast
            ? `(${formatCurrency(
                booking[0].cabinPrice
              )} cabin + ${formatCurrency(
                settings[0]?.breakfastPrice *
                  booking[0].numNights *
                  booking[0].numGuests
              )} breakfast)`
            : null}
        </label>
      </motion.div>
      <div className="flex justify-end gap-3 mt-4 text-[12px]">
        <Button
          onClick={() => updeteBooking(booking[0].id)}
          disabled={
            booking[0].status === "unconfirmed"
              ? false
              : !paid && !booking[0].isPaid
              ? true
              : addBreakfast
              ? false
              : booking[0].isPaid
              ? true
              : paid
              ? false
              : true
          }
        >
          {checkIn ? `Check in booking #${booking[0].id}` : "Check in"}
        </Button>
        <Button
          onClick={() => navigate(-1)}
          bg="dark:bg-[#18212f] bg-white"
          hover="hover:bg-zinc-100 dark:hover:bg-zinc-900"
          border="border-[1px] border-stone-700"
          text="text-black dark:text-white"
        >
          Back
        </Button>
      </div>
    </>
  );
}
