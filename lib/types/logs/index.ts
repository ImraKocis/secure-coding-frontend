import { Role } from "@/lib/types/user";

export interface Logs {
  userId: number;
  action: string;
  description: string;
  role: Role | null;
}
