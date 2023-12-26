import { AnimatePresence, motion } from "framer-motion";
import Button from "../Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPizza, removePizza, deletePizza } from "../Services/CartSlice";
import { useState } from "react";

function MenuItem({ pizza }) {
  const pizzas = useSelector((state) => state.cart.pizzas);
  const inCart = pizzas.slice().find((p) => p.id === pizza.id);
  const quantity = pizzas.slice().filter((p) => p.id === pizza.id).length;
  const [addToCart, setAddToCart] = useState(inCart);
  const [sum, setSum] = useState(quantity);

  const dispatch = useDispatch();

  function add() {
    dispatch(addPizza(pizza));
    setSum(1);
    setAddToCart((add) => !add);
  }

  function clearPizza() {
    dispatch(deletePizza(pizza.id));
    setAddToCart(false);
  }

  function inc() {
    setSum((sum) => sum + 1);
    dispatch(addPizza(pizza));
  }

  function dec() {
    setSum((sum) => sum - 1);
    dispatch(removePizza(pizza.id));
    if (sum === 1 || sum === 0) {
      setAddToCart(false);
      return;
    }
  }

  return (
    <div className="flex gap-3 py-2 md:px-0 px-2 justify-between md:w-4/6 mx-auto w-full border-solid border-gray-300 dark:border-gray-700 border-b">
      <motion.img
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
        className={`${
          pizza.soldOut ? "grayscale opacity-70 self-start" : "self-start"
        }`}
        src={pizza.imageUrl}
        alt=""
        width={`100px`}
        height={`100px`}
      />
      <div className="flex flex-col gap-3 justify-between grow ">
        <div className="flex flex-col grow overflow-hidden">
          <motion.h1
            initial={{ y: "-100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="font-semibold"
          >
            {pizza.name}
          </motion.h1>
          <motion.i
            initial={{ y: "-100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="opacity-50 text-sm capitalize"
          >
            {pizza.ingredients.join(", ")}
          </motion.i>
        </div>
        <div className="flex grow justify-between gap-2 items-center">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            £{pizza.unitPrice}.00
          </motion.h1>
          <div className="flex items-center justify-center gap-2 flex-wrap-reverse">
            <AnimatePresence mode="popLayout">
              {addToCart ? (
                <div className="flex gap-2 items-center">
                  <Button
                    title="-"
                    textSize="font-bold"
                    rounded="rounded-full"
                    padding="px-3 py-1"
                    focus="focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2"
                    event={dec}
                  ></Button>
                  <motion.h1
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    {sum}
                  </motion.h1>
                  <Button
                    title="+"
                    textSize="font-bold"
                    rounded="rounded-full"
                    padding="px-3 py-1"
                    focus="focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2"
                    event={inc}
                  ></Button>
                </div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {!pizza.soldOut ? (
                <Button
                  title={`${addToCart ? "DELETE" : "ADD TO CART"}`}
                  event={addToCart ? clearPizza : add}
                ></Button>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
