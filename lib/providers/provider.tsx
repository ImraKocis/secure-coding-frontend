"use client";
import { ReactElement, ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/lib/redux/store";
import { User } from "@/lib/types/user";
import { Provider as ReduxProvider } from "react-redux";
import { set as setUSer } from "@/lib/redux/features/userSlice";

interface ClientProvider {
  user: User | null;
  children: ReactNode;
}

export function Providers({ children, user }: ClientProvider): ReactElement {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setUSer(user));
  }
  return <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>;
}
