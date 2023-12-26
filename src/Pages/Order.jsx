import React from "react";
import { motion } from "framer-motion";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../Services/RestaurantApi";
import OrderItems from "../Components/OrderItems";
import Button from "../Reusable/Button";

function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export default function Order() {
  const fetcher = useFetcher();
  const pizzas = useLoaderData();

  const deliveryIn = calcMinutesLeft(pizzas.estimatedDelivery);

  return (
    <div className="w-full px-5 dark:bg-stone-900 dark:text-slate-200 overflow-y-auto overflow-x-hidden grow">
      <motion.div
        className="flex my-5 gap-7 mx-auto lg:w-4/6 flex-col items-start grow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-between items-center w-full flex-wrap gap-4">
          <h1 className="text-xl font-semibold">Order #{pizzas.id} status</h1>
          <div className="flex gap-2">
            {pizzas.priority ? (
              <motion.h1
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-4 py-1 text-[14px] text-white font-semibold bg-red-600 rounded-2xl"
              >
                PRIORITY
              </motion.h1>
            ) : null}
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-1 text-[14px] text-white font-semibold bg-green-600 rounded-2xl"
            >
              PREPARING ORDER
            </motion.h1>
          </div>
        </div>
        <div className="flex justify-between items-center bg-stone-200 dark:bg-stone-700 p-5 w-full flex-wrap gap-4">
          <h1 className="font-medium text-lg">
            {deliveryIn >= 0
              ? `Only ${deliveryIn} minutes left`
              : "Order should have arrived"}
          </h1>
          <p className="text-sm text-stone-500 dark:text-white dark:opacity-60">
            (Estimated delivery: {formatDate(pizzas.estimatedDelivery)})
          </p>  
        </div>
        <div className="flex flex-col w-full">
          {pizzas.cart.map((item) => (
            <OrderItems key={item.name} item={item}></OrderItems>
          ))}
        </div>
        <div className="flex flex-col bg-stone-200 dark:bg-stone-700 p-5 w-full flex-wrap gap-1">
          <h1>Price pizza: €{pizzas.orderPrice}.00</h1>
          {pizzas.priorityPrice ? (
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Price priority: €{pizzas.priorityPrice}.00
            </motion.h1>
          ) : null}
          <h1 className="text-lg font-semibold">
            To pay on delivery: €{pizzas.priorityPrice + pizzas.orderPrice}.00
          </h1>
        </div>
        {pizzas.priority ? null : (
          <fetcher.Form method="PATCH" className="self-end">
            <Button
              title="MAKE PRIORITY"
              padding="px-5 py-3"
              textSize="font-semibold"
            ></Button>
          </fetcher.Form>
        )}
      </motion.div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
