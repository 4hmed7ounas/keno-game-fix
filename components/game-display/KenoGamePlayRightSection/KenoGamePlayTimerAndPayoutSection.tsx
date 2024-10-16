 
import React, { forwardRef } from "react";
import PayoutTable from "./PayoutTable";
import NumberCountdown from "./NumberCountdown";
import { Heading } from "@chakra-ui/react"; 
import { useKenoPlayManager } from "@/contexts/game-managers/KenoPlayManagerContext";

function KenoGamePlayTimerAndPayoutSection() {
  const {
    countdown,
    currentPlayGameId,
    gameOdd
  } = useKenoPlayManager();
 
  return (
    <div className="flex flex-col justify-start items-center  h-full w-full py-4 gap-4 ">
      <div className=" w-fit justify-start items-center flex flex-col gap-4">
        <NumberCountdown currentNumber={countdown} />

        <Heading color={"white"} className="font-bold ">
          Next #{currentPlayGameId}
        </Heading>
      </div>
      <div className=" h-full">
        <PayoutTable
          kenoPayouts={gameOdd ? gameOdd.values : []}
        />

      </div>
    </div>
  );
}

export default KenoGamePlayTimerAndPayoutSection;
