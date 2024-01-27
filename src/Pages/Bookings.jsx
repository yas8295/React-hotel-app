import React from "react";
import Heading from "../Reusable/Heading";
import "../Components/Bookings/Bookings.module.css";
import BookingContent from "../Components/Bookings/BookingContent";
import BookingSortButtons from "../Components/Bookings/BookingSortButtons";
import { useGetBookings } from "../Services/Bookings/useBookingsHook";
import Loader from "../Reusable/Loader";
import BookingFooterPagination from "../Components/Bookings/BookingFooterPagination";

export default function Bookings() {
  const { isLoading, bookings, count } = useGetBookings();

  return (
    <>
      <div className="bookings h-full flex flex-col">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Heading>All Bookings</Heading>
          <BookingSortButtons></BookingSortButtons>
        </div>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <BookingContent bookings={bookings} count={count}></BookingContent>
        )}
        {count ? (
          <BookingFooterPagination count={count}></BookingFooterPagination>
        ) : null}
      </div>
    </>
  );
}
