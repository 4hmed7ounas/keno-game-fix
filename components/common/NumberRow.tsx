import React from "react";

function NumberRow({ numbers }: { numbers: number[] }) {
  return (
    <div className="flex gap-2 font-bold">
      {numbers.map((nm, index) => (
        <p key={nm}>
          {nm.toString() + `${index == numbers.length - 1 ? "" : ","}`}
        </p>
      ))}
    </div>
  );
}

export default NumberRow;
