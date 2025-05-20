import { Input } from "@/components/ui/input";

export default function GlobalSearch({ globalFilter, setGlobalFilter }) {
  return (
    <div className="w-full">
      <Input
        placeholder="Global Search . . ."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
