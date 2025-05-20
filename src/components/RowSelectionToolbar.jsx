"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X, Download, Trash2, Printer } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";

export default function RowSelectionToolbar({ table, columns }) {
  const [mounted, setMounted] = useState(false);
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedData = selectedRows.map((row) => row.original);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [table]);

  const container = mounted ? document.body : null;

  const handleClearSelection = () => {
    table.toggleAllRowsSelected(false);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected");
    XLSX.writeFile(workbook, "selected-rows.xlsx");
    toast.success("Exported selected rows");
  };

  const handlePrint = () => {
    const printable = window.open("", "_blank");
    printable.document.write("<html><head><title>Print</title></head><body>");
    printable.document.write(
      `<pre>${JSON.stringify(selectedData, null, 2)}</pre>`
    );
    printable.document.write("</body></html>");
    printable.document.close();
    printable.print();
  };

  const handleDelete = () => {
    toast("Delete action triggered", {
      description: `${selectedData.length} row(s) would be deleted.`,
    });
    table.toggleAllRowsSelected(false);
  };

  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {selectedRows.length > 0 && (
        <motion.div
          role="toolbar"
          aria-orientation="horizontal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit bg-background flex-wrap items-center justify-center gap-2 rounded-sm border py-2 text-foreground shadow-sm",
            "sm:px-4"
          )}
        >
          <div className="flex h-8 items-center rounded-md border pr-2 pl-2.5">
            <span className="whitespace-nowrap text-xs">
              {selectedRows.length} Selected
            </span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5"
                  onClick={handleClearSelection}
                >
                  <X className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={10}
                className="flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
              >
                <p>Clear Selection</p>
                <kbd className="select-none rounded border bg-background px-1.5 py-px font-mono font-normal text-[0.7rem] text-foreground shadow-xs">
                  <abbr title="Escape" className="no-underline">
                    Esc
                  </abbr>
                </kbd>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-5" />

          {/* Action Buttons */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={handleExport}>
                <Download className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={7}
              className="flex items-center gap-2 border bg-accent px-2 py-1.5 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
            >
              Export Selected
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={handlePrint}>
                <Printer className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={7}
              className="flex items-center gap-2 border bg-accent px-2 py-1.5 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
            >
              Print Selected
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={7}
              className="flex items-center gap-2 border bg-accent px-2 py-1.5 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
            >
              Delete Selected
            </TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
}
