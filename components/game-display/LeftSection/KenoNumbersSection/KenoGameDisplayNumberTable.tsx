import React from "react";
import { Button } from "@chakra-ui/react"; 
import { useKenoPlayManager } from "@/contexts/game-managers/KenoPlayManagerContext";
import { gameConfigurations } from "@/assets/test-configurations";

function KenoGameDisplayNumberTable(props: { isLastCountdown?: boolean }) {
  
  const {
    currentDisplayedNumbers,
    currentNumber  } = useKenoPlayManager(); 
  const { endNumber } = gameConfigurations;

  return (
    <div
      className={`h-fit w-fit grid grid-cols-10  justify-center items-center  gap-2  ${
        props.isLastCountdown ? " animate-pulse" : ""
      }`}
    >
      {Array.from({ length: endNumber }, (_, index) => {
        const number = index + 1;
        const isCurrent = currentNumber === number;
        const isSelected =
          isCurrent || currentDisplayedNumbers.includes(number);


        const animate = isCurrent
          ? "animate-ping"
          : props.isLastCountdown
            ? " animate-pulse"
            : "";

        return (
          <Button
            className={` ${animate ?? ""}`}
            key={number}
            colorScheme={isSelected ? "yellow" : "red"}
            size={"lg"}
            fontSize={"x-large"}
          >
            {number}
          </Button>
        );
        
      })}
    </div>
  );
}

export default KenoGameDisplayNumberTable;
