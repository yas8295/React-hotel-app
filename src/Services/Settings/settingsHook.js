import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSettings, updateSettings } from "./ApiSettings";
import toast from "react-hot-toast";

export function useSettings() {
  const { isLoading, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, data };
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
