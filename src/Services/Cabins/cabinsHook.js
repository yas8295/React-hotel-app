import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCabin,
  deleteCabin,
  getCabins,
  updateCabin,
  duplicateCabin,
} from "./ApiCabins";
import toast from "react-hot-toast";

export function useFetchCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
}

export function useAddCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addCabinOnSubmit } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(`${err.message}`),
  });

  return { isLoading, addCabinOnSubmit };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isLoading, mutate };
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateCabinOnSubmit } = useMutation({
    mutationFn: ({ cabin, id }) => updateCabin(cabin, id),
    onSuccess: () => {
      toast.success("cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updateCabinOnSubmit };
}

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: duplicateCabinfn } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      toast.success("cabin successfully duplicated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, duplicateCabinfn };
}
