   
import { samplePayoutType } from "@/assets/test-configurations";
import { generateUniqueRandomNumbers, getInitialGameData, getNextGame } from "@/lib/gameManager";
import { getLastGameId } from "@/utils/helpers/gameHelper"; 
import { IKenoGame } from "@/utils/types/game-types";
import { IOddTypeWithSelection } from "@/utils/types/odd-management"; 
import { set } from "date-fns";
import { ReactNode, useState, useEffect, useContext, createContext, useRef } from "react";  



export enum KenoDisplayState {
    COUNTDOWN, 
    FINAL_COUNTDOWN,
    BET_CLOSED,  
    SHOWING_NUMBERS, 
  }
   

  interface KenoPlayManagerContextProps {
    loading: boolean;
    error?: string;
    displayGame?: IKenoGame;
    previousGame?: IKenoGame;
    displayState: KenoDisplayState;
    countdown: number;
    finalCounter: number;
    currentDisplayedNumbers: number[];
    currentIndex: number;
    currentNumber: number | null; 
    previousGameId?: string;
    currentPlayGameId?: string;
    calling?: string;
    reload: () => void;
    gameOdd?: IOddTypeWithSelection;
  }
  
 
  const KenoPlayManagerContext = createContext<KenoPlayManagerContextProps | undefined>(undefined);
  
  export const KenoPlayManagerProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [calling, setCalling] = useState<string>();
    const [displayGame, setDisplayGame] = useState<IKenoGame>();
    const [previousGame, setPreviousGame] = useState<IKenoGame>(); 

    const [displayState, setDisplayState] = useState<KenoDisplayState>(
        KenoDisplayState.COUNTDOWN,
      );
      const [countdown, setCountdown] = useState(0);
      const [finalCounter, setFinalCounter] = useState(0);
      const [currentDisplayedNumbers, setCurrentDisplayedNumbers] = useState<
        number[]
      >([]);
      const [currentIndex, setCurrentIndex] = useState(-1);
      const [currentNumber, setCurrentNumber] = useState<number | null>(null); 
 const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
 
  

  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fetchWInningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNextGame = async () => {
    try {
     
     const nextGame = getNextGame(displayGame?.id);
     let previousWinningNumbers = displayGame?.keno.winningNumbers.length > 0 ? displayGame.keno.winningNumbers : generateUniqueRandomNumbers()
     setPreviousGame({ ...(displayGame ?? nextGame), 
      keno: { ...(displayGame ?? nextGame).keno, winningNumbers: previousWinningNumbers } }); 
      setDisplayGame(nextGame);

      // Schedule the next fetch at ticketDisabledTime
      scheduleNextFetch(nextGame);
      scheduleFetchWinningNumber(nextGame);

    } catch (error) {
      console.error("Error fetching game data:", error);
      setError("Failed to fetch game data");
    } finally {
    setLoading(false);
    }
  };

  const fetchWinningNumbers = () => {
    const winningNumbers = generateUniqueRandomNumbers();
    setWinningNumbers(winningNumbers); 
    console.log("Winning numbers fetched", winningNumbers);
  }



  const scheduleNextFetch = (game: IKenoGame) => {
    const now = new Date().getTime();

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    let gameWillEndAt = new Date(game.endAt).getTime(); 
    const timeToFetchNextGame = gameWillEndAt - now;

    if (timeToFetchNextGame > 0) {
      fetchTimeoutRef.current = setTimeout(() => fetchNextGame(), timeToFetchNextGame);
    }
  }

  const scheduleFetchWinningNumber = (game: IKenoGame) => {
    const now = new Date().getTime();

    if (fetchWInningTimeoutRef.current) {
      clearTimeout(fetchWInningTimeoutRef.current);
    }


    let winningNumberFetchTime = new Date(game.keno.ticketWillBeDisabledAt).getTime(); 
    const timeUntilWinningNumber = winningNumberFetchTime - now;

    if (timeUntilWinningNumber > 0) {
      fetchWInningTimeoutRef.current = setTimeout(() => fetchWinningNumbers(), timeUntilWinningNumber);
    }

  }


  const fetchGameData =  () => {
    try { 
        setLoading(true);
        setError(undefined);
   

      const data = getInitialGameData();
      setDisplayGame(data.displayGame);
      setPreviousGame(data.previousGame);
       
      // Schedule the next fetch at ticketDisabledTime
      scheduleNextFetch(data.displayGame);
      scheduleFetchWinningNumber(data.displayGame)
    } catch (error) {
      console.error("Error fetching game data:", error);
      setError("Failed to fetch game data");
    } finally {
      
        setLoading(false);
      
    }
  };


  

  useEffect(() => {
    fetchGameData();
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      if(fetchWInningTimeoutRef.current) {
        clearTimeout(fetchWInningTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!displayGame) return;

    const updateGameState = () => {
      const now = new Date().getTime();
      const ticketDisabledTime = new Date(displayGame.keno.ticketWillBeDisabledAt).getTime();
      const showWinningNumbersTime = new Date(displayGame.keno.winningNumberWillBeShowedAt).getTime();
      const endTime = new Date(displayGame.endAt).getTime();

      if (now < ticketDisabledTime) {
        setCurrentIndex(null);
        setCurrentNumber(null);
        setDisplayState(KenoDisplayState.COUNTDOWN);
        setCountdown(Math.floor((ticketDisabledTime - now) / 1000));
        setCurrentDisplayedNumbers(previousGame?.keno.winningNumbers || []);

        if(ticketDisabledTime - now < 10) {
          setCurrentDisplayedNumbers([]);
          setDisplayState(KenoDisplayState.FINAL_COUNTDOWN);
        }
      } else if (now >= ticketDisabledTime && now < showWinningNumbersTime) {
        setDisplayState(KenoDisplayState.BET_CLOSED);
        const _finalCounter = Math.floor((showWinningNumbersTime - now) / 1000);
        setFinalCounter(_finalCounter);
        if(_finalCounter < 3) {
            setDisplayState(KenoDisplayState.SHOWING_NUMBERS);

        }
        setCurrentDisplayedNumbers([]);
      } else if (now > showWinningNumbersTime && now < endTime) { 
        setDisplayState(KenoDisplayState.SHOWING_NUMBERS);
        const elapsedTime = now - showWinningNumbersTime;
        const newIndex = Math.floor(elapsedTime / 3000); // Assuming 3 seconds per number
        setCurrentIndex(newIndex);
        setCurrentNumber(winningNumbers[newIndex]);
        setCurrentDisplayedNumbers(winningNumbers.slice(0, newIndex + 1));
      }  
    };

    const interval = setInterval(updateGameState, 1000);
    return () => clearInterval(interval);
  }, [displayGame, previousGame]);
 
  
    return (
      <KenoPlayManagerContext.Provider
        value={{
            loading,
            error: error || !loading && !displayGame ? "Failed to fetch game data" : undefined,
            gameOdd: samplePayoutType,
            displayGame,
            previousGame,
            currentDisplayedNumbers,
            displayState,
            countdown,
            finalCounter,
            currentIndex,
            currentNumber,
            calling,
            reload: fetchGameData,
            currentPlayGameId: displayGame ? getLastGameId(displayGame.uniqueId) : '',
            previousGameId: previousGame ? getLastGameId(previousGame.uniqueId) : '',
        }}
      >
        {children}
      </KenoPlayManagerContext.Provider>
    );
  };
  
  export const useKenoPlayManager = () => {
    const context = useContext(KenoPlayManagerContext);
    if (context === undefined) {
      throw new Error("useKenoPlayManager must be used within an KenoPlayManagerProvider");
    }
    return context;
  };
  