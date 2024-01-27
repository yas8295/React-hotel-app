import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatCurrency } from "../../Services/Helpers";
import CabinOptionsModal from "./CabinOptionsModal";
import Loader from "../../Reusable/Loader";
import {
  useDeleteCabin,
  useDuplicateCabin,
  useUpdateCabin,
} from "../../Services/cabins/cabinsHook";

export default function CabinsItem({ cabin }) {
  const [editCabin, setEditCabin] = useState(false);
  const { isLoading: isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { isLoading: isDuplicating, duplicateCabinfn } = useDuplicateCabin();
  const { isLoading: isUpdating } = useUpdateCabin();

  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;

  if (isDuplicating || isDeleting || isUpdating) {
    return <Loader></Loader>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "spring", duration: 1 }}
      className="grid relative grid-cols-[0.7fr_1fr_1.5fr_1fr_1fr_0.3fr] pe-1 gap-4 items-center bg-white dark:bg-[#18212f] border-b-[1px] dark:border-b-gray-700 py-1"
    >
      <motion.img
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        transition={{ duration: 1 }}
        src={image}
        alt=""
        className="w-[80px] h-[40px]"
      />
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {name}
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-medium"
      >
        Fits up to {maxCapacity} guests
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-[12px] font-bold"
      >
        {formatCurrency(regularPrice)}
      </motion.h1>
      <motion.h1
        initial={{ rotateX: "90deg", opacity: 0 }}
        whileInView={{ rotateX: "0deg", opacity: 1 }}
        transition={{ duration: 1 }}
        className="dark:text-green-100 text-green-700 text-[12px] font-semibold"
      >
        {discount ? formatCurrency(discount) : "—"}
      </motion.h1>
      <button
        onClick={(b) => {
          b.stopPropagation();
          setEditCabin((e) => !e);
        }}
        className="text-[15px] self-center w-7 h-7 font-sans cursor-pointer focus:ring-1 focus:ring-[#4f46e5] focus:rounded-md"
      >
        ⁝
      </button>
      <AnimatePresence mode="wait">
        {editCabin ? (
          <CabinOptionsModal
            cabin={cabin}
            deleteCabin={deleteCabin}
            duplicateCabinfn={duplicateCabinfn}
            id={id}
            setEditCabin={setEditCabin}
          ></CabinOptionsModal>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
