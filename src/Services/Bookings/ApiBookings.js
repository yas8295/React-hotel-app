import { pageSize } from "../../Components/Bookings/pageCount";
import supabase from "../Supabase";

export async function getBookings({ page, sort, filter }) {
  let query = supabase
    .from("bookings")
    .select(
      "startDate,endDate,status,numNights,totalPrice,id,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );

  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

  if (page) query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, error, count } = await query;

  if (error) throw new Error("could not loading data try again");

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateBooking({ id, newBooking }) {
  const { data, error } = await supabase
    .from("bookings")
    .update(newBooking)
    .eq("id", id);

  if (error) throw new Error("Booking updating failed");

  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error("could not delete booking");
}
