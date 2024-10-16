import React from "react"; 
import { Transition } from "@headlessui/react";
import clsx from "clsx"; 
import { Heading } from "@chakra-ui/react";
import { RedBallInCircle } from "./KenoGamePlayRightSection/NumberGeneratorComponent";
import KenoGameDisplayNumberTable from "./LeftSection/KenoNumbersSection/KenoGameDisplayNumberTable";
import HeadTailDisplay from "./LeftSection/HeadTailDisplay";
import KenoGamePlayTimerAndPayoutSection from "./KenoGamePlayRightSection/KenoGamePlayTimerAndPayoutSection"; 
import { useKenoPlayManager, KenoDisplayState } from "@/contexts/game-managers/KenoPlayManagerContext";
import KenoPlayPageLoading from "./InfrontSections/KenoPlayPageLoading";
import GeneralErrorPage from "@/components/ui-components/GeneralErrorPage";
import { getLastGameId } from "@/utils/helpers/gameHelper";
import BetClosedWithCounter from "@/components/game-common-layouts/BetClosedWithCounter";
import NumberCountdown from "./KenoGamePlayRightSection/NumberCountdown";
import { gameConfigurations } from "@/assets/test-configurations";

const KenoGamePlay: React.FC = () => {
  const {
    loading,
    error,
    displayState,
    countdown,
    finalCounter,
    currentNumber,
    displayGame, 
    previousGame,
    currentIndex,
    previousGameId,
    reload
  } = useKenoPlayManager();
 

  if (loading) return <KenoPlayPageLoading />;
  if (error) return <GeneralErrorPage error={error} onTryAgain={reload} />;
 
  return (
    <div className="relative w-full bg-red-800 h-full max-h-screen grid grid-cols-8  xxl:p-8">

<BetClosedWithCounter finalCounter={finalCounter} isClosed={displayState === KenoDisplayState.BET_CLOSED}/>

      <div className="col-span-5 h-full max-h-screen flex flex-col gap-2 justify-center items-center  p-8">
        <Transition
          
          show={displayState == KenoDisplayState.COUNTDOWN}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Heading as="h2" size="4xl" color={"yellow.400"}>
            {" "}
            #{previousGameId}
          </Heading>
        </Transition>
        <HeadTailDisplay />
        <KenoGameDisplayNumberTable
          isLastCountdown={ 
            displayState == KenoDisplayState.FINAL_COUNTDOWN
          }
        />
      </div>
      
      <div className="col-span-3 h-full flex flex-col justify-center items-center w-full ">
        <Transition
          show={displayState == KenoDisplayState.COUNTDOWN}
          
        >
          <div
            className={clsx([
              // Base styles
              "flex w-full h-full max-h-screen flex-col gap-2 items-center justify-center transition ease-in-out bg-gradient-to-r from-red-900 to-red-800",
              // Shared closed styles
              "data-[closed]:opacity-0",
              // Entering styles
              "data-[enter]:duration-300 data-[enter]:data-[closed]:translate-x-full",
              // Leaving styles
              "data-[leave]:duration-100 data-[leave]:data-[closed]:translate-x-full",
            ])}
          >
            <KenoGamePlayTimerAndPayoutSection />
          </div>
        </Transition>
        <Transition
          show={displayState != KenoDisplayState.COUNTDOWN}
          
        >
          <div
            className={clsx([
              // Base styles
              "flex w-full h-full flex-col items-center justify-center transition ease-in-out",
              // Shared closed styles
              "data-[closed]:opacity-0",
              // Entering styles
              "data-[enter]:duration-300 data-[enter]:data-[closed]:translate-x-full",
              // Leaving styles
              "data-[leave]:duration-100 data-[leave]:data-[closed]:translate-x-full",
            ])}
          >
            <Heading as="h2" mb={4} size="4xl" color={"yellow"}>
              {" "}
            #{getLastGameId(displayGame ? displayGame.uniqueId : '')}
              
            </Heading>

            <Transition as="div" show={displayState == KenoDisplayState.FINAL_COUNTDOWN}>
            <NumberCountdown currentNumber={countdown} />
              </Transition>

            <RedBallInCircle />

            <div className="w-full h-8 shadow"></div>

            {currentNumber && (
              <h1
                color={"white"}
                className="text-4xl font-extrabold text-white text-shadow-lg"
              >
                <span className="animate-pulse"> {currentIndex + 1}</span>
                <span className="text-orange-400">
                  /{gameConfigurations.numberOfWinningNumbersPerGame}
                </span>
              </h1>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default KenoGamePlay;
