import React, { useContext } from "react";
import Button from "../Reusable/Button";
import { contexts } from "../Services/Context";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLogin } from "../Services/Authentication/useAuthentication";
import MiniLoader from "../Reusable/MiniLoader";

export default function Login() {
  const { mutate: loginFn, isLoading } = useLogin();
  const { mode } = useContext(contexts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login(data) {
    loginFn(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-3 px-1 bg-stone-100 dark:bg-[#101620] dark:text-stone-300">
      <motion.img
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sm:w-[130px] w-[110px]"
        src={`${mode === "dark" ? "logo-dark.png" : "logo-light.png"}`}
        alt=""
      />
      <motion.h1
        initial={{ rotateX: 180, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        className="mt-5 mb-7 sm:text-3xl text-xl font-semibold"
      >
        Log in to your account
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit(login)}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:w-[500px] w-11/12 sm:p-10 py-4 px-6 gap-2 rounded-lg bg-white text-sm dark:bg-[#18212f]"
      >
        <label htmlFor="email">Email address</label>
        <input
          className="ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md mb-3 focus:border-[#4f46e5] dark:bg-[#101620]"
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={"yassin@gmail.com"}
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
        />
        <AnimatePresence mode="popLayout">
          {errors?.email && (
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="mt-[-15px] text-right text-red-400"
            >
              {errors.email.type === "pattern"
                ? "Invalid email address !"
                : "This field required"}
            </motion.h1>
          )}
        </AnimatePresence>
        <label htmlFor="password">Password</label>
        <input
          className="ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md mb-4 focus:border-[#4f46e5] dark:bg-[#101620]"
          type="password"
          id="password"
          placeholder="Password"
          defaultValue={12345678}
          {...register("password", { required: true })}
        />
        <AnimatePresence mode="popLayout">
          {errors?.password && (
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="mt-[-15px] mb-2 text-right text-red-400"
            >
              This field required
            </motion.h1>
          )}
        </AnimatePresence>
        <Button type="submit" className="h-10">
          {isLoading ? <MiniLoader></MiniLoader> : "Log in"}
        </Button>
      </motion.form>
    </div>
  );
}
