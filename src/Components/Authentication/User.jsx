import React, { useEffect } from "react";
import { useGetUser } from "../../Services/Authentication/useAuthentication";
import Loader from "../../Reusable/Loader";
import { useNavigate } from "react-router-dom";

export default function User({ children }) {
  const { data, isLoading } = useGetUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (data?.role !== "authenticated" && !isLoading) navigate("/login");
    },
    [isLoading, data, navigate]
  );

  if (isLoading)
    return (
      <div className="w-screen h-screen dark:bg-[#15171d]">
        <Loader></Loader>
      </div>
    );

  return data?.role === "authenticated" && children;
}
