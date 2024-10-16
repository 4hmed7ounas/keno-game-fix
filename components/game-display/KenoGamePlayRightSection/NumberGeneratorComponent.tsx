/* eslint-disable @next/next/no-img-element */
import { gameConfigurations } from "@/assets/test-configurations";
import { useKenoPlayManager } from "@/contexts/game-managers/KenoPlayManagerContext"; 
import React, { useEffect, useState } from "react";
 

const ballImage = "/assets/imgs/red-ball4.png"; // Path from the public directory
 
 
export const RedBallInCircle = () => {
  const { currentIndex, currentNumber } = useKenoPlayManager();
 
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    let timeOutId: NodeJS.Timeout | null = null;

    if (currentNumber) {
      const isLast =
        currentIndex ===
        gameConfigurations.numberOfWinningNumbersPerGame - 1;
      setAnimate(false);

      try {
        const voices = speechSynthesis.getVoices();

        const excitedVoice =
          voices.find((voice) => voice.name.includes("Daniel")) || voices[0];

        // Create the utterance with excited properties
        const utterance = new SpeechSynthesisUtterance(
          currentNumber.toString(),
        );
        utterance.voice = excitedVoice; // Set the selected voice
        utterance.pitch = 1.4; // Slightly higher pitch
        utterance.rate = 1; // Slightly faster rate
        utterance.volume = 1; // Full volume

        // Speak the current number with excitement
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.log("Error on speaker", error);
      }

      timeOutId = setTimeout(() => {
        setAnimate(!isLast);
      }, 2000);
    }

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
  }, [currentNumber]);

  const animation = animate || !currentNumber ? "animate-spinFast" : "";

  return (
    <div className="relative w-fit  h-fit max-w-[235px] max-h-[474] flex flex-col justify-center items-center">
      {/* Background image (second image with the circle) */}
      <img
        src="/assets/imgs/ball-holder2.png"
        alt="Trophy Frame"
        className="z-20"
      />

      {/* Foreground image (red ball) */}
      <div className="absolute top-[8%] left-[11%]  w-[78.6%] h-[56%] max-w-full">
        <div
          className={`relative flex  w-full h-full items-center justify-center ${animation}`}
        >
          <img
            src={ballImage} // Adjust the path according to where your image is located
            alt="Red Ball"
            className="absolute inset-0 z-10 object-cover"
          />

          {currentNumber && (
            <div
              className="rounded-full  h-full bg-opacity-100  w-full flex items-center text-center justify-center z-20"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%,  #ff10542f, #f70b1b52)",
              }}
            >
              <h1 className="text-8xl text-shadow-xl font-extrabold text-white">
                {currentNumber}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
