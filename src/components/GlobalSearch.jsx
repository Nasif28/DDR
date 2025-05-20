"use client";

import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export default function GlobalSearch() {
  const [searchParam, setSearchParam] = useQueryState("search");
  const [value, setValue] = useState(searchParam || "");

  // Debounce handler
  const debouncedSetSearch = debounce((val) => {
    setSearchParam(val === "" ? null : val);
  }, 500); // 500ms debounce

  useEffect(() => {
    debouncedSetSearch(value);
    return () => debouncedSetSearch.cancel();
  }, [value]);

  return (
    <div className="w-full">
      <Input
        placeholder="Global Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
