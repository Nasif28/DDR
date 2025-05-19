import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

export default function ExportButtons({ data }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return <Button onClick={handleExport}>Export to Excel</Button>;
}
