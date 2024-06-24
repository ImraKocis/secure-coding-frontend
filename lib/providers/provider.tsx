"use client";
import { ReactElement, ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/lib/redux/store";
import { User } from "@/lib/types/user";
import { Provider as ReduxProvider } from "react-redux";
import { set as setUSer } from "@/lib/redux/features/userSlice";
import { set as setAuth } from "@/lib/redux/features/authSlice";
import { Session } from "@/lib/types/auth";

interface ClientProvider {
  user: User | null;
  session: Session | null;
  children: ReactNode;
}

export function Providers({
  children,
  user,
  session,
}: ClientProvider): ReactElement {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setUSer(user));
    storeRef.current.dispatch(setAuth(session));
  }
  return <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>;
}
