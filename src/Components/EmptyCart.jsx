import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <div className=" mx-auto px-3 md:w-4/6 my-5 overflow-hidden">
      <Link
        className="flex gap-2 items-center w-24"
        to={"/React-Pizza-App/Menu"}
      >
        <span className="rounded-full flex justify-center items-center bg-yellow-500 px-2 text-lg w-fit no-underline text-black">
          ←
        </span>
        <span className=" text-blue-600 hover:underline dark:text-white">
          to menu
        </span>
      </Link>
      <motion.h1
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-5 font-semibold text-lg"
      >
        Your cart is still empty. Start adding some pizzas :)
      </motion.h1>
    </div>
  );
}
