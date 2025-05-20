"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader } from "lucide-react";
import * as XLSX from "xlsx";
import { useTransition } from "react";

export default function ExportButtons({ data }) {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(() => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const today = new Date().toISOString().split("T")[0];
      XLSX.writeFile(workbook, `DDR_${today}.xlsx`);
    });
  };

  return (
    <Button variant="outline" onClick={handleExport} disabled={isPending}>
      {isPending ? (
        <Loader className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Download className="mr-1" />
      )}
      Export
    </Button>
  );
}
