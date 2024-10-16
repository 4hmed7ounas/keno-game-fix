import { Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function NumberCountdown(props: { currentNumber: any | null }) {
  const formatTime = () => {
    const minutes = Math.floor(props.currentNumber / 60);
    const remainingSeconds = props.currentNumber % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeRemaining = formatTime();

  return (
    // <div className=" w-fit   p-2 shadow-lg flex justify-center rounded-full items-center font-bold text-center ">
    <Heading as="h2" size="4xl" color={"white"} className="">
      {timeRemaining}
    </Heading>

    // </div>
  );
}

export default NumberCountdown;
