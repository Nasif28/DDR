import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import React from "react";
import { cn } from "@/lib/utils";

export default function ColumnVisibilityToggle({ table }) {
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        ),
    [table]
  );

  const allVisible = columns.every((col) => col.getIsVisible());
  const toggleAll = () => {
    columns.forEach((col) => col.toggleVisibility(!allVisible));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          role="combobox"
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 className="mr-1" />
          View
          <ChevronsUpDown className="ml-1 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className=" w-44 p-0">
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>

            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  onSelect={() =>
                    column.toggleVisibility(!column.getIsVisible())
                  }
                >
                  <span className="truncate">
                    {column.columnDef.meta?.label ?? column.id}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0",
                      column.getIsVisible() ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              <CommandItem onSelect={toggleAll}>
                {allVisible ? "Hide all" : "Show all"}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
