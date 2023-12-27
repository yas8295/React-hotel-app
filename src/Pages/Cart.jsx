import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  deletePizza,
  addPizza,
  removePizza,
} from "../Services/CartSlice";
import { motion } from "framer-motion";
import EmptyCart from "../Components/EmptyCart";

export default function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const pizzas = useSelector((state) => state.cart.pizzas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!pizzas.length)
    return (
      <div className="w-full h-full grow dark:bg-stone-900 dark:text-slate-200">
        <EmptyCart></EmptyCart>
      </div>
    );

  return (
    <div className="w-full dark:bg-stone-900 dark:text-slate-200 px-5 overflow-y-auto overflow-x-hidden grow">
      <motion.div
        className="flex my-5 gap-7 mx-auto md:w-4/6 flex-col items-start grow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Link className="flex gap-2 items-center" to={"/React-Pizza-App/Menu"}>
          <span className="rounded-full grow flex justify-center items-center bg-yellow-500 px-2 text-lg w-fit no-underline text-black">
            ←
          </span>
          <span className=" text-blue-600 hover:underline dark:text-white">
            to menu
          </span>
        </Link>
        <h1 className="text-xl font-semibold">Your cart, {userName}</h1>
        {Array.from(new Set(pizzas.slice().map((p) => p.id)))
          .map((id) => pizzas.slice().filter((p) => p.id === id))
          .map((p) => (
            <div
              key={Math.random()}
              className="flex items-center gap-4 justify-between flex-wrap w-full"
            >
              <p className="text-lg">
                {p.length}× {p[0].name}
              </p>
              <div className="flex gap-3 items-center">
                <h1
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  €
                  {p
                    .slice()
                    .map((p) => p.unitPrice)
                    .reduce((acc, cur) => acc + cur)}
                  .00
                </h1>
                <div className="flex gap-2 items-center">
                  <Button
                    initial={{ scale: 1, opacity: 1 }}
                    title="-"
                    textSize="font-bold"
                    rounded="rounded-full"
                    padding="px-3 py-1"
                    focus="focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2"
                    event={(e) => dispatch(removePizza(p[0].id))}
                  ></Button>
                  <h1>{p.length}</h1>
                  <Button
                    initial={{ scale: 1, opacity: 1 }}
                    title="+"
                    textSize="font-bold"
                    rounded="rounded-full"
                    padding="px-3 py-1"
                    focus="focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2"
                    event={(e) => dispatch(addPizza(p[0]))}
                  ></Button>
                </div>
                <Button
                  initial={{ scale: 1, opacity: 1 }}
                  title="DELETE"
                  event={(e) => dispatch(deletePizza(p[0].id))}
                ></Button>
              </div>
            </div>
          ))}
        <div className="flex gap-5">
          <Button
            title="ORDER PIZZAS"
            padding="py-3 px-5"
            event={(e) => navigate("/React-Pizza-App/order/new")}
          ></Button>
          <Button
            title="CLEAR CART"
            padding="py-3 px-5"
            bg="bg-transparent"
            textColor="dark:text-white"
            border="border border-solid border-gray-600"
            hover="hover:bg-gray-200"
            event={(e) => dispatch(clearCart())}
          ></Button>
        </div>
      </motion.div>
    </div>
  );
}
