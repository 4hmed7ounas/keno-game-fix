 
export const getLastGameId = (gameId: string) => {
  // get final string after '-'
  const lastPart = gameId.split("-").pop();
  return lastPart;
};



