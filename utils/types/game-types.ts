import { GameStatus, GameType } from "@/utils/enums/prisma-enums";
import { IOddTypeWithSelection, OddType } from "./odd-management"; 
 
export interface IKenoGame extends IDBGame {
  keno: IDBKenoGame; 
}


export interface IDBKenoGame {
  id: string;
  gameId: string;
  winningNumbers: number[];
  ticketWillBeDisabledAt: Date;
  winningNumberWillBeShowedAt: Date;
}

export interface IDBGame {
  id: string;
  uniqueId: string;
  shopId: string;
  gameType: GameType;
  startAt: Date;
  endAt: Date;
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
  oddType: OddType;
}
 

export interface ICurrentKenoGamesResponse {
  cashierGame: IKenoGame;
  displayGame: IKenoGame; 
}

 

export interface ISelectionPayout {
  numberSelection: number;
  payoutMultiplier: number;
}

export interface IKenoGameConfigurations {
  startNumber: number;
  endNumber: number;

  minBetAmount: number;
  maxBetAmount: number;

  minNumbersCountPerSlip: number;
  maxNumbersCountPerSlip: number;

  secondsBeforeShowingWinningNumbers: number;

  secondsToDisplaySingleWinningNumber: number;
  numberOfWinningNumbersPerGame: number;

  waitTimeInSeconds: number;
  totalGameTimeInSeconds: number; 
}

export interface IKenoGameTimeConfigurations {
  startAt: Date;
  ticketWillBeDisabledAt: Date;
  winningNumberWillBeShowedAt: Date;
  endAt: Date;
}

export interface IKenoPayoutTable {
  selection: number;
  payouts: IKenoPayoutOfSelection[];
}

export interface IKenoPayoutOfSelection {
  hit: number;
  pay: number;
}

export interface IKenoPayout {
  hits: number[];
  pays: number[];
}

export interface IKenoPreviousWinningNumbers {
  gameId: string;
  winningNumbers: number[];
}
