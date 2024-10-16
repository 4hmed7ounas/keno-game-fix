import { gameConfigurations } from "@/assets/test-configurations";
import { useKenoPlayManager } from "@/contexts/game-managers/KenoPlayManagerContext"; 
import { Heading } from "@chakra-ui/react";
import React from "react";

function HeadTailDisplay() {
  const { currentNumber } = useKenoPlayManager(); 

  if (!currentNumber) return <></>;

  const isHead = currentNumber <= gameConfigurations.endNumber / 2;
  const label = isHead ? "Head" : "Tail";
  let color = isHead ? "text-yellow- " : "text-amber-500   ";
  return (
    <Heading
      size={"4xl"}
      className="text-8xl"
      color={isHead ? "yellow.400" : "orange"}
    >
      {label} #{currentNumber}
    </Heading>
  ); 
}

export default HeadTailDisplay;