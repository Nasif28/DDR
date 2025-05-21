"use client";

import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Check,
  EyeOff,
  X,
  Settings2,
  Filter,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function DataTableColumnHeader({ column, title, className, ...props }) {
  const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger
            aria-label={`Column options for ${title}`}
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
        </TooltipTrigger>
        <TooltipContent>{`Options for ${title}`}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="start" className="w-40">
        {column.getCanSort() && (
          <>
            <DropdownMenuLabel className="flex items-center gap-1 text-xs text-muted-foreground">
              <Filter className="w-3 h-3" />
              Sort Options
            </DropdownMenuLabel>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // Important to prevent menu close if needed
                column.setSorting(false);
              }}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <ChevronUp className="w-4 h-4" />
                Asc
              </div>
              {isSorted === "asc" && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                column.setSorting(true);
              }}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Desc
              </div>
              {isSorted === "desc" && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>

            {isSorted && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  column.clearSorting();
                }}
                className="flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" />
                Clear Sort
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
          </>
        )}

        {column.getCanHide() && (
          <>
            <DropdownMenuLabel className="flex items-center gap-1 text-xs text-muted-foreground">
              <Settings2 className="w-3 h-3" />
              Column Options
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => column.toggleVisibility(false)}
              className="flex items-center gap-2 text-sm"
            >
              <EyeOff className="w-4 h-4" />
              Hide Column
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
