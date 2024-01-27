import React from "react";
import { useGetUser } from "../../Services/Authentication/useAuthentication";
import { motion } from "framer-motion";

export default function UserData() {
  const { data } = useGetUser();

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2 me-3"
    >
      {data?.user_metadata?.avatar && (
        <img
          className="rounded-full border-[1px] border-indigo-600"
          src={data?.user_metadata?.avatar}
          alt=""
          width={"30px"}
        />
      )}
      <h1 className="text-[12px] dark:text-slate-300 font-semibold capitalize">
        {data?.user_metadata?.fullName}
      </h1>
    </motion.div>
  );
}
