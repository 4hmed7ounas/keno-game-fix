// Calculate the time left until the game ends
export function calculateTimeLeft(endAt: Date): number {
  endAt = new Date(endAt);
  const now = new Date();
  const timeLeft = Math.ceil((endAt.getTime() - now.getTime()) / 1000);
  return timeLeft > 0 ? timeLeft : 0; // Ensure the counter doesn't go negative
}

export function calculateTimeDifference(startAt: Date): number {
  startAt = new Date(startAt);
  const now = new Date();
  const timeLeft = Math.ceil((now.getTime() - startAt.getTime()) / 1000);
  return timeLeft > 0 ? timeLeft : 0; // Ensure the counter doesn't go negative
}

export function calculateTimeLeftWithNegative(endAt: Date): number {
  endAt = new Date(endAt);
  const now = new Date();
  const timeLeft = Math.ceil((endAt.getTime() - now.getTime()) / 1000);
  return timeLeft; // Ensure the counter doesn't go negative
}
