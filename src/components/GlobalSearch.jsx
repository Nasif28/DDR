import { Input } from "@/components/ui/input";

export default function GlobalSearch({ globalFilter, setGlobalFilter }) {
  return (
    <div className="mb-4 w-full">
      <Input
        placeholder="Search all columns..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
