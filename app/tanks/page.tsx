import { getTanks } from "@/app/actions/tank/actions";
import { DataTable } from "@/app/ui/data-table";

import { tankColumns } from "@/app/ui/tank/table/columns";

export default async function TanksPage() {
  const tanks = await getTanks();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <DataTable columns={tankColumns} data={tanks ? tanks : []} />
    </div>
  );
}
