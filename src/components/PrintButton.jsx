"use client";

import { Button } from "@/components/ui/button";
import { Printer, Loader } from "lucide-react";
import { useTransition } from "react";

export default function PrintButton({ data, columns }) {
  const [isPending, startTransition] = useTransition();

  const handlePrint = () => {
    startTransition(() => {
      const printWindow = window.open("", "_blank", "width=800,height=600");
console.log(columns)
      const tableHeaders = columns
        .filter((col) => col.accessorKey)
        .map(
          (col) =>
            `<th style="border: 1px solid #ccc; padding: 6px">${
              col?.meta?.label ?? col.accessorKey
            }</th>`
        )
        .join("");

      const tableRows = data
        .map((row) => {
          const cells = columns
            .filter((col) => col.accessorKey)
            .map(
              (col) =>
                `<td style="border: 1px solid #ccc; padding: 6px">${
                  row[col.accessorKey] ?? ""
                }</td>`
            )
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      const html = `
        <html>
          <head><title>Print Table</title></head>
          <body>
            <h2>Billing Table</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <thead><tr>${tableHeaders}</tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
            <script>window.onload = function () { window.print(); }</script>
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
