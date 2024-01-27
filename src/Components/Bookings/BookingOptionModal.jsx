import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaEye } from "react-icons/fa6";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import BookingOperationsModal from "./BookingOperationsModal";

const CreatContext = createContext();

export default function BookingOptionModal({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState("");

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <CreatContext.Provider
      value={{ open, openId, close, position, setPosition }}
    >
      {children}
    </CreatContext.Provider>
  );
}

function Menu({ children }) {
  return children;
}

function Open({ id }) {
  const { open, openId, close, setPosition } = useContext(CreatContext);

  function handleClick(e) {
    const { x, y, height } = e.target.getBoundingClientRect();
    const view = { x, y, height };
    setPosition(view);
    e.stopPropagation();
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className={`text-[15px] self-center w-7 h-7 font-sans cursor-pointer focus:ring-1 focus:ring-[#4f46e5] focus:rounded-md`}
    >
      ⁝
    </button>
  );
}

function Window({ id, booking, updeteBooking, deleteBooking }) {
  const navigate = useNavigate();
  const { openId, close, position } = useContext(CreatContext);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(
    function () {
      function handleClick(e) {
        if (!e.target.classList.contains(".close")) {
          close();
        }
      }

      document.addEventListener("click", handleClick);

      return () => document.removeEventListener("click", handleClick);
    },
    [close]
  );

  return createPortal(
    <>
      <AnimatePresence mode="wait">
        {openId !== id ? null : (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "35px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "35px", opacity: 0 }}
            className={`flex close overflow-auto flex-col text-[12px] font-light absolute z-[100] bg-white dark:text-white dark:bg-[#18212f] rounded-md dark:shadow-[0px_0px_8px_1px_#171515] shadow-[0px_0px_10px_0px_#d8d8d5]`}
            style={{
              top: position.y + position.height + 5,
              left: position.x - 90,
            }}
          >
            <h1
              onClick={() => navigate(`${id}`)}
              className="flex close gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
            >
              <span className="text-zinc-500">
                <FaEye />
              </span>
              See details
            </h1>
            {booking.status !== "checked-out" && (
              <h1
                onClick={() => {
                  booking.status === "unconfirmed" &&
                    navigate(`${id}?checkIn=${true}`);
                  booking.status === "checked-in" &&
                    setOpenModal((open) => !open);
                }}
                className="flex close gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
              >
                <span className="text-zinc-500">
                  <HiOutlineClipboardCheck />
                </span>
                {booking.status === "checked-in" ? "Check out" : "Check in"}
              </h1>
            )}

            <h1
              onClick={() => {
                setOpenModal((open) => !open);
                setIsDeleting(true);
              }}
              className="flex close gap-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101820] px-4 py-2"
            >
              <span className="text-zinc-500">
                <MdDelete />
              </span>
              Delete
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      <BookingOperationsModal
        id={id}
        openModal={openModal}
        setOpenModal={setOpenModal}
        updeteBooking={updeteBooking}
        deleteBooking={deleteBooking}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      ></BookingOperationsModal>
    </>,
    document.body
  );
}

BookingOptionModal.Menu = Menu;
BookingOptionModal.Open = Open;
BookingOptionModal.Window = Window;
