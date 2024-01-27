import { useNavigate } from "react-router-dom";
import Button from "../Reusable/Button";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-4/5 mx-auto  overflow-hidden h-screen flex flex-col gap-4 p-4 justify-center items-center">
      <h1 className="z-[-1] sm:block hidden font-extrabold absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[300px] dark:text-slate-800 text-slate-300">
        404!
      </h1>
      <h1 className="dark:text-[#b6b6b6] text-[#454545] text-[40px] font-semibold text-center">
        Nothing to see here
      </h1>
      <p className="text-center dark:text-[#8c8c8c] text-[#606060]">
        Page you are trying to open does not exist. br You may have mistyped the{" "}
        <br />
        address, or the page has been moved to another URL. If you think this is{" "}
        <br />
        an error contact support.
      </p>
      <Button onClick={() => navigate("/")} className="mt-4 w-36">
        Home
      </Button>
    </div>
  );
}
