import React from "react";
import {
  useSettings,
  useUpdateSettings,
} from "../Services/Settings/settingsHook";
import Heading from "../Reusable/Heading";
import Loader from "../Reusable/Loader";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function Settings() {
  const { isLoading, data } = useSettings();
  const { isLoading: isUpdating, mutate } = useUpdateSettings();
  const { register, handleSubmit } = useForm();

  function update(value, field) {
    if (!value) return;
    mutate({ [field]: value });
  }

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <Heading>Update hotel settings</Heading>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col w-full sm:px-8 sm:py-4 py-6 px-3 mt-4 gap-4 rounded-lg bg-white text-[12px] dark:bg-[#18212f]"
      >
        <div className="flex gap-2 items-center flex-wrap">
          <label className="w-56" htmlFor="Min nights">
            Minimum nights/booking
          </label>
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="number"
            id="Min nights"
            defaultValue={data[0].minimumNights}
            disabled={isUpdating}
            onBlur={(e) =>
              handleSubmit(update(e.target.value, "minimumNights"))
            }
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <label className="w-56" htmlFor="Max nights">
            Maximum nights/booking
          </label>
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="number"
            id="Max nights"
            defaultValue={data[0].maximumNights}
            disabled={isUpdating}
            {...register("maximumNights")}
            onBlur={(e) =>
              handleSubmit(update(e.target.value, "maximumNights"))
            }
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <label className="w-56" htmlFor="Max guests">
            Maximum guests/booking
          </label>
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="number"
            id="Max guests"
            defaultValue={data[0].maximumGuests}
            disabled={isUpdating}
            {...register("maximumGuests")}
            onBlur={(e) =>
              handleSubmit(update(e.target.value, "maximumGuests"))
            }
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <label className="w-56" htmlFor="breakfast">
            Breakfast price
          </label>
          <input
            className="sm:w-72 sm:grow-0 grow ps-2 py-2 border-[1px] border-stone-400 dark:border-stone-700 rounded-md focus:border-[#4f46e5] dark:bg-[#101620]"
            type="number"
            id="breakfast"
            defaultValue={data[0].breakfastPrice}
            disabled={isUpdating}
            {...register("breakfastPrice")}
            onBlur={(e) =>
              handleSubmit(update(e.target.value, "breakfastPrice"))
            }
          />
        </div>
      </motion.form>
    </div>
  );
}
