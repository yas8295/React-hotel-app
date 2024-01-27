import { useQuery } from "react-query";
import { getBookingsDays, getTodayBookings } from "./ApiDashboard";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useBookingsDays() {
  const [searchParams] = useSearchParams();

  const days = searchParams.get("last") || 7;
  const date = subDays(new Date("2024-01-26"), days);

  const { data, isLoading } = useQuery({
    queryFn: () => getBookingsDays(date),
    queryKey: ["bookings", `last${days}`],
  });

  return { data, isLoading };
}

export function useTodayBookings() {
  const { data, isLoading } = useQuery({
    queryFn: getTodayBookings,
    queryKey: ["TodayBookings"],
  });

  return { data, isLoading };
}
