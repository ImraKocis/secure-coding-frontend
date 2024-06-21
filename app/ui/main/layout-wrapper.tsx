"use client";

import { ReactElement, ReactNode } from "react";
import { useIsNavigationOpen } from "@/lib/redux/hooks";
import { twMerge } from "tailwind-merge";

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutProviderProps): ReactElement {
  const isOpen = useIsNavigationOpen();
  return (
    <div
      className={twMerge(
        "relative w-full py-20 px-6 transform duration-500",
        isOpen ? "ml-navigation-open" : "ml-navigation-closed",
      )}
    >
      {children}
    </div>
  );
}
