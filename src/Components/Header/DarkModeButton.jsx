import React, { useContext, useState } from "react";
import { contexts } from "../../Services/Context";
import { BsSunFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { FaRegMoon } from "react-icons/fa";

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else if (localStorage.theme === "light") {
  document.documentElement.classList.remove("dark");
}

function mode() {
  document.documentElement.classList.toggle("dark");
  if (localStorage.theme === "light" || !localStorage.theme)
    localStorage.theme = "dark";
  else localStorage.theme = "light";
}

export default function DarkModeButton() {
  const [darkMode, setMode] = useState(localStorage.theme || "light");
  const { setMode: change } = useContext(contexts);

  return (
    <button
      className="p-1 rounded-md focus:ring-2 focus:ring-[#4f46e5]"
      onClick={(e) => {
        setMode((m) => (m === "light" ? "dark" : "light"));
        mode();
        change(localStorage.theme);
      }}
    >
      {darkMode === "light" ? (
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: 0 }}
          exit={{ rotate: 180 }}
        >
          <FaRegMoon />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: 0 }}
          exit={{ rotate: 180 }}
        >
          <BsSunFill />
        </motion.div>
      )}
    </button>
  );
}
