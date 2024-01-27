import React from "react";
import Button from "../../Reusable/Button";
import { motion } from "framer-motion";

export default function DeleteCabinModal({ deleteCabinFn, id }) {
  return (
    <div className="fixed flex items-center justify-center dark:text-stone-100 h-screen w-screen z-[200] top-0 left-0 p-5">
      <div className="w-full h-full top-0 left-0 backdrop-blur-sm bg-[#000000bd] z-[10] absolute"></div>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        className="flex delete-modal relative flex-col dark:bg-[#18212f] bg-white rounded-xl gap-2 p-7 z-50"
      >
        <h1 className="top-2 right-2 text-slate-400 absolute text-lg cursor-pointer">
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
        <h1 className="delete-modal">Delete cabins</h1>
        <p className="text-[13px] text-neutral-400 delete-modal">
          Are you sure you want to delete this cabin
        </p>
        <div className="flex gap-3 self-end text-[11px] mt-7 delete-modal">
          <Button
            bg="bg-transparent"
            hover="hover:bg-zinc-100 dark:hover:bg-[#101620]"
            border="border-[1px] border-stone-700"
            text="text-black dark:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteCabinFn(id)}
            bg="bg-red-700"
            hover="hover:bg-red-800"
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
