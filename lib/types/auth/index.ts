export interface SignupData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  id: number;
}

export interface SessionCookie {
  token: string;
  refreshToken: string;
  id: number;
}

export interface Session {
  jwt?: string;
  rt?: string;
}

export interface GetLoginProps {
  url: string;
  state: string;
}

export type AuthProvider = "google" | "github";

type Subscription = "FREE" | "PRO" | "GOLD";
