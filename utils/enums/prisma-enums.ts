// Auto-generated Prisma enums

export enum UserRole {
  ADMIN = "ADMIN",
  PROVIDER_SUPER_ADMIN = "PROVIDER_SUPER_ADMIN",
  PROVIDER_ADMIN = "PROVIDER_ADMIN",
  SUPER_AGENT = "SUPER_AGENT",
  AGENT = "AGENT",
  CASHIER = "CASHIER",
}

export enum ProviderUserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

export enum ActiveStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export enum AgentRule {
  SUPER_AGENT = "SUPER_AGENT",
  AGENT = "AGENT",
}

export enum GameStatus {
  NOT_STARTED = "NOT_STARTED",
  ON_PLAY = "ON_PLAY",
  DONE = "DONE",
}

export enum GameType {
  KENO = "KENO",
  DOG_RACING = "DOG_RACING",
  HORSE_RASING = "HORSE_RASING",
}

export enum TicketStatus {
  ON_PLAY = "ON_PLAY",
  WIN = "WIN",
  LOSE = "LOSE",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export enum TicketSelectionStatus {
  ON_PLAY = "ON_PLAY",
  WIN = "WIN",
  LOSE = "LOSE",
  PAID = "PAID",
}
