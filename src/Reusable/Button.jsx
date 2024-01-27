import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  bg = "bg-[#4f46e5]",
  hover = "hover:bg-[#4a36c9]",
  border = "",
  text = "text-white",
  padding = "px-3 py-2",
  disabled = false,
  type = "",
  className = "",
  mode = "",
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={onClick}
        className={`duration-300 ${bg} ${text} ${padding} rounded-md ${hover} ${border} ${className} ${mode} disabled:cursor-not-allowed`}
        disabled={disabled}
        type={type}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
}
