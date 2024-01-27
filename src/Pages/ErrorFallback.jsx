import Button from "../Reusable/Button";
import React from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-white flex flex-col gap-3 w-full h-screen justify-center items-center">
      <p className="text-black dark:text-white">Something went wrong!</p>
      <p style={{ color: "red" }}>{error?.message}</p>
      <Button
        className="text-black dark:text-white mt-4"
        onClick={resetErrorBoundary}
      >
        Try again
      </Button>
    </div>
  );
}
