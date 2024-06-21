import { ReactElement, ReactNode } from "react";
import { getSession } from "@/app/actions/auth/session";
import { SessionExpired } from "@/app/ui/auth/session-expired";

export async function AuthWrapper({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await getSession();
  return (
    <div className="w-full h-screen">
      {session.jwt ? children : <SessionExpired />}
    </div>
  );
}
