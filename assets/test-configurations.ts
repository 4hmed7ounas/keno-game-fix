import { IKenoGameConfigurations } from "@/utils/types/game-types";


// the last
export const samplePayouts = [
    { selection: 1, hit: 1, odd: 4 , type: 'default'},
    { selection: 2, hit: 2, odd: 25 , type: 'default'},
    { selection: 2, hit: 1, odd: 8 , type: 'default'},
    { selection: 3, hit: 3, odd: 45 , type: 'default'},
    { selection: 3, hit: 2, odd: 15 , type: 'default'},
    { selection: 3, hit: 1, odd: 1 , type: 'default'},
    { selection: 4, hit: 4, odd: 200 , type: 'default'},
    { selection: 4, hit: 3, odd: 15 , type: 'default'},
    { selection: 4, hit: 2, odd: 1 , type: 'default'},
    { selection: 4, hit: 1, odd: 0 , type: 'default'},
    { selection: 5, hit: 5, odd: 500 , type: 'default'},
    { selection: 5, hit: 4, odd: 15 , type: 'default'},
    { selection: 5, hit: 3, odd: 3 , type: 'default'},
    { selection: 5, hit: 2, odd: 1 , type: 'default'},
    { selection: 5, hit: 1, odd: 0 , type: 'default'}, 
    { selection: 6, hit: 6, odd: 1800 , type: 'default'},
    { selection: 6, hit: 5, odd: 70 , type: 'default'},
    { selection: 6, hit: 4, odd: 10 , type: 'default'},
    { selection: 6, hit: 3, odd: 1 , type: 'default'},
    { selection: 6, hit: 2, odd: 0 , type: 'default'},
    { selection: 6, hit: 1, odd: 0 , type: 'default'},
    { selection: 7, hit: 7, odd: 2150 , type: 'default'},
    { selection: 7, hit: 6, odd: 120 , type: 'default'},
    { selection: 7, hit: 5, odd: 12 , type: 'default'},
    { selection: 7, hit: 4, odd: 6 , type: 'default'},
    { selection: 7, hit: 3, odd: 1 , type: 'default'},
    { selection: 7, hit: 2, odd: 0 , type: 'default'},
    { selection: 7, hit: 1, odd: 0 , type: 'default'},
    { selection: 8, hit: 8, odd: 3000 , type: 'default'},
    { selection: 8, hit: 7, odd: 600 , type: 'default'},
    { selection: 8, hit: 6, odd: 68 , type: 'default'},
    { selection: 8, hit: 5, odd: 8 , type: 'default'},
    { selection: 8, hit: 4, odd: 4 , type: 'default'},
    { selection: 8, hit: 3, odd: 0 , type: 'default'},
    { selection: 8, hit: 2, odd: 0 , type: 'default'},
    { selection: 8, hit: 1, odd: 0 , type: 'default'},
    { selection: 9, hit: 9, odd: 4200 , type: 'default'},
    { selection: 9, hit: 8, odd: 1800 , type: 'default'},
    { selection: 9, hit: 7, odd: 120 , type: 'default'},
    { selection: 9, hit: 6, odd: 18 , type: 'default'},
    { selection: 9, hit: 5, odd: 6 , type: 'default'},
    { selection: 9, hit: 4, odd: 3 , type: 'default'},
    { selection: 9, hit: 3, odd: 0 , type: 'default'},
    { selection: 9, hit: 2, odd: 0 , type: 'default'},
    { selection: 9, hit: 1, odd: 0 , type: 'default'},
    { selection: 10, hit: 10, odd: 5000 , type: 'default'},
    { selection: 10, hit: 9, odd: 2500 , type: 'default'},
    { selection: 10, hit: 8, odd: 400 , type: 'default'},
    { selection: 10, hit: 7, odd: 40 , type: 'default'},
    { selection: 10, hit: 6, odd: 12 , type: 'default'},
    { selection: 10, hit: 5, odd: 4 , type: 'default'},
    { selection: 10, hit: 4, odd: 2 , type: 'default'},
    { selection: 10, hit: 3, odd: 0 , type: 'default'},
    { selection: 10, hit: 2, odd: 0 , type: 'default'},
    { selection: 10, hit: 1, odd: 0 , type: 'default'},
  ];
  
  export const samplePayoutType = {
    type: 'Promo2',
    values: samplePayouts
  } 

const numberOfWinningNumbersPerGame = 20;
const secondsToDisplaySingleWinningNumber = 3;
const totalTimeForShowingWinningTickets = numberOfWinningNumbersPerGame * secondsToDisplaySingleWinningNumber;
 

const secondsBeforeShowingWinningNumbers = 5;

const waitTimeInSeconds = 10;

const totalGameTimeInSeconds = secondsBeforeShowingWinningNumbers + waitTimeInSeconds  + totalTimeForShowingWinningTickets;


const totalSecondsBeforeShowingWinningNumbers = secondsBeforeShowingWinningNumbers * 1000;
const totalDisplayTimeInMilliseconds = totalTimeForShowingWinningTickets * 1000;

const totalWaitTimeInMilliseconds = waitTimeInSeconds * 1000;
const millSecondsBeforeShowingWinningNumber = totalWaitTimeInMilliseconds + totalSecondsBeforeShowingWinningNumbers;
const totalGameTimeInMilliseconds = millSecondsBeforeShowingWinningNumber + totalDisplayTimeInMilliseconds;


export const gameConfigurations: IKenoGameConfigurations = {
    startNumber: 1,
    endNumber: 80,

    minBetAmount: 20,
    maxBetAmount: 5000, 

    minNumbersCountPerSlip: 2,
    maxNumbersCountPerSlip: 10, 

    numberOfWinningNumbersPerGame, 
    secondsToDisplaySingleWinningNumber,
 
    secondsBeforeShowingWinningNumbers, 
    waitTimeInSeconds,
    totalGameTimeInSeconds,
 
}



export const GameStartValuesInMilliSeconds = {
     totalWaitTimeInMilliseconds,
    millSecondsBeforeShowingWinningNumber,
    totalGameTimeInMilliseconds,
}

