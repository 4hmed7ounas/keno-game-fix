import { GameStatus, GameType } from "@/utils/enums/prisma-enums";
import { IKenoGame, IKenoGameConfigurations } from "@/utils/types/game-types";
import { OddType } from "@/utils/types/odd-management";

    export const game1: IKenoGame = {
   id: "cm1qkzh3v0002i0zajrtw5ehf",
   uniqueId: "KGS1-8F0MT-ZF5169",
   shopId: "cm1kuv8wo00016g1noog1269m",
   gameType: GameType.KENO,
   startAt: new Date("2024-10-01T15:16:00.473Z"),
   endAt: new Date("2024-10-01T15:21:00.473Z"),
   status: GameStatus.NOT_STARTED,
   oddType: OddType.Promo2,
   createdAt: new Date("2024-10-01T15:16:00.457Z"),
   updatedAt: new Date("2024-10-01T15:16:00.457Z"),
   keno: {
       id: "cm1qkzh3v0003i0zado9qo7dd",
       gameId: "cm1qkzh3v0002i0zajrtw5ehf",
       winningNumbers: [],
       ticketWillBeDisabledAt: new Date("2024-10-01T15:19:55.473Z"),
       winningNumberWillBeShowedAt: new Date("2024-10-01T15:20:00.473Z")
        }
    }




    export const game2 ={
   id: "cm1pjr1vj001f4cfq3kvk1ayb",
   uniqueId: "KGS1-AGIYS-VD7817",
   shopId: "cm1kuv8wo00016g1noog1269m",
   gameType: GameType.KENO,
   startAt: new Date("2024-09-30T21:53:41.694Z"),
   endAt: new Date("2024-09-30T21:58:41.694Z"),
   status: GameStatus.DONE,
   oddType: OddType.Promo2,
   createdAt: new Date("2024-09-30T21:53:41.684Z"),
   updatedAt: new Date("2024-09-30T21:59:04.292Z"),
   keno: {
       id: "cm1pjr1vj001g4cfqbjaw5ayj",
       gameId: "cm1pjr1vj001f4cfq3kvk1ayb",
       winningNumbers: [ 
            ],
       ticketWillBeDisabledAt: new Date("2024-09-30T21:57:36.694Z"),
       winningNumberWillBeShowedAt: new Date("2024-09-30T21:57:41.694Z")
        }
    }

    export const sampleGames = [
        game1, game2
    ]

