"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tank, User } from "@/lib/types/user";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assignTank } from "@/app/actions/user/actions";
import { deleteTank, updateTank } from "@/app/actions/tank/actions";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tanks",
    header: "Number of Tanks",
    cell: ({ getValue }) => (getValue() as Tank[]).length,
  },
  {
    accessorKey: "tanks",
    header: "Tanks",
    cell: ({ row }) => {
      const tanks = row.original.tanks;
      return (
        <ul>
          {tanks.map((tank) => (
            <li key={tank.id}>
              {tank.name} ({tank.type})
            </li>
          ))}
        </ul>
      );
    },
  },
];
