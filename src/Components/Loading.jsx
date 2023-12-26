import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <div className="loader-container w-full absolute grow z-50">
      <div className="w-full h-full absolute backdrop-blur-sm contrast-50"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}
