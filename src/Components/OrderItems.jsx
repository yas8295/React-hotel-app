import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetcher } from "react-router-dom";

export default function OrderItems({ item }) {
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: "-100%" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
      className="flex flex-col gap-1 py-2 border-b border-gray-300 dark:border-gray-600"
    >
      <div className="flex gap-2 justify-between items-center">
        <h1>
          {item.quantity}× {item.name}
        </h1>
        <h1>€{item.totalPrice}.00</h1>
      </div>
      {!fetcher?.data ? (
        <AnimatePresence mode="wait">
          <motion.h1
            exit={{ rotate: "-180deg" }}
            transition={{ duration: 0.2 }}
            className="italic text-[15px] capitalize opacity-50"
          >
            Loading Ingredients...{" "}
          </motion.h1>
        </AnimatePresence>
      ) : (
        <motion.h1
          initial={{ rotateX: "180deg", opacity: 0 }}
          animate={{ rotateX: 0, opacity: 0.55 }}
          transition={{ duration: 0.7 }}
          className="italic text-[15px] capitalize dark:text-white"
        >
          {fetcher.data
            .slice()
            .filter((pizza) => pizza.name === item.name)
            .map((pizza) => pizza.ingredients)
            .join(", ")}
        </motion.h1>
      )}
    </motion.div>
  );
}
