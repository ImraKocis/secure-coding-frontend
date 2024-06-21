export interface User {
  id: number;
  createdAt: Date;
  // updatedAt: Date;
  email: string;
  tanks: Tank[];
}

export interface Subscription {
  id: number;
  createdAt: Date;
  dailyLimitId: number;
  odlSubscription: SubscriptionName | null;
  name: SubscriptionName;
  updatedAt: Date;
  uploadSizeId: number;
  userId: number;
  validFrom: Date;
  DailyLimit: DailyLimit;
  UploadSize: UploadSize;
}

export interface DailyLimit {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  limit: number;
  subscriptions: Subscription[];
  subscriptionName: SubscriptionName;
}

export interface UploadSize {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  size: number;
  subscriptions: Subscription[];
  subscriptionName: SubscriptionName;
}

export interface Tank {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  nation: string;
  type: TankType;
  hitpoints: number;
  numofcrew: number;
  userId: number;
  User: User;
}
export type TankType =
  | "LIGHT_TANK"
  | "MEDIUM_TANK"
  | "HEAVY_TANK"
  | "TANK_DESTROYER"
  | "SPG";

export type Role = "USER" | "ADMIN";

export type SubscriptionName = "FREE" | "PRO" | "GOLD";
