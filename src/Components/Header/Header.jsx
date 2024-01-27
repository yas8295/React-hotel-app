import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./Header.module.css";
import DarkModeButton from "./DarkModeButton";
import { useSignout } from "../../Services/Authentication/useAuthentication";
import MiniLoader from "../../Reusable/MiniLoader";
import UserData from "./UserData";

export default function Header() {
  const { mutate, isLoading } = useSignout();

  return (
    <div className="header flex justify-end items-center gap-2 px-5 py-[7px] md:py-3 text-[17px] text-[#5c58b2] shadow-[10px_1px_11px_0px_rgba(0,0,0,0.1)] dark:bg-[#18212f] dark:text-[#6862de] font-semibold">
      <UserData></UserData>
      <NavLink
        className="p-1 rounded-md focus:ring-2 focus:ring-[#4f46e5]"
        to={"/account"}
      >
        <FaRegUser />
      </NavLink>
      <DarkModeButton></DarkModeButton>
      <button
        onClick={() => mutate()}
        className="max-h-[25px] max-w-[22px] ms-1"
      >
        {isLoading ? (
          <div className="text-[#6862de]">
            <MiniLoader></MiniLoader>
          </div>
        ) : (
          <FiLogOut />
        )}
      </button>
    </div>
  );
}
