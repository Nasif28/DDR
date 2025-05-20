import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import GlobalSearch from "./GlobalSearch";
import PaginationControls from "./PaginationControls";
import ColumnVisibilityToggle from "./ColumnVisibilityToggle";
import ExportButtons from "./ExportButtons";
import { fetchBills } from "@/lib/api";
import { useQueryState } from "nuqs";
import ColumnFilters from "./ColumnFilters";
import { Input } from "./ui/input";
import RowSelectionToolbar from "./RowSelectionToolbar";
import TableToolbar from "./TableToolbar";
import { cn } from "@/lib/utils";

export default function DataTable({ columns }) {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const saved = localStorage.getItem("columnVisibility");
    return saved ? JSON.parse(saved) : {};
  });
  const [columnOrder, setColumnOrder] = useState(() => {
    const saved = localStorage.getItem("columnOrder");
    return saved ? JSON.parse(saved) : [];
  });

  const [columnSizing, setColumnSizing] = useState(() => {
    const saved = localStorage.getItem("columnSizing");
    return saved ? JSON.parse(saved) : {};
  });
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [sortParam, setSortParam] = useQueryState("sort");
  const [orderParam, setOrderParam] = useQueryState("order");

  const [pageIndexParam, setPageIndexParam] = useQueryState("page");
  const [pagination, setPagination] = useState({
    pageIndex: Number(pageIndexParam) || 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [customerType] = useQueryState("customerType");
  const [customerStatus] = useQueryState("status");
  const [date] = useQueryState("date");

  useEffect(() => {
    localStorage.setItem("columnSizing", JSON.stringify(columnSizing));
  }, [columnSizing]);
  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);
  useEffect(() => {
    localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
  }, [columnOrder]);

  const filterOptions = async () => {
    const res = await fetch("/filters");
    const data = await res.json();
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      const filters = {
        ...(customerType && { customerType }),
        ...(customerStatus && { customerStatus }),
        ...(date && { date }),
      };

      const res = await fetchBills({
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? "desc" : "asc",
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filters,
      });

      setData(res.items);
      setTotalCount(res.totalCount);
    };

    fetchData();
  }, [customerType, customerStatus, date, sorting, pagination]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
      rowSelection,
      sorting,
      columnOrder,
      // columnSizing,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      const active = newSorting[0];
      if (active) {
        setSortParam(active.id);
        setOrderParam(active.desc ? "desc" : "asc");
      } else {
        setSortParam(null);
        setOrderParam(null);
      }
    },

    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      setPageIndexParam(newPagination.pageIndex);
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    onColumnOrderChange: setColumnOrder,
    // onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    enableRowSelection: true,
    // enableColumnResizing: true,
    // columnResizeMode: "onChange",
  });

  useEffect(() => {
    console.log("SORTING changed", sorting);
  }, [sorting]);

  return (
    <div className="space-y-2">
      <ColumnFilters table={table} filterOptionsFromAPI={filterOptions} />
      <TableToolbar table={table} columns={columns} />

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    colSpan={header.colSpan}
                  >
                    <div
                      className={cn("flex items-center justify-between", {
                        "cursor-pointer select-none":
                          header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>

                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="resizer w-1 h-full cursor-col-resize bg-muted absolute right-0 top-0"
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2.5">
        <PaginationControls table={table} />
        {/* {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar} */}
      </div>

      <RowSelectionToolbar table={table} columns={columns} />
    </div>
  );
}
