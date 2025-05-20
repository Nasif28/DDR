"use client";

import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Check,
  EyeOff,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableColumnHeader({ column, title, className, ...props }) {
  const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {title}
        {column.getCanSort() &&
          (isSorted === "desc" ? (
            <ChevronDown />
          ) : isSorted === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronsUpDown />
          ))}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-32">
        {column.getCanSort() && (
          <>
            {/* Sort Asc */}
            <DropdownMenuItem
              onClick={() => column.setSorting(false)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ChevronUp className="w-4 h-4" />
                Asc
              </div>
              {isSorted === "asc" && <Check className="w-4 h-4" />}
            </DropdownMenuItem>

            {/* Sort Desc */}
            <DropdownMenuItem
              onClick={() => column.setSorting(true)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Desc
              </div>
              {isSorted === "desc" && <Check className="w-4 h-4" />}
            </DropdownMenuItem>

            {/* Reset sort */}
            {isSorted && (
              <DropdownMenuItem
                onClick={() => column.clearSorting()}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </DropdownMenuItem>
            )}
          </>
        )}

        {/* Column visibility */}
        {column.getCanHide() && (
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="flex items-center gap-2"
          >
            <EyeOff className="w-4 h-4" />
            Hide
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
