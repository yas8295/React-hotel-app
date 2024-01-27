import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Heading from "../Reusable/Heading";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { GrCurrency } from "react-icons/gr";
import Button from "../Reusable/Button";
import Loader from "../Reusable/Loader";
import {
  useDeleteBooking,
  useGetBooking,
  useUpdateBooking,
} from "../Services/Bookings/useBookingsHook";
import { useSettings } from "../Services/settings/settingsHook";
import { format } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../Services/Helpers";
import { LiaComment } from "react-icons/lia";
import Checked from "../Components/Bookings/Checked";
import { AnimatePresence, motion } from "framer-motion";

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn") || false;
  const { data: booking, isLoading } = useGetBooking();
  const { mutate: checkInOutBooking, isLoading: bookingUpdateLoading } =
    useUpdateBooking();
  const { mutate: deleteBookingFn, isLoading: isDeleting } = useDeleteBooking();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const { bookingId } = useParams();

  function updeteBooking(id) {
    let newBooking = {
      status: "checked-out",
    };
    checkInOutBooking({ id, newBooking });
  }

  function deleteBooking(id) {
    deleteBookingFn(id);
  }

  if (isLoading || settingsLoading || bookingUpdateLoading || isDeleting)
    return (
      <div className="w-full h-full">
        <Loader></Loader>
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Heading>
          Booking #{bookingId}{" "}
          <p
            className={`text-[11px] w-fit text-center font-semibold px-3 uppercase
          ${
            booking[0].status === "unconfirmed"
              ? "bg-sky-100 dark:bg-sky-800"
              : booking[0].status === "checked-out"
              ? "bg-slate-200 dark:bg-slate-700"
              : "bg-green-100 dark:bg-green-800"
          } rounded-3xl dark:text-white`}
          >
            {booking[0].status}
          </p>
        </Heading>
        <button
          onClick={() => navigate("/bookings")}
          className="text-[#6b65db] font-semibold sm:block hidden"
        >
          ← Back
        </button>
      </div>
      <div className="flex flex-col mt-[10px]">
        <motion.div
          initial={{ rotate: "-90deg", opacity: 0, transformOrigin: "left" }}
          animate={{ rotate: "0", opacity: 1 }}
          transition={{ type: "just", duration: 0.5 }}
          className="flex sm:justify-between justify-center items-center gap-2 rounded-t-md py-3 sm:px-5 px-3 bg-[#6366f1] text-zinc-200 flex-wrap"
        >
          <h1 className="flex items-center gap-2 font-medium text-[14px]">
            <span className="text-[26px]">
              <HiOutlineHomeModern />
            </span>
            {booking[0].numNights} nights in Cabin {booking[0].cabinId}
          </h1>
          <h1 className="font-medium text-[14px]">
            {format(new Date(booking[0].startDate), "iii")},{" "}
            {format(new Date(booking[0].startDate), "MMM dd yyyy")} (
            {formatDistanceFromNow(booking[0].startDate)}) &mdash;{" "}
            {format(new Date(booking[0].endDate), "iii")},{" "}
            {format(new Date(booking[0].endDate), "MMM dd yyyy")}
          </h1>
        </motion.div>
        <motion.div
          initial={{ rotate: "90deg", opacity: 0, transformOrigin: "left" }}
          animate={{ rotate: "0", opacity: 1 }}
          transition={{ type: "just", duration: 0.5 }}
          className="flex flex-col gap-5 rounded-b-md py-3 sm:px-5 px-3 dark:bg-[#18212f] bg-white text-[14px] font-medium"
        >
          <h1 className="mt-3 flex items-center sm:gap-4 gap-2 flex-wrap">
            <img src={booking[0].guests.countryFlag} alt="" width={"20px"} />
            <span>
              {" "}
              {booking[0].guests.fullName}{" "}
              {booking[0].numGuests ? `+ ${booking[0].numGuests} guests` : null}{" "}
            </span>
            •<span className="text-zinc-400"> {booking[0].guests.email} </span>•
            <span className="text-zinc-400">
              National ID: {booking[0].guests.nationalID}
            </span>
          </h1>
          {booking[0].observations && (
            <h1 className="flex items-center gap-2">
              <span className="text-[#7b74ff]">
                <LiaComment />
              </span>
              <span className="me-2">Observations:</span>{" "}
              {booking[0].observations}
            </h1>
          )}
          <h1 className="flex items-center gap-2">
            <span className="text-[#7b74ff]">
              <IoCheckmarkDoneCircleOutline />
            </span>
            <span className="me-2">Breakfast included?</span>{" "}
            {booking[0].hasBreakfast ? "Yes" : "No"}
          </h1>
          <div
            className={`flex sm:justify-between items-center gap-2 sm:p-5 p-2 rounded-md text-[12px] font-semibold  dark:text-zinc-100 flex-wrap ${
              booking[0].isPaid
                ? "dark:bg-[#166534] bg-[#dcfce7] text-[#166534]"
                : "bg-yellow-100 dark:bg-[#854d0e] text-[#a36c2c]"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-[15px]">
                <GrCurrency />
              </span>
              <span>Total price</span> {formatCurrency(booking[0].totalPrice)}{" "}
              {booking[0].hasBreakfast &&
                `(${formatCurrency(
                  booking[0].cabinPrice
                )} cabin + ${formatCurrency(
                  settings[0]?.breakfastPrice *
                    booking[0].numNights *
                    booking[0].numGuests
                )} breakfast)`}
            </div>
            <h1>{booking[0].isPaid ? "PAID" : "WILL PAY AT PROPERTY"}</h1>
          </div>
          <h1 className="text-[11px] text-zinc-400 self-end mb-[5px]">
            Booked Sat, Jan 06 2024, 1:30 AM
          </h1>
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        {checkIn && (
          <Checked
            settings={settings}
            booking={booking}
            navigate={navigate}
            checkIn={checkIn}
            checkInOutBooking={checkInOutBooking}
          ></Checked>
        )}
      </AnimatePresence>
      {!checkIn && (
        <div className="flex justify-end gap-3 mt-4 text-[12px]">
          {booking[0].status !== "checked-out" && (
            <Button
              onClick={() => {
                booking[0].status === "unconfirmed" &&
                  navigate(`?checkIn=${true}`);
                booking[0].status === "checked-in" &&
                  updeteBooking(booking[0].id);
              }}
            >
              {booking[0].status === "unconfirmed" ? "Check in" : "Check out"}
            </Button>
          )}
          <Button
            onClick={() => {
              deleteBooking(booking[0].id);
              navigate(-1, { replace: true });
            }}
            bg="bg-red-700"
            hover="hover:bg-red-800"
          >
            Delete booking
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
      )}
    </>
  );
}
