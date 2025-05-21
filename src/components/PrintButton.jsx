"use client";

import { Button } from "@/components/ui/button";
import { Printer, Loader } from "lucide-react";
import { useTransition } from "react";

export default function PrintButton({ data, columns }) {
  const [isPending, startTransition] = useTransition();

  const handlePrint = () => {
    startTransition(() => {
      const printWindow = window.open("", "_blank", "width=800,height=600");

      // Use only visible columns with accessorKey
      const visibleColumns = columns.filter(
        (col) => col.getIsVisible?.() && col.columnDef.accessorKey
      );

      const tableHeaders = visibleColumns
        .map((col) => {
          const key = col.columnDef.accessorKey;
          const label = col.columnDef.meta?.label ?? key;
          return `<th style="border: 1px solid #ccc; padding: 6px">${label}</th>`;
        })
        .join("");

      const tableRows = data
        .map((row) => {
          const cells = visibleColumns
            .map((col) => {
              const key = col.columnDef.accessorKey;
              return `<td style="border: 1px solid #ccc; padding: 6px">${
                row[key] ?? ""
              }</td>`;
            })
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      const html = `
        <html>
          <head>
            <title>Print Table</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              h2 { margin-bottom: 1rem; }
              table { border-collapse: collapse; width: 100%; }
              th, td { font-size: 14px; }
            </style>
          </head>
          <body>
            <h2>Billing Table</h2>
            <table>
              <thead><tr>${tableHeaders}</tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
            <script>
              window.onload = function () {
                window.print();
              };
            </script>
          </body>
        </html>
      `;

      printWindow.document.write(html);
      printWindow.document.close();
    });
  };

  return (
    <Button variant="outline" onClick={handlePrint} disabled={isPending}>
      {isPending ? (
        <Loader className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Printer className="mr-1" />
      )}
      Print
    </Button>
  );
}
