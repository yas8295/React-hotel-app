import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "./ApiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { pageSize } from "../../Components/Bookings/pageCount";
import toast from "react-hot-toast";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // sort
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction };

  // filter
  const filter = searchParams.get("status") || "all";

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryFn: () => getBookings({ page, sort, filter }),
    queryKey: ["bookings", page, sort, filter],
  });

  const queryClient = useQueryClient();

  if (page < count / pageSize)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ page: page + 1, sort, filter }),
      queryKey: ["bookings", page + 1, sort, filter],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ page: page - 1, sort, filter }),
      queryKey: ["bookings", page - 1, sort, filter],
    });

  return { isLoading, bookings, count };
}

export function useGetBooking() {
  const { bookingId } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["booking", bookingId],
  });

  return { data, isLoading };
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newBooking) => updateBooking(newBooking),
    onSuccess: () => {
      toast.success("booking successfully updated");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("booking successfully deleted");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
