import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getUser,
  login,
  signUp,
  signout,
  updatePassword,
  updateUserData,
} from "./ApiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      toast.success(
        "account successfully created please confirm from your e-mail"
      );
    },
  });

  return { mutate, isLoading };
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useGetUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { data, isLoading };
}

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { mutate, isLoading };
}

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (user) => {
      toast.success("account updated successfully");
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { mutate, isLoading };
}

export function useUpdatePassword() {
  const { mutate, isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (user) => {
      toast.success("account updated successfully");
    },
  });

  return { mutate, isLoading };
}
