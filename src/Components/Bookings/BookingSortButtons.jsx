import React, { useContext } from "react";
import Button from "../../Reusable/Button";
import { contexts } from "../../Services/Context";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

export default function BookingSortButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode } = useContext(contexts);
  searchParams.set("status", searchParams.get("status") || "all");

  function handleSortBy(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex text-[13px] items-center gap-3 flex-wrap-reverse">
      <div className="flex p-1 dark:bg-[#18212f] bg-white rounded gap-1 flex-wrap shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] sm:w-fit grow">
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("status", "all");
            searchParams.set("page", 1);
            setSearchParams(searchParams);
          }}
          className={`${searchParams.get("status") === "all" ? "active" : ""}`}
          disabled={searchParams.get("status") === "all"}
        >
          All
        </Button>
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("status", "checked-out");
            searchParams.set("page", 1);
            setSearchParams(searchParams);
          }}
          className={`${
            searchParams.get("status") === "checked-out" ? "active" : ""
          }`}
          disabled={searchParams.get("status") === "checked-out"}
        >
          Checked out
        </Button>
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("status", "checked-in");
            searchParams.set("page", 1);
            setSearchParams(searchParams);
          }}
          className={`${
            searchParams.get("status") === "checked-in" ? "active" : ""
          }`}
          disabled={searchParams.get("status") === "checked-in"}
        >
          Checked in
        </Button>
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("status", "unconfirmed");
            searchParams.set("page", 1);
            setSearchParams(searchParams);
          }}
          className={`${
            searchParams.get("status") === "unconfirmed" ? "active" : ""
          }`}
          disabled={searchParams.get("status") === "unconfirmed"}
        >
          Unconfirmed
        </Button>
      </div>
      <motion.select
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onChange={handleSortBy}
        className="text-black dark:text-stone-100 p-2 dark:bg-[#18212f] bg-white rounded-md self-stretch focus:outline-2 focus:outline-[#4f46e5] focus:outline-none shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] sm:w-fit grow"
      >
        <option value="startDate-desc">Sort by date (recent first)</option>
        <option value="startDate-asc">Sort by date (earlier first)</option>
        <option value="totalPrice-desc">Sort by amount (high first)</option>
        <option value="totalPrice-asc">Sort by amount (low first)</option>
      </motion.select>
    </div>
  );
}
