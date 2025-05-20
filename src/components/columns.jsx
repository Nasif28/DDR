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
    size: 25,
  },

  ...[
    { key: "slNo", label: "SL", size: 55 },
    { key: "dueDays", label: "Due Days", size: 100 },
    { key: "concernPerson", label: "Concern Person", size: 140 },
    { key: "accountHolder", label: "Account Holder", size: 140 },
    { key: "customerStatus", label: "Status", size: 80 },
    { key: "date", label: "Date", size: 100 },
    { key: "idNo", label: "ID No", size: 80 },
    { key: "billNo", label: "Bill No", size: 100 },
    { key: "regNo", label: "Reg No", size: 140 },
    { key: "vehicleModel", label: "Vehicle Model", size: 130 },
    { key: "customerName", label: "Customer Name", size: 140 },
    { key: "customerType", label: "Customer Type", size: 130 },
    { key: "address", label: "Address", size: 200 },
    { key: "billWithVAT", label: "Bill (VAT)", size: 100 },
    { key: "billAfterDiscount", label: "Bill After Discount", size: 150 },
    { key: "allReceived", label: "All Received", size: 120 },
    { key: "balanceDue", label: "Balance Due", size: 120 },
    { key: "receivedCheque", label: "Received Cheque", size: 150 },
    { key: "ownerMobile", label: "Owner Mobile", size: 130 },
    {
      key: "driverMobile",
      label: "Driver Mobile",
      size: 130,
      enableResizing: false,
    },
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
    minSize: 50,
    maxSize: 400,
    meta: {
      defaultSize: col.size,
    },
  })),
];
