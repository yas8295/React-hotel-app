import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiUsersThreeBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import "./SideBar.module.css";
import { contexts } from "../../Services/Context";
import { motion } from "framer-motion";

export default function SideBar() {
  const { mode } = useContext(contexts);

  return (
    <div className="sideBar flex flex-col gap-3 items-center row-span-2 lg:py-7 py-4 lg:px-5 px-1 text-sm shadow-[1px_0px_11px_0px_rgba(0,0,0,0.1)] dark:bg-[#18212f] dark:text-stone-300">
      <motion.img
        initial={{ x: "-200%", opacity: 0, scale: 0 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        className="w-[110px] lg:block hidden"
        src={`${mode === "dark" ? "logo-dark.png" : "logo-light.png"}`}
        alt=""
      />
      <motion.img
        initial={{ x: "-200%", opacity: 0, scale: 0 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        className="w-[30px] lg:hidden block"
        src="header.png"
        alt=""
      />
      <motion.div
        initial={{ y: "-200%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="overflow-y-hidden flex flex-col gap-2 lg:mt-4 lg:items-start items-center w-full"
      >
        <NavLink
          to="/"
          className={`flex items-center gap-2 py-2 lg:pe-16 lg:ps-3 grow w-full hover:bg-gray-100 dark:hover:bg-[#101820] duration-300 ${
            mode === "dark" ? "dark" : ""
          }`}
        >
          <IoHomeOutline className="text-[18px] lg:mx-0 mx-auto dark:text-gray-400" />
          <h1 className="lg:block hidden">Home</h1>
        </NavLink>
        <NavLink
          className={`flex items-center gap-2 py-2 lg:pe-16 lg:ps-3 grow w-full hover:bg-gray-100 dark:hover:bg-[#101820] duration-300 ${
            mode === "dark" ? "dark" : ""
          }`}
          to="/bookings"
        >
          <SlCalender className="text-[18px] lg:mx-0 mx-auto dark:text-gray-400" />
          <h1 className="lg:block hidden">Bookings</h1>
        </NavLink>
        <NavLink
          className={`flex items-center gap-2 py-2 lg:pe-16 lg:ps-3 grow w-full hover:bg-gray-100 dark:hover:bg-[#101820] duration-300 ${
            mode === "dark" ? "dark" : ""
          }`}
          to={`/cabins?sort=all`}
        >
          <HiOutlineHomeModern className="text-[18px] lg:mx-0 mx-auto dark:text-gray-400" />
          <h1 className="lg:block hidden">Cabins</h1>
        </NavLink>
        <NavLink
          className={`flex items-center gap-2 py-2 lg:pe-16 lg:ps-3 grow w-full hover:bg-gray-100 dark:hover:bg-[#101820] duration-300 ${
            mode === "dark" ? "dark" : ""
          }`}
          to="/users"
        >
          <PiUsersThreeBold className="text-[18px] lg:mx-0 mx-auto dark:text-gray-400" />
          <h1 className="lg:block hidden">Users</h1>
        </NavLink>
        <NavLink
          className={`flex items-center gap-2 py-2 lg:pe-16 lg:ps-3 grow w-full hover:bg-gray-100 dark:hover:bg-[#101820] duration-300 ${
            mode === "dark" ? "dark" : ""
          }`}
          to="/settings"
        >
          <IoSettingsOutline className="text-[18px] lg:mx-0 mx-auto dark:text-gray-400" />
          <h1 className="lg:block hidden">Settings</h1>
        </NavLink>
      </motion.div>
    </div>
  );
}
