import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import DarkModeButton from "../Components/DarkModeButton";

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

export function dark() {
  document.documentElement.classList.toggle("dark");
  if (localStorage.theme === "light") localStorage.theme = "dark";
  else localStorage.theme = "light";

  return localStorage.theme;
}

export default function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="flex justify-between items-center flex-col w-full min-h-screen overflow-y-hidden max-h-screen">
      <div className="absolute right-[-1px] top-[10px] scale-[0.70] rotate-90">
        <DarkModeButton />
      </div>
      <Header></Header>
      {loading && <Loading></Loading>}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
