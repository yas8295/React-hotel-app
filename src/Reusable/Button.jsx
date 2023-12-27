import { motion } from "framer-motion";
import React from "react";

export default function Button({
  initial = { scale: 0, opacity: 0 },
  title,
  transition = { type: "spring", duration: 1 },
  event = function () {},
  textColor = "text-black",
  padding = "py-2 px-5",
  hover = "hover:bg-yellow-300",
  bg = "bg-yellow-400",
  border = "",
  width = "",
  rounded = "rounded-3xl",
  textSize = "text-sm",
  focus = "focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2",
  align = "self-center",
}) {
  return (
    <motion.button
      initial={initial}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={transition}
      exit={{ scale: 0, opacity: 0 }}
      onClick={(e) => event()}
      className={`${rounded} ${hover} hover:duration-500 hover:text-black ${textSize} ${bg} ${border} ${width} ${padding} ${focus} text-center ${align} ${textColor}`}
    >
      {title}
    </motion.button>
  );
}
