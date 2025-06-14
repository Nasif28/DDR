import GlobalSearch from "./GlobalSearch";
import ColumnVisibilityToggle from "./ColumnVisibilityToggle";
import ExportButtons from "./ExportButtons";
import PrintButton from "./PrintButton";

export default function TableToolbar({ table, columns }) {
  const data = table.getFilteredRowModel().rows.map((row) => row.original);
  // const visibleColumns = table.getVisibleLeafColumns();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2">
        <ExportButtons data={data} columns={columns} />
        <PrintButton data={data} columns={columns} />
        <ColumnVisibilityToggle table={table} />
      </div>
    </div>
  );
}
