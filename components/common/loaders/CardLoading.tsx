import React from "react";

function CardLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 animate-pulse">
      <div className="w-1/2 h-8 bg-gray-300 rounded"></div>

      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>

      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-8 bg-gray-300 rounded"></div>

      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
    </div>
  );
}

export default CardLoading;
