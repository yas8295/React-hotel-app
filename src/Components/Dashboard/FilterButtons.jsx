import React, { useContext } from "react";
import Button from "../../Reusable/Button";
import { contexts } from "../../Services/Context";
import { useSearchParams } from "react-router-dom";

export default function FilterButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode } = useContext(contexts);
  searchParams.set("last", searchParams.get("last") || 7);

  return (
    <div className="flex text-[13px] items-center gap-3 flex-wrap-reverse">
      <div className="flex p-1 dark:bg-[#18212f] bg-white rounded gap-1 flex-wrap shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] sm:w-fit grow">
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("last", 7);
            setSearchParams(searchParams);
          }}
          className={`${searchParams.get("last") === "7" ? "active" : ""}`}
          disabled={searchParams.get("last") === "7"}
        >
          Last 7 days
        </Button>
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("last", 30);
            setSearchParams(searchParams);
          }}
          className={`${searchParams.get("last") === "30" ? "active" : ""}`}
          disabled={searchParams.get("last") === "30"}
        >
          Last 30 days
        </Button>
        <Button
          text="text-black dark:text-stone-100 grow"
          padding="py-1 px-2"
          bg="dark:bg-transparent bg-white"
          hover="hover:bg-[#4f46e5] hover:text-white"
          mode={`${mode === "dark" ? "dark" : ""}`}
          onClick={() => {
            searchParams.set("last", 90);
            setSearchParams(searchParams);
          }}
          className={`${searchParams.get("last") === "90" ? "active" : ""}`}
          disabled={searchParams.get("last") === "90"}
        >
          Last 90 days
        </Button>
      </div>
    </div>
  );
}
