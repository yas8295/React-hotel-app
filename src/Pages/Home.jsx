import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setUserName, setUser } from "../Services/UserSlice";
import Button from "../Reusable/Button";

export default function Home() {
  const user = useSelector((state) => state.user.user);
  const userName = useSelector((state) => state.user.userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName) return;
    navigate("/React-Pizza-App/Menu");
    dispatch(setUser());
  }

  return (
    <div className="flex gap-5 pt-14 dark:bg-stone-900 dark:text-slate-200 flex-col text-center items-center w-full px-5 grow overflow-y-auto overflow-x-clip max-h-svh">
      <h1 className="md:text-3xl text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to <br /> you.
        </span>
      </h1>
      <p className="md:text-lg text-sm">
        {user ? null : "👋 Welcome! Please start by telling us your name:"}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {!user ? (
          <input
            className="px-5 w-72 py-2 rounded-3xl focus:outline-yellow-500 focus:outline-none transition-all duration-200 bg-white-100  dark:bg-[#a39c83] dark:text-black placeholder:text-gray-400 dark:placeholder:text-zinc-600"
            type="text"
            placeholder="Your Full Name"
            value={userName}
            onChange={(e) => dispatch(setUserName(e.target.value))}
          />
        ) : null}
        <AnimatePresence mode="wait">
          {userName || user ? (
            <Button
              title={
                user
                  ? `COUNTINUE ORDERING, ${userName.toUpperCase()}`
                  : "START ORDERING"
              }
              transition={{ type: "spring", stiffness: 300 }}
            ></Button>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
}
