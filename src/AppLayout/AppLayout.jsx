import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import SideBar from "../Components/SideBar/SideBar";
export default function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <SideBar></SideBar>
      <Header></Header>
      <div className="sm:px-4 px-2 py-5 overflow-y-auto overflow-x-hidden bg-[url(https://www.transparenttextures.com/patterns/tileable-wood.png)] dark:bg-[url(https://www.transparenttextures.com/patterns/dark-wood.png)] dark:bg-[#101620] dark:text-stone-300">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
