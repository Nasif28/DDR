import { Button } from "@/components/ui/button";

export default function PaginationControls({ table }) {
  return (
    <div className="flex justify-between items-center py-2">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <span>Page {table.getState().pagination.pageIndex + 1}</span>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
}
