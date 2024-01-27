import React from "react";
import Button from "../../Reusable/Button";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../Reusable/Loader";
import { useAddCabin, useUpdateCabin } from "../../Services/Cabins/cabinsHook";
import { createPortal } from "react-dom";

function AddCabinModal({
  children,
  setAddCabin = () => {},
  setUpdateCabin = () => {},
  cabin = {},
  id = "",
  setEditCabin = () => {},
}) {
  const { isLoading: isCreating, addCabinOnSubmit } = useAddCabin();
  const { isLoading: isUpdating, updateCabinOnSubmit } = useUpdateCabin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: cabin });

  function addCabin(cabin) {
    if (!id)
      addCabinOnSubmit(
        { ...cabin, image: cabin.image[0] },
        {
          onSuccess: () => {
            reset();
            setAddCabin(false);
          },
        }
      );
    if (id)
      updateCabinOnSubmit(
        { cabin, id },
        {
          onSuccess: () => {
            reset();
            setUpdateCabin(false);
            setEditCabin(false);
            setAddCabin(false);
          },
        }
      );
  }

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full update-modal w-full dark:text-white fixed flex justify-center items-center left-0 top-0 z-[100]"
    >
      <div
        onClick={(e) => {
          setAddCabin(false);
          setUpdateCabin(false);
          e.stopPropagation();
        }}
        className="w-full h-full top-0 left-0 backdrop-blur-sm bg-[#000000bd] z-[10] absolute"
      ></div>
      {isCreating ? (
        <Loader></Loader>
      ) : isUpdating ? (
        <Loader></Loader>
      ) : (
        <motion.form
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(addCabin)}
          className="flex update-modal flex-col w-11/12 h-fit sm:max-w-[700px] justify-between sm:p-7 px-3 py-8 gap-4 rounded-lg bg-white text-[12px] dark:bg-[#18212f] relative z-20"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex update-modal flex-col gap-3"
          >
            <div className="flex update-modal gap-2 items-center">
              <label className="sm:w-56 w-32" htmlFor="name">
                Cabin name
              </label>
              <div className="flex update-modal flex-col gap-1">
                <input
                  className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "This Field is required",
                    validate: (value) =>
                      value.length < 4 || "name length should be less than 4",
                  })}
                />
                <AnimatePresence mode="popLayout">
                  {errors.name?.message && (
                    <motion.p
                      className="text-red-500 text-[11px] self-end"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {errors.name.message} ❌
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex update-modal gap-2 items-center ">
              <label className="sm:w-56 w-32" htmlFor="Maximum capacity">
                Maximum capacity
              </label>
              <div className="flex update-modal flex-col gap-1">
                <div className="flex update-modal flex-col gap-1">
                  <input
                    className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
                    type="number"
                    id="Maximum capacity"
                    defaultValue={1}
                    {...register("maxCapacity", {
                      required: "This Field is required",
                      validate: (value) =>
                        value < 5 || "capacity should be less than 5",
                      min: 1,
                    })}
                  />
                </div>
                <AnimatePresence mode="popLayout">
                  {errors.maxCapacity?.message && (
                    <motion.p
                      className="text-red-500 text-[11px] self-end"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {errors.maxCapacity.message} ❌
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex update-modal gap-2 items-center ">
              <label className="sm:w-56 w-32" htmlFor="Regular price">
                Regular price
              </label>
              <div className="flex update-modal flex-col gap-1">
                <input
                  className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
                  type="number"
                  id="Regular price"
                  {...register("regularPrice", {
                    required: "This Field is required",
                    min: 0,
                  })}
                />
                <AnimatePresence mode="popLayout">
                  {errors.regularPrice?.message && (
                    <motion.p
                      className="text-red-500 text-[11px] self-end"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {errors.regularPrice.message} ❌
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex update-modal gap-2 items-center ">
              <label className="sm:w-56 w-32" htmlFor="discount">
                Discount
              </label>
              <div className="flex update-modal flex-col gap-1">
                <input
                  className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
                  type="number"
                  id="discount"
                  {...register("discount", {
                    required: "This Field is required",
                    validate: (value) =>
                      Number(value) <= Number(getValues().regularPrice) ||
                      "discount should be less than or equal to price",
                  })}
                />
                <AnimatePresence mode="popLayout">
                  {errors.discount?.message && (
                    <motion.p
                      className="text-red-500 text-[11px] self-end"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {errors.discount.message} ❌
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex update-modal gap-2 items-center ">
              <label className="sm:w-56 w-24" htmlFor="description">
                Description
              </label>
              <textarea
                className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620] resize-none outline-none"
                {...register}
                id="description"
              />
            </div>
            <div className="flex update-modal gap-2 items-center">
              <label className="sm:w-56 w-32" htmlFor="image">
                Cabin photo
              </label>
              <div className="flex update-modal flex-col gap-1">
                <input
                  className="sm:w-72 sm:grow-0 w-40"
                  type="file"
                  id="image"
                  {...register("image", {
                    required: id ? false : "This Field is required",
                  })}
                />
                <AnimatePresence mode="popLayout">
                  {errors.image?.message && (
                    <motion.p
                      className="text-red-500 text-[11px] self-end"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {errors.image.message} ❌
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex update-modal gap-3 self-end text-[11px] mt-3">
            <Button
              bg="bg-transparent"
              hover="hover:bg-zinc-100 dark:hover:bg-[#101620]"
              border="border-[1px] border-stone-700"
              text="text-black dark:text-white"
              type={"reset"}
            >
              Clear
            </Button>
            <Button type="submit">
              {id ? "Edit cabin" : "Create new cabin"}
            </Button>
          </div>
          {children}
        </motion.form>
      )}
    </div>,
    document.body
  );
}

export default AddCabinModal;
