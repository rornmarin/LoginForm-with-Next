import React from "react";

export const Button = ({ label, className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ${className}`}
    >
      {label}
    </button>
  );
};
