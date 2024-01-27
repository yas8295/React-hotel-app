import React from "react";
import Button from "../../Reusable/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { pageSize } from "./pageCount";
import { useSearchParams } from "react-router-dom";

export default function BookingFooterPagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / pageSize);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function nextPage() {
    const next = currentPage === pageCount ? pageCount : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", previous);
    setSearchParams(searchParams);
  }

  if (count > pageSize)
    return (
      <div className="flex text-[12px] justify-between gap-2 items-center py-3 px-2 bg-[#f5f5f4] dark:bg-[#101620] shadow-[0px_0px_3px_0px_#04040440] dark:shadow-[0px_0px_3px_0px_#a7a7a76b] rounded-es-lg rounded-ee-lg">
        <h1 className="font-semibold">
          Showing {currentPage * pageSize - pageSize + 1} to{" "}
          {currentPage === pageCount ? count : currentPage * pageSize} of{" "}
          {count} results
        </h1>
        <div className="flex gap-2 items-center">
          <Button
            onClick={previousPage}
            bg="bg-transparent"
            text="font-semibold hover:text-white"
            padding="py-1 px-2"
            className="sm:flex hidden items-center gap-1"
            disabled={currentPage === 1}
          >
            <IoIosArrowBack /> Previous
          </Button>
          <Button
            onClick={previousPage}
            bg="bg-[#4f46e5] flex items-center gap-1"
            text="font-semibold hover:text-white text-stone-300"
            padding="p-1"
            hover=""
            className="sm:hidden block"
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </Button>
          <Button
            onClick={nextPage}
            bg="bg-transparent"
            text="font-semibold hover:text-white"
            padding="py-1 px-2"
            className="sm:flex hidden items-center gap-1"
            disabled={currentPage === pageCount}
          >
            Next
            <IoIosArrowForward />
          </Button>
          <Button
            onClick={nextPage}
            bg="bg-[#4f46e5] flex items-center gap-1"
            text="font-semibold hover:text-white text-stone-300"
            hover=""
            padding="p-1"
            className="sm:hidden block"
            disabled={currentPage === pageCount}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    );
}
