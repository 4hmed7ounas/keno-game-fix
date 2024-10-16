import React from "react";

interface ITableLoading {
  columnsCount: number;
}
function TableLoading({ columnsCount }: ITableLoading) {
  return (
    <div
      role="status"
      className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      {Array.from({ length: 10 - 1 + 1 }, (_, index) => {
        return (
          <div key={index} className="flex items-center justify-between pt-4">
            {Array.from({ length: columnsCount - 1 + 1 }, (_, currentIndex) => {
              return (
                <div
                  key={index + currentIndex}
                  className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                ></div>
              );
            })}
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
        );
      })}

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default TableLoading;
