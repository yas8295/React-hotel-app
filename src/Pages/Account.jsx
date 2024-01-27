import React from "react";
import Heading from "../Reusable/Heading";
import { useGetUser } from "../Services/Authentication/useAuthentication";
import Loader from "../Reusable/Loader";
import UpdateDataFoem from "../Components/Authentication/UpdateDataFoem";
import UpdatePasswordForm from "../Components/Authentication/UpdatePasswordForm";

export default function Account() {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="flex flex-col gap-4">
      <Heading>Update your account</Heading>
      <p className="text-sm font-medium md:text-lg">Update user data</p>
      <UpdateDataFoem user={user}></UpdateDataFoem>
      <p className="text-sm font-medium md:text-lg mt-3">Update password</p>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}
