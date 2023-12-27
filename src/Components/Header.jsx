import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../images/Free Vector _ Cute pizza slice melted with thumbs up cartoon vector icon illustration_ food object icon isolated.jpg";

export default function Header() {
  const [searchOrder, setSearchOrder] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userName = useSelector((state) => state.user.userName);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchOrder) return;
    navigate(`/order/${searchOrder}`);
    setSearchOrder("");
  }

  return (
    <div className="flex dark:bg-[#45402e] dark:text-white sm:justify-between items-center flex-wrap gap-2 justify-center sm:ps-5 sm:pe-16 py-2 bg-yellow-400 w-full">
      <Link className="flex  items-center" to={"/React-Pizza-App/"}>
        <motion.img
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={logo}
          alt=""
          width={45}
        />
        <h1 className="text-lg text-center tracking-wider">
          FAST REACT PIZZA CO.
        </h1>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="px-5 w-64 dark:bg-[#a39c83] dark:text-black placeholder:text-black text-sm py-2 rounded-3xl md:focus:w-72 focus:outline-none transition-all duration-700 bg-amber-100  placeholder:text-gray-400 dark:placeholder:text-zinc-600"
          type="text"
          placeholder="Search order #"
          value={searchOrder}
          onChange={(e) => {
            setSearchOrder(e.target.value);
          }}
        />
      </form>

      {user ? (
        <h1 className="bg-slate-800 text-sm text-yellow-300 px-5 py-1 rounded-2xl">
          {userName.toUpperCase()}
        </h1>
      ) : null}
    </div>
  );
}
