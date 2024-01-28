import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "./AppLayout/AppLayout";
import DashBoard from "./Pages/DashBoard";
import Bookings from "./Pages/Bookings";
import Cabins from "./Pages/Cabins";
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import { Toaster } from "react-hot-toast";
import { Context } from "./Services/Context";
import Booking from "./Pages/Booking";
import User from "./Components/Authentication/User";
import PageNotFound from "./Pages/PageNotFound";

const queryClint = new QueryClient();

export default function App() {
  return (
    <Context>
      <QueryClientProvider client={queryClint}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              element={
                <User>
                  <AppLayout></AppLayout>
                </User>
              }
            >
              <Route index element={<DashBoard></DashBoard>}></Route>
              <Route
                index
                path="/dashboard"
                element={<DashBoard></DashBoard>}
              ></Route>
              <Route path="/bookings" element={<Bookings></Bookings>}></Route>
              <Route
                path="bookings/:bookingId"
                element={<Booking></Booking>}
              ></Route>
              <Route path="/cabins" element={<Cabins></Cabins>}></Route>
              <Route path="/users" element={<Users></Users>}></Route>
              <Route path="/settings" element={<Settings></Settings>}></Route>
              <Route path="/account" element={<Account></Account>}></Route>
            </Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </HashRouter>
        <Toaster
          toastOptions={{
            className: `dark:bg-[#18212f!important] bg-[white!important] text-[blacki!mportant] dark:text-[white!important]`,
          }}
        ></Toaster>
      </QueryClientProvider>
    </Context>
  );
}
