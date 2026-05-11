import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const Spinner: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex  items-center justify-center p-8 bg-slate-800">
      <TbFidgetSpinner className="animate-spin text-6xl text-white" />
    </div>
  );
};

export default Spinner;
