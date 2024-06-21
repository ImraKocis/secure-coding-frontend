"use client";
import { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GiTank } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
import { useIsNavigationOpen } from "@/lib/redux/hooks";
import { CreateTankForm } from "@/app/ui/tank/create-tank-form";
import { useAlertDialogContext } from "@/app/ui/navigation/alert-dialog-context";

export function CreateTankDialog(): ReactElement {
  const isOpen = useIsNavigationOpen();
  const { isDialogOpen, setIsDialogOpen } = useAlertDialogContext();
  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-center items-center gap-2">
          <button
            className="flex w-full items-center relative"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex justify-center items-center p-2">
              <GiTank className="w-6 h-6 " />
            </div>
            <span
              className={twMerge(
                "transition ml-2 duration-300 ease-in-out absolute left-10 flex items-center h-full top-0",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none -z-50",
              )}
            >
              Creat Tank
            </span>
          </button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background p-8">
        <CreateTankForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
