"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tank } from "@/lib/types/user";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assignTank } from "@/app/actions/user/actions";
import { deleteTank, updateTank } from "@/app/actions/tank/actions";

export const tankColumns: ColumnDef<Tank>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "hitpoints",
    header: "Hit points",
  },
  {
    accessorKey: "numofcrew",
    header: "Number of crew",
  },
  {
    accessorKey: "nation",
    header: "Nation",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  // { accessorKey: "User.email", header: "Assigned to" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tank = row.original;
      return (
        <div className="flex justify-center items-center space-x-2 z-50">
          <Button
            className="text-xs"
            disabled={!!tank.userId}
            onClick={async () => await assignTank(tank.id)}
          >
            Assign to me
          </Button>
          <Edit className="cursor-pointer" onClick={() => updateTank(tank)} />
          <Trash
            className="cursor-pointer"
            onClick={async () => await deleteTank(tank.id)}
          />
        </div>
      );
    },
  },
];
