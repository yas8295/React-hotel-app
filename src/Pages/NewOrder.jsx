import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Services/RestaurantApi";
import store from "../Services/Store";
import { clearCart } from "../Services/CartSlice";
import { fetchAddress } from "../Services/UserSlice";
import EmptyCart from "../Components/EmptyCart";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export default function NewOrder() {
  const dispatch = useDispatch();
  const { price: orderCost, pizzas } = useSelector((state) => state.cart);
  const {
    userName,
    position,
    address,
    status: state,
    error,
  } = useSelector((state) => state.user);
  const errors = useActionData();
  const status = useNavigation();
  const submitting = status.state === "submitting";

  function getPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  const cart = Array.from(new Set(pizzas.slice().map((p) => p.id)))
    .map((id) => pizzas.slice().filter((p) => p.id === id))
    .map((p) => ({
      pizzaId: p[0].id,
      name: p[0].name,
      quantity: p.length,
      unitPrice: p[0].unitPrice,
      totalPrice: p[0].unitPrice * p.length,
    }));

  if (!pizzas.length)
    return (
      <div className="w-full h-full grow dark:bg-stone-900 dark:text-slate-200">
        <EmptyCart></EmptyCart>
      </div>
    );

  return (
    <div className="w-full dark:bg-stone-900 dark:text-slate-200 px-5 overflow-y-auto overflow-x-hidden grow">
      <motion.div
        className="flex my-5 gap-7 mx-auto lg:w-4/6 flex-col items-start grow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h1 className="text-[23px] font-medium">Ready to order? Let's go!</h1>
        <Form method="POST" className="flex flex-col gap-6 w-full">
          <div className="flex gap-2 sm:flex-row flex-col sm:items-center w-full">
            <h1 className="text-lg w-40">First Name</h1>
            <div className="flex flex-col grow relative gap-2">
              <input
                className={`px-5 py-2  ${
                  errors?.customer && "outline-red-400 outline"
                } rounded-3xl focus:outline-yellow-500 focus:outline-none transition-all duration-200 bg-white-100 grow w-full dark:bg-[#a39c83] dark:text-black placeholder:text-black`}
                type="text"
                defaultValue={userName}
                name="customer"
              />
              <AnimatePresence mode="popLayout">
                {errors && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.9, duration: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="text-sm text-red-400"
                  >
                    {errors.customer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-row flex-col sm:items-center w-full">
            <h1 className="text-lg w-56 sm:basis-40">Phone Number</h1>
            <div className="flex flex-col gap-2 grow">
              <input
                className={`px-5 py-2 rounded-3xl ${
                  errors?.phone && "outline-red-400 outline"
                } focus:outline-yellow-500 focus:outline-none transition-all duration-200 bg-white-100 grow dark:bg-[#a39c83] dark:text-black placeholder:text-black`}
                type="tel"
                name="phone"
              />
              <AnimatePresence mode="popLayout">
                {errors?.phone && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.9, duration: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="text-sm text-red-400"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-row flex-col sm:items-center w-full">
            <h1 className="text-lg w-52">Address</h1>
            <div className="flex flex-col w-full relative gap-2">
              <input
                className={`px-5 w-full py-2 ${
                  error || (errors?.address && "outline-red-400 outline")
                } rounded-3xl focus:outline-yellow-500 focus:outline-none transition-all duration-200 bg-white-100 grow dark:bg-[#a39c83] dark:text-black placeholder:text-black`}
                type="text"
                name="address"
                defaultValue={position?.latitude && address}
                disabled={state === "loading"}
              />
              <AnimatePresence mode="wait">
                {state === "ready" ? null : (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="rounded-3xl bg-yellow-400 dark:text-black hover:bg-yellow-300 py-2 px-5 hover:duration-500 text-center absolute right-[2px] top-[2.5px] text-sm"
                    onClick={(e) => getPosition(e)}
                    disabled={state === "loading"}
                  >
                    GET POSITION
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                {error ||
                  (errors && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", bounce: 0.9, duration: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="text-sm text-red-400"
                    >
                      {error || errors.address}
                    </motion.p>
                  ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex gap-3 flex-row sm:items-center w-full mb-5">
            <input
              className="h-6 w-6 cursor-pointer accent-yellow-400 duration-500 focus:ring-2 ring-offset-2 ring-yellow-400"
              type="checkbox"
              name="priority"
              id="priority"
            />
            <label className="text-lg cursor-pointer" htmlFor="priority">
              Do you want to give your order priority?
            </label>
          </div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={JSON.stringify(position)}
          />
          <Button
            title={`${
              submitting ? "...SEND ORDER" : `ORDER NOW FROM €${orderCost}.00`
            }`}
            align="self-start"
            padding="px-7 py-3"
            textSize="text-base font-medium"
          ></Button>
        </Form>
      </motion.div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (!data.customer) {
    errors.customer = "You must fill this field";
  }

  if (!data.address) {
    errors.address =
      "There was a problem getting your address. Make sure to fill this field!";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/React-Pizza-App/order/${newOrder.id}`);
}
