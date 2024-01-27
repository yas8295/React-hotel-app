import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import MiniLoader from "../../Reusable/MiniLoader";
import { useUpdateUserData } from "../../Services/Authentication/useAuthentication";
import Button from "../../Reusable/Button";

export default function UpdateDataFoem({ user }) {
  const { mutate: mutateData, isLoading } = useUpdateUserData();

  function updateUserData(data) {
    mutateData({ ...data, accountAvatar: user?.user_metadata?.avatar });
  }

  const { register, handleSubmit } = useForm();

  return (
    <motion.form
      onSubmit={handleSubmit(updateUserData)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col w-full sm:px-8 sm:py-4 py-6 px-3 gap-4 rounded-lg bg-white text-[12px] dark:bg-[#18212f]"
    >
      <div className="flex gap-2 items-center flex-wrap">
        <label className="w-56" htmlFor="email">
          Email address
        </label>
        <input
          className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
          type="text"
          id="email"
          placeholder="Email"
          defaultValue={user.email}
          readOnly
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <label className="w-56" htmlFor="name">
          Full name
        </label>
        <input
          className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
          type="text"
          id="fullName"
          defaultValue={user?.user_metadata?.fullName}
          {...register("fullName", { required: true })}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap mt-2">
        <label className="w-56" htmlFor="avatar">
          Avatar Image
        </label>
        <input
          className="sm:w-72 sm:grow-0 grow"
          type="file"
          id="avatar"
          {...register("avatar")}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-3 sm:self-end text-[11px] mt-3">
        <Button
          bg="bg-transparent"
          hover="hover:bg-zinc-100 dark:hover:bg-[#101620]"
          border="border-[1px] border-stone-700"
          text="text-black dark:text-white"
          type="reset"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="w-24 h-[35px]"
          padding=""
          disabled={isLoading}
        >
          {isLoading ? <MiniLoader></MiniLoader> : "Update user"}
        </Button>
      </div>
    </motion.form>
  );
}
