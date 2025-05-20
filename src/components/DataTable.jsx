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
import PaginationControls from "./PaginationControls";
import { fetchBills } from "@/lib/api";
import { useQueryState } from "nuqs";
import ColumnFilters from "./ColumnFilters";
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
  const [search] = useQueryState("search");
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
        search,
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
      columnSizing,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    manualFiltering: true,
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
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    console.log("SORTING changed", sorting);
  }, [sorting]);

  return (
    <div className="flex flex-col space-y-2 max-h-[calc(100vh-90px)]">
      <div className="sticky top-0 z-10 space-y-2">
        <ColumnFilters table={table} filterOptionsFromAPI={filterOptions} />
        <TableToolbar table={table} columns={columns} />
      </div>

      <div className="flex-1 overflow-y-auto border rounded-md">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="sticky top-0 z-10"
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
                        onDoubleClick={(e) => {
                          e.stopPropagation();

                          const columnId = header.column.id;
                          const defaultSize =
                            header.column.columnDef.meta?.defaultSize;
                          if (defaultSize != null) {
                            table.setColumnSizing((old) => ({
                              ...old,
                              [columnId]: defaultSize,
                            }));
                          }
                        }}
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

      <div className="sticky bottom-0 z-10 space-y-2">
        <PaginationControls table={table} />
        <RowSelectionToolbar table={table} columns={columns} />
      </div>
    </div>
  );
}
