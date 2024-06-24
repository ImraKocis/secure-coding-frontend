"use client";

import { ReactElement, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline, IoHome, IoLogIn, IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { useAuth, useIsNavigationOpen, useUser } from "@/lib/redux/hooks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/lib/redux/features/userSlice";
import { Dispatch } from "redux";
import { set } from "@/lib/redux/features/navigationBarSlice";
import { Images, Users } from "lucide-react";
import { PiFilesLight } from "react-icons/pi";
import { AlertDialogProvider } from "@/app/ui/navigation/alert-dialog-context";
import { CreateTankDialog } from "@/app/ui/navigation/create-tank-dialog";
import { AuthContainer } from "@/app/ui/auth/auth-container";
import { FaUserPlus } from "react-icons/fa6";
import { deleteJwt, refreshTokens } from "@/app/actions/auth/actions";
import { json } from "node:stream/consumers";
import { SessionNavigation } from "@/app/ui/navigation/session-navigation";

const content: LinkContent[] = [
  { title: "Home", href: "/", icon: <IoHome className="w-6 h-6" /> },
];

const adminContent: LinkContent[] = [
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Posts",
    href: "/admin/posts",
    icon: <Images className="w-6 h-6" />,
  },
  {
    title: "Logs",
    href: "/admin/logs",
    icon: <PiFilesLight className="w-6 h-6" />,
  },
];

interface LinkContent {
  title: string;
  href: string;
  icon: ReactElement;
}

export function SideNavigation() {
  const isOpen = useIsNavigationOpen();
  const user = useUser();
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <div
      className={twMerge(
        "h-screen z-50 fixed bg-foreground text-white flex flex-col justify-between transform duration-500 px-4 py-3",
        isOpen ? "w-navigation-open" : "w-navigation-closed",
      )}
    >
      <section>
        <div
          className={twMerge(
            "flex mb-6",
            isOpen ? "justify-end" : "justify-center",
          )}
        >
          <button
            className="flex p-2 justify-center items-center"
            onClick={() => dispatch(set(!isOpen))}
          >
            {isOpen ? (
              <IoCloseOutline className="text-white flex w-6 h-6" />
            ) : (
              <CiMenuFries className="text-white flex w-6 h-6" />
            )}
          </button>
        </div>
        <div className="w-full mb-12">
          <ul className="flex flex-col gap-2">
            {content.map((item, index) => (
              <li key={index}>
                <Link className="flex items-center" href={item.href}>
                  <button className="flex p-2 justify-center items-center">
                    {item.icon}
                  </button>

                  <span
                    className={twMerge(
                      "transition ml-2 duration-300 ease-in-out",
                      isOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none -z-50",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <AlertDialogProvider>
                    <CreateTankDialog />
                  </AlertDialogProvider>
                </li>
                <li>
                  <Link className="flex items-center" href="/tanks">
                    <button className="flex p-2 justify-center items-center">
                      <FaUserPlus className="w-6 h-6" />
                    </button>

                    <span
                      className={twMerge(
                        "transition ml-2 duration-300 ease-in-out",
                        isOpen
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none -z-50",
                      )}
                    >
                      Assign tanks
                    </span>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </section>
      <section className="w-full mb-4">
        <SessionNavigation />
      </section>
    </div>
  );
}
