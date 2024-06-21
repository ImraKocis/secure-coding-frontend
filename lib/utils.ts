import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleUserProfileName = (
  fullName?: string | null,
  firstName?: string | null,
  lastName?: string | null,
): string => {
  if (fullName) {
    const names = fullName.split(" ");
    return `${names[0][0]}${names[1][0]}`;
  }
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`;
  else if (firstName) return `${firstName[0]}`;
  else if (lastName) `${lastName[0]}`;
  return "";
};
