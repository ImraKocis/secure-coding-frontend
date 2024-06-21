import { ReactElement } from "react";
import { DataTable } from "@/app/ui/data-table";
import { getAllUsersAndTanks } from "@/app/actions/user/actions";
import { userColumns } from "@/app/ui/user/table/columns";

export default async function Home(): Promise<ReactElement> {
  const users = await getAllUsersAndTanks();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <DataTable columns={userColumns} data={users ? users : []} />
    </div>
  );
}
