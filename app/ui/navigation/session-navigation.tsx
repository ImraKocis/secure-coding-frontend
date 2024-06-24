"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { AuthContainer } from "@/app/ui/auth/auth-container";
import { deleteUser } from "@/lib/redux/features/userSlice";
import { ReactElement } from "react";
import { Session } from "@/lib/types/auth";
import { useAuth, useIsNavigationOpen, useUser } from "@/lib/redux/hooks";
import { refreshTokens } from "@/app/actions/auth/actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

const handleSessionNavigation = (
  session: Session | null,
  isOpen: boolean,
): ReactElement | null => {
  if (!session?.rt)
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-center items-center gap-2">
            <button className="flex w-full items-center relative">
              <div className="flex justify-center items-center p-2">
                <IoLogIn className="w-6 h-6" />
              </div>
              <span
                className={twMerge(
                  "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                  isOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none -z-50",
                )}
              >
                Log In
              </span>
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AuthContainer />
        </AlertDialogContent>
      </AlertDialog>
    );

  return (
    <button
      className="flex w-full items-center relative"
      onClick={() => refreshTokens()}
    >
      <div className="flex justify-center items-center p-2">
        <IoLogIn className="w-6 h-6" />
      </div>
      <span
        className={twMerge(
          "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none -z-50",
        )}
      >
        Quick log In
      </span>
    </button>
  );
};

export function SessionNavigation(): ReactElement {
  const isOpen = useIsNavigationOpen();
  const user = useUser();
  const session = useAuth();
  const dispatch: Dispatch<any> = useDispatch();
  return (
    <>
      {!user ? (
        handleSessionNavigation(session, isOpen)
      ) : (
        <div className="flex justify-center items-center gap-2">
          <button
            className="flex w-full items-center relative"
            onClick={() => dispatch(deleteUser())}
          >
            <div className="flex justify-center items-center p-2">
              <IoLogOut className="w-6 h-6" />
            </div>
            <span
              className={twMerge(
                "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none -z-50",
              )}
            >
              Log Out
            </span>
          </button>
        </div>
      )}
    </>
  );
}
