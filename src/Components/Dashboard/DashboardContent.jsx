import React from "react";
import DashboardStatisticsHeader from "./DashboardStatisticsHeader";
import { useBookingsDays } from "../../Services/Dashboard/useDashboard.Hooks";
import { useFetchCabins } from "../../Services/cabins/cabinsHook";
import Loader from "../../Reusable/Loader";
import SalesChart from "./SalesChart";
import NightsStats from "./NightsStats";
import BookingToday from "./BookingToday";

export default function DashboardContent() {
  const { data: bookings, isLoading: isLoadingBookings } = useBookingsDays();
  const { isLoading: isLoadingcabins, cabins } = useFetchCabins();

  if (isLoadingBookings || isLoadingcabins) return <Loader></Loader>;

  return (
    <>
      <DashboardStatisticsHeader
        bookings={bookings}
        cabins={cabins}
      ></DashboardStatisticsHeader>
      <div className="mt-4 overflow-hidden grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-3 w-full sm:flex-nowrap flex-wrap">
        <BookingToday></BookingToday>
        <NightsStats bookings={bookings}></NightsStats>
      </div>
      <div className="overflow-hidden">
        <SalesChart bookings={bookings}></SalesChart>
      </div>
    </>
  );
}
