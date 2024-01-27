import React, { useState } from "react";
import Heading from "../Reusable/Heading";
import Button from "../Reusable/Button";
import "../Components/Cabins/cabins.module.css";
import { useSearchParams } from "react-router-dom";
import AddCabinModal from "../Components/Cabins/AddCabinModal";
import { AnimatePresence } from "framer-motion";
import { useFetchCabins } from "../Services/Cabins/cabinsHook";
import CabinContent from "../Components/Cabins/CabinContent";
import CabinSortButtons from "../Components/Cabins/CabinSortButtons";

export default function Cabins() {
  const [select, setSelect] = useState("A-Z");
  const [addCabin, setAddCabin] = useState(false);
  const { isLoading, cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();

  const sort = searchParams?.get("sort");

  return (
    <>
      <div className="cabins h-full flex flex-col">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Heading>All cabins</Heading>
          <CabinSortButtons
            sort={sort}
            select={select}
            setSelect={setSelect}
          ></CabinSortButtons>
        </div>
        <CabinContent
          isLoading={isLoading}
          cabins={cabins}
          sort={sort}
          select={select}
        ></CabinContent>
        <span className="self-start mt-5">
          <Button
            text="text-[13px] text-semibold text-white"
            onClick={() => setAddCabin((a) => !a)}
          >
            Add new cabin
          </Button>
        </span>
      </div>
      <AnimatePresence mode="wait">
        {addCabin ? (
          <AddCabinModal setAddCabin={setAddCabin}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAddCabin(false);
              }}
              className="top-2 right-2 absolute text-lg"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                ariahidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </AddCabinModal>
        ) : null}
      </AnimatePresence>
    </>
  );
}
