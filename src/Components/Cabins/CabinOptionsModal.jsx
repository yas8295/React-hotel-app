import React, { useEffect, useRef, useState } from "react";
import AddCabinModal from "./AddCabinModal";
import { AnimatePresence, motion } from "framer-motion";
import { IoDuplicate } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCabinModal from "./DeleteCabinModal";

export default function CabinOptionsModal({
  cabin,
  deleteCabin: deleteCabinFn,
  duplicateCabinfn,
  id,
  setEditCabin,
}) {
  const [updateCabin, setUpdateCabin] = useState(false);
  const [deleteCabin, setDeleteCabin] = useState(false);
  const { image, name, maxCapacity, regularPrice, discount } = cabin;
  const ref = useRef();

  useEffect(
    function () {
      function closeOptions(e) {
        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          e.target.nextSibling !== ref.current &&
          !e.target.classList.contains("delete-modal") &&
          !e.target.parentElement.classList.contains("update-modal")
        ) {
          setEditCabin(false);
        }
      }
      document.addEventListener("click", closeOptions, true);

      return document.addEventListener("click", closeOptions);
    },
    [setEditCabin]
  );

  return (
    <>
      <motion.div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "35px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "35px", opacity: 0 }}
        className="flex flex-col text-[12px] font-light absolute top-[48px] right-[20px] z-[100] bg-white dark:bg-[#18212f] rounded-md dark:shadow-[0px_0px_8px_1px_#171515] shadow-[0px_0px_10px_0px_#d8d8d5]"
      >
        <h1
          onClick={(e) => {
            duplicateCabinfn({
              image,
              name,
              maxCapacity,
              regularPrice,
              discount,
            });
            e.stopPropagation();
          }}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
        >
          <IoDuplicate /> Duplicate
        </h1>
        <h1
          onClick={(e) => {
            setUpdateCabin((a) => !a);
            e.stopPropagation();
          }}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
        >
          <MdModeEdit /> Edit
        </h1>
        <h1
          onClick={(e) => {
            setDeleteCabin(true);
            e.stopPropagation();
          }}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
        >
          <MdDelete />
          Delete
        </h1>
      </motion.div>
      <AnimatePresence mode="wait">
        {updateCabin ? (
          <AddCabinModal
            cabin={cabin}
            setUpdateCabin={setUpdateCabin}
            id={id}
            setEditCabin={setEditCabin}
          >
            <h1
              onClick={(e) => {
                e.preventDefault();
                setUpdateCabin(false);
              }}
              className="top-2 right-2 absolute text-lg cursor-pointer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                ariahidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </h1>
          </AddCabinModal>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {deleteCabin ? (
          <DeleteCabinModal
            deleteCabinFn={deleteCabinFn}
            id={id}
          ></DeleteCabinModal>
        ) : null}
      </AnimatePresence>
    </>
  );
}
