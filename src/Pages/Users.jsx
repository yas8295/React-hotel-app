import React from "react";
import Heading from "../Reusable/Heading";
import Button from "../Reusable/Button";
import MiniLoader from "../Reusable/MiniLoader";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSignUp } from "../Services/Authentication/useAuthentication";

export default function Users() {
  const { mutate, isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function signUp(data) {
    if (!errors) return;
    const { fullName, email, password } = data;
    mutate({ fullName, email, password }, { onSettled: reset() });
  }

  return (
    <div>
      <Heading>Create a new user</Heading>
      <motion.form
        onSubmit={handleSubmit(signUp)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col w-full sm:px-8 sm:py-4 py-6 px-3 mt-4 gap-4 rounded-lg bg-white text-[12px] dark:bg-[#18212f]"
      >
        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
          <label className="w-56" htmlFor="name">
            Full name
          </label>
          <div className="flex gap-2 items-center flex-wrap grow">
            <input
              className="sm:w-80 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
              type="text"
              id="name"
              {...register("fullName", { required: true })}
              disabled={isLoading}
            />
            <AnimatePresence mode="popLayout">
              {errors?.fullName && (
                <motion.p
                  className="text-red-500 text-[12px] min-w-24 mt-[-4px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  This field required
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-2 items-center  flex-wrap sm:flex-nowrap">
          <label className="w-56" htmlFor="email">
            Email address
          </label>
          <div className="flex gap-2 items-center flex-wrap  grow">
            <input
              className="sm:w-80 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
              type="text"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              disabled={isLoading}
            />
            <AnimatePresence mode="popLayout">
              {errors?.email && (
                <motion.p
                  className="text-red-500 text-[12px] min-w-24 mt-[-4px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  {errors.email.type === "pattern"
                    ? "Invalid email address !"
                    : "This field required"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-2 items-center  flex-wrap sm:flex-nowrap">
          <label className="w-56" htmlFor="password">
            Password (min 8 characters)
          </label>
          <div className="flex gap-2 items-center flex-wrap  grow">
            <input
              className="sm:w-80 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
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
            Repeat password
          </label>
          <div className="flex gap-2 items-center flex-wrap  grow">
            <input
              className="sm:w-80 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
              type="password"
              id="repeatPassword"
              {...register("repeatPassword", {
                validate: (value) => value === getValues().password,
              })}
              disabled={isLoading}
            />
            <AnimatePresence mode="popLayout">
              {errors?.repeatPassword && (
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
          <Button type="submit" className="w-32 h-9">
            {isLoading ? <MiniLoader></MiniLoader> : "Create new user"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
