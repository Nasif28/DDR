import PrintButton from "./PrintButton";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function RowSelectionToolbar({ table, columns }) {
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedData = selectedRows.map((row) => row.original);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected");
    XLSX.writeFile(workbook, "selected-rows.xlsx");
  };

  if (selectedRows.length === 0) return null;

  return (
    <div className="flex justify-between items-center bg-muted px-2 py-1 rounded-md">
      <span className="text-sm">{selectedRows.length} row(s) selected</span>
      <div className="space-x-2">
        <Button variant="outline" onClick={handleExport}>
          <Download /> Export Selected
        </Button>
        <PrintButton data={selectedData} columns={columns} />
      </div>
    </div>
  );
}
