import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PrintButton({ data, columns }) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    const tableHeaders = columns
      .filter((col) => col.accessorKey)
      .map(
        (col) =>
          `<th style="border: 1px solid #ccc; padding: 6px">${col.header}</th>`
      )
      .join("");

    const tableRows = data
      .map((row) => {
        const cells = columns
          .filter((col) => col.accessorKey)
          .map(
            (col) =>
              `<td style="border: 1px solid #ccc; padding: 6px">${
                row[col.accessorKey]
              }</td>`
          )
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    const html = `
      <html>
        <head>
          <title>Print Table</title>
        </head>
        <body>
          <h2>Billing Table</h2>
          <table style="border-collapse: collapse; width: 100%;">
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
  };

  return (
    <Button variant="outline" onClick={handlePrint}>
      <Printer /> Print
    </Button>
  );
}
