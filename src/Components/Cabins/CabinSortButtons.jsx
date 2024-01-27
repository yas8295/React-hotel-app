import React, { useContext } from "react";
import Button from "../../Reusable/Button";
import { useNavigate } from "react-router-dom";
import { contexts } from "../../Services/Context";
import { motion } from "framer-motion";

export default function CabinSortButtons({ select, setSelect, sort }) {
  const navigate = useNavigate();
  const { mode } = useContext(contexts);

  return (
    <div className="flex text-[13px] items-center gap-3 flex-wrap-reverse">
      <div className="flex p-1 dark:bg-[#18212f] bg-white rounded gap-1 grow shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b]">
        <Button
          onClick={() => navigate(`/cabins?sort=all&select=${select}`)}
          text="text-black dark:text-stone-100"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          className={`${sort === "all" && "active"}`}
          mode={`${mode === "dark" ? "dark" : ""}`}
        >
          All
        </Button>
        <Button
          onClick={() => navigate(`/cabins?sort=no-discount`)}
          text="text-black dark:text-stone-100"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          className={`${sort === "no-discount" && "active"}`}
          mode={`${mode === "dark" ? "dark" : ""}`}
        >
          No discount
        </Button>
        <Button
          onClick={() => navigate(`/cabins?sort=with-discount`)}
          text="text-black dark:text-stone-100"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          className={`${sort === "with-discount" && "active"}`}
          mode={`${mode === "dark" ? "dark" : ""}`}
        >
          With discount
        </Button>
      </div>
      <motion.select
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className="text-black dark:text-stone-100 p-2 dark:bg-[#18212f] bg-white rounded-md self-stretch focus:outline-2 focus:outline-[#4f46e5] focus:outline-none grow shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b]"
      >
        <option value="A-Z">Sort by name (A-Z)</option>
        <option value="Z-A">Sort by name (Z-A)</option>
        <option value="priceLow">Sort by price (low first)</option>
        <option value="priceHigh">Sort by price (high first)</option>
        <option value="capacityLow">Sort by capacity (low first)</option>
        <option value="capacityHigh">Sort by capacity (high first)</option>
      </motion.select>
    </div>
  );
}
