import React from "react";
import Loader from "../../Reusable/Loader";
import CabinsItem from "./CabinsItem";
import { motion } from "framer-motion";

export default function CabinContent({ isLoading, cabins = [], sort, select }) {
  if (select === "A-Z") cabins?.sort((a, b) => a.name - b.name);
  if (select === "Z-A") cabins?.sort((a, b) => b.name - a.name);
  if (select === "priceLow")
    cabins?.sort((a, b) => a.regularPrice - b.regularPrice);
  if (select === "priceHigh")
    cabins?.sort((a, b) => b.regularPrice - a.regularPrice);
  if (select === "capacityLow")
    cabins?.sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (select === "capacityHigh")
    cabins?.sort((a, b) => b.maxCapacity - a.maxCapacity);

  if (!cabins) return "not found";

  return !isLoading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-x-auto rounded-lg mt-4 shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] bg-white dark:bg-[#18212f]"
    >
      <div className="text-[13px] font-semibold min-w-[550px]">
        <div className="grid grid-cols-[0.7fr_1fr_1.5fr_1fr_1fr_0.3fr] pe-1 gap-4 items-center py-3 bg-[#f5f5f4] dark:bg-[#101620]">
          <div></div>
          <h1 className="">CABIN</h1>
          <h1 className="">CAPACITY</h1>
          <h1 className="">PRICE</h1>
          <h1 className="">DISCOUNT</h1>
          <div></div>
        </div>
        {!sort &&
          cabins.map((cabin) => (
            <CabinsItem cabin={cabin} key={cabin.id}></CabinsItem>
          ))}
        {sort === "all" &&
          cabins.map((cabin) => (
            <CabinsItem cabin={cabin} key={cabin.id}></CabinsItem>
          ))}
        {sort === "no-discount" &&
          cabins
            .filter((cabin) => cabin.discount === 0)
            .map((cabin) => (
              <CabinsItem cabin={cabin} key={cabin.id}></CabinsItem>
            ))}
        {sort === "with-discount" &&
          cabins
            .filter((cabin) => cabin.discount !== 0)
            .map((cabin) => (
              <CabinsItem cabin={cabin} key={cabin.id}></CabinsItem>
            ))}
      </div>
    </motion.div>
  ) : (
    <Loader></Loader>
  );
}
