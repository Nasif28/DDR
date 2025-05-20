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
    size: 50,
  },

  ...[
    { key: "slNo", label: "SL" },
    { key: "dueDays", label: "Due Days" },
    { key: "concernPerson", label: "Concern Person" },
    { key: "accountHolder", label: "Account Holder" },
    { key: "customerStatus", label: "Status" },
    { key: "date", label: "Date" },
    { key: "idNo", label: "ID No" },
    { key: "billNo", label: "Bill No" },
    { key: "regNo", label: "Reg No" },
    { key: "vehicleModel", label: "Vehicle Model" },
    { key: "customerName", label: "Customer Name" },
    { key: "customerType", label: "Customer Type" },
    { key: "address", label: "Address" },
    { key: "billWithVAT", label: "Bill (VAT)" },
    { key: "billAfterDiscount", label: "Bill After Discount" },
    { key: "allReceived", label: "All Received" },
    { key: "balanceDue", label: "Balance Due" },
    { key: "receivedCheque", label: "Received Cheque" },
    { key: "ownerMobile", label: "Owner Mobile" },
    { key: "driverMobile", label: "Driver Mobile" },
  ].map((col) => ({
    id: col.key,
    accessorKey: col.key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={col.label} />
    ),
    cell: ({ row }) => row.getValue(col.key),
    enableSorting: true,
    enableHiding: true,
  })),
];
