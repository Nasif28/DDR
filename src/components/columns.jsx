import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 50,
  },

  ...[
    { key: "slNo", label: "SL", size: 60, defaultSize: 120 },
    { key: "dueDays", label: "Due Days", size: 120, defaultSize: 120 },
    { key: "concernPerson", label: "Concern Person", size: 150 },
    { key: "accountHolder", label: "Account Holder", size: 150 },
    { key: "customerStatus", label: "Status", size: 100 },
    { key: "date", label: "Date", size: 120 },
    { key: "idNo", label: "ID No", size: 100 },
    { key: "billNo", label: "Bill No", size: 130 },
    { key: "regNo", label: "Reg No", size: 150 },
    { key: "vehicleModel", label: "Vehicle Model", size: 150 },
    { key: "customerName", label: "Customer Name", size: 160 },
    { key: "customerType", label: "Customer Type", size: 140 },
    { key: "address", label: "Address", size: 250 },
    { key: "billWithVAT", label: "Bill (VAT)", size: 120 },
    { key: "billAfterDiscount", label: "Bill After Discount", size: 160 },
    { key: "allReceived", label: "All Received", size: 120 },
    { key: "balanceDue", label: "Balance Due", size: 140 },
    { key: "receivedCheque", label: "Received Cheque", size: 150 },
    { key: "ownerMobile", label: "Owner Mobile", size: 140 },
    { key: "driverMobile", label: "Driver Mobile", size: 140 },
  ].map((col) => ({
    id: col.key,
    accessorKey: col.key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={col.label} />
    ),
    cell: ({ row }) => row.getValue(col.key),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    enableResizing: true,
    size: col.size,
    meta: {
      defaultSize: col.size, // used in the resizer double click
    },
  })),
];
