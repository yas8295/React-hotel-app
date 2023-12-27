import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import DarkModeButton from "../Components/DarkModeButton";

export default function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="flex justify-between items-center flex-col w-full min-h-screen overflow-y-hidden max-h-screen">
      <div className="absolute right-[-4px] top-[13px] scale-[0.70] rotate-90">
        <DarkModeButton />
      </div>
      <Header></Header>
      {loading && <Loading></Loading>}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
