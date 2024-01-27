import React, { useContext } from "react";
import { motion } from "framer-motion";
import { contexts } from "../Services/Context";

export default function Heading({ children }) {
  const { mode } = useContext(contexts);

  return (
    <motion.h1
      initial={{ opacity: 0, y: "-100%", rotate: "50deg" }}
      animate={{ opacity: 1, y: "10%", rotate: "-4deg" }}
      drag
      dragConstraints={{
        top: 0,
        left: -50,
        right: 100,
        bottom: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 1.5,
      }}
      className={`wood flex gap-3 justify-center items-center font-medium md:text-xl text-lg mb-5 relative z-50 w-fit px-5 py-2 rounded-xl ${
        mode === "dark" ? "dark" : ""
      }`}
    >
      {children}
    </motion.h1>
  );
}
