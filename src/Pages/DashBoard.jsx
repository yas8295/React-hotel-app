import React from "react";
import Heading from "../Reusable/Heading";
import FilterButtons from "../Components/Dashboard/FilterButtons";
import "../Components/dashboard/dashboard.module.css";
import DashboardContent from "../Components/Dashboard/DashboardContent";

export default function DashBoard() {
  return (
    <>
      <div className="dashboard flex justify-between gap-2 flex-wrap">
        <Heading>Dashboard</Heading>
        <FilterButtons></FilterButtons>
      </div>
      <DashboardContent></DashboardContent>
    </>
  );
}
