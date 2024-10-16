import {  sampleGames } from "@/assets/sample-games";
import { GameStartValuesInMilliSeconds } from "@/assets/test-configurations";
import { IKenoGame, IKenoGameTimeConfigurations } from "@/utils/types/game-types";

// lib/gameManager.ts
let nextGameTime = new Date(Date.now() + 2 * 60000); // Set the next game time to 2 minutes from now

const checkGameState = () => {
  const now = new Date();
  if (now >= nextGameTime) {
    nextGameTime = new Date(now.getTime() + 2 * 60000); // Schedule next game
    return { state: "playing" };
  } else {
    const countdown = Math.floor(
      (nextGameTime.getTime() - now.getTime()) / 1000,
    );
    return {
      state: countdown <= 5 ? "final_countdown" : "countdown",
      countdown,
    };
  }
};


const getNextGame = (currentGameId?: string): IKenoGame => {
  let nextGame =  currentGameId ? sampleGames.find((game) => game.id !== currentGameId) : sampleGames[0];
  const {
    startAt,
    ticketWillBeDisabledAt,
    winningNumberWillBeShowedAt,
    endAt,
  } = generateGameLogicTimes();

  return {
    ...nextGame,
startAt,
keno: {
  ...nextGame.keno,
  ticketWillBeDisabledAt,
  winningNumberWillBeShowedAt,
},
endAt
  }
}




const getInitialGameData = (): {displayGame: IKenoGame, previousGame: IKenoGame} => {
  let displayGame =  sampleGames[0];
  const {
    startAt,
    ticketWillBeDisabledAt,
    winningNumberWillBeShowedAt,
    endAt,
  } = generateGameLogicTimes();

   displayGame = {
    ...displayGame,
startAt,
keno: {
  ...displayGame.keno,
  ticketWillBeDisabledAt,
  winningNumberWillBeShowedAt,
},
endAt
  }

  const otherGame = sampleGames[1]

  const previousGame: IKenoGame = {
    ...otherGame,
    keno: {
      ...otherGame.keno,
      winningNumbers: generateUniqueRandomNumbers()
    }
  }

  return {
    displayGame,
    previousGame
  }
}


// Create a new game entry
export function generateGameLogicTimes(): IKenoGameTimeConfigurations {
  // const now = new Date();

  const {millSecondsBeforeShowingWinningNumber, totalGameTimeInMilliseconds, totalWaitTimeInMilliseconds} = GameStartValuesInMilliSeconds;

  const now = new Date();
const ticketWillBeDisabledAt = new Date(now.getTime() + totalWaitTimeInMilliseconds);
const winningNumberWillBeShowedAt = new Date(now.getTime() + millSecondsBeforeShowingWinningNumber);
const endAt = new Date(now.getTime() + totalGameTimeInMilliseconds);
 
  return {
    startAt: now,
    ticketWillBeDisabledAt,
    winningNumberWillBeShowedAt,
    endAt,
  };
}

// Utility function to generate unique random numbers
export function generateUniqueRandomNumbers(
  
): number[] {
  
  const totalNumberToGenerate: number = 20
  const numberStartFrom: number = 1
 const  numberEnd: number = 80
  const numbers = [];

  while (numbers.length <= totalNumberToGenerate) {
    const randomNum =
      Math.floor(Math.random() * (numberEnd - numberStartFrom + 1)) +
      numberStartFrom;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return Array.from(numbers);
}


export { checkGameState, getNextGame, getInitialGameData };
