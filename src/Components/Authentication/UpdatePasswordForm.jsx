import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import MiniLoader from "../../Reusable/MiniLoader";
import Button from "../../Reusable/Button";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../Services/Authentication/useAuthentication";

export default function UpdatePasswordForm() {
  const { mutate: mutatePassword, isLoading } = useUpdatePassword();

  function updatePassword(data) {
    const { password } = data;
    mutatePassword(password);
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <motion.form
      onSubmit={handleSubmit(updatePassword)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col w-full sm:px-8 sm:py-4  py-6 px-3 gap-4 rounded-lg bg-white text-[12px] dark:bg-[#18212f]"
    >
      <div className="flex gap-2 items-center  flex-wrap sm:flex-nowrap">
        <label className="w-56" htmlFor="password">
          New Password (min 8 characters)
        </label>
        <div className="flex gap-2 items-center flex-wrap  grow">
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            disabled={isLoading}
          />
          <AnimatePresence mode="popLayout">
            {errors?.password && (
              <motion.h1
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-red-500 text-[12px] min-w-24 mt-[-4px]"
              >
                {errors?.password.type === "required"
                  ? "This field required"
                  : "Password must be 8 length or more"}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex gap-2 items-center  flex-wrap sm:flex-nowrap">
        <label className="w-56" htmlFor="repeatPassword">
          Confirm password
        </label>
        <div className="flex gap-2 items-center flex-wrap  grow">
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) => value === getValues().password,
            })}
            disabled={isLoading}
          />
          <AnimatePresence mode="popLayout">
            {errors?.confirmPassword && (
              <motion.h1
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-red-500 text-[12px] min-w-24 mt-[-4px]"
              >
                Not match with password
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
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
          className="w-32 h-[35px]"
          padding=""
          disabled={isLoading}
        >
          {isLoading ? <MiniLoader></MiniLoader> : "Update password"}
        </Button>
      </div>
    </motion.form>
  );
}
