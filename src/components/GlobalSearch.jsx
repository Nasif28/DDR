import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Search, X } from "lucide-react";

export default function GlobalSearch() {
  const [search, setSearch] = useQueryState("search");
  const [value, setValue] = useState(search || "");

  const handleSearch = () => {
    setSearch(value || null);
  };

  const handleClear = () => {
    setValue("");
    setSearch(null);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search . . ."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="pr-8" // Add padding-right so clear icon doesn't overlap text
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button onClick={handleSearch} variant="outline" className="shrink-0">
        <Search className="w-4 h-4 mr-1" />
        Search
      </Button>
    </div>
  );
}
