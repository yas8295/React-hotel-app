import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import image from "../images/cute-pizza-mascot-conducting-research-holding-magnifying-glass_700108-642.jpg";

export default function MenuError() {
  return (
    <div className="w-full dark:bg-stone-900 dark:text-slate-200 px-5 overflow-y-auto overflow-x-hidden grow">
      <motion.div
        className="flex my-5 gap-3 flex-col mx-auto lg:w-4/6 items-start grow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Link className="flex gap-2 items-center" to={"/React-Pizza-App/"}>
          <span className="rounded-full flex justify-center items-center text-black bg-yellow-500 px-2 text-lg w-fit no-underline">
            ←
          </span>
          <span className="text-blue-600 hover:underline dark:text-white">
            GO BACK
          </span>
        </Link>
        <h1 className="text-lg font-semibold">
          Something went wrong! <br /> when fetching data from the menu, please
          check your internet or visit us later.
        </h1>
        <img className="grow self-center" src={image} alt="" width={"300px"} />
      </motion.div>
    </div>
  );
}
