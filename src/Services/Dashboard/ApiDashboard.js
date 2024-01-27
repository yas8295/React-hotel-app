import { getToday } from "../Helpers";
import supabase from "../Supabase";

export async function getBookingsDays(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("created_at", date.toISOString())
    .lte("created_at", new Date("2024-01-26").toISOString());

  if (error) throw new Error(error.message);

  return data;
}

export async function getTodayBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,guests(*)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) throw new Error(error.message);

  return data;
}
