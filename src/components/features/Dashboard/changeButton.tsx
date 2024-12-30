"use client";
import React, { useState } from "react";
import WeatherModel from "./weatherModel";

const ChangeButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <Button size={"sm"} variant={"outline"} onClick={() => setOpen(true)}>
        Change Weather Details
      </Button> */}

      <button
        className="relative inline-flex overflow-hidden rounded-md p-[.9px] focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50 text-xs group"
        onClick={() => setOpen(true)}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-card group-hover:bg-accent px-3 py-0 text-xs font-medium backdrop-blur-3xl">
          {/* <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg> */}
          Change Weather Details
        </span>
      </button>

      {/* <WeatherModel open={open} setOpen={setOpen} isEdit /> */}
    </>
  );
};

export default ChangeButton;
