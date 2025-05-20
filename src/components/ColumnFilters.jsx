import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export default function ColumnFilters({ table }) {
  const [customerType, setCustomerType] = useQueryState("customerType");
  const [customerStatus, setCustomerStatus] = useQueryState("status");
  const [date, setDate] = useQueryState("date");

  const filterMap = [
    {
      id: "customerType",
      label: "Customer Type",
      value: customerType || "",
      onChange: (val) => setCustomerType(val === "" ? null : val),
      options: ["Corporate", "Individual", "Government"],
    },
    {
      id: "customerStatus",
      label: "Status",
      value: customerStatus || "",
      onChange: (val) => setCustomerStatus(val === "" ? null : val),
      options: ["Green", "Yellow", "Red"],
    },
    {
      id: "date",
      label: "Date",
      value: date || "",
      onChange: (val) => setDate(val === "" ? null : val),
      type: "text",
    },
  ];

  useEffect(() => {
    table.setColumnFilters([
      ...(customerType ? [{ id: "customerType", value: customerType }] : []),
      ...(customerStatus
        ? [{ id: "customerStatus", value: customerStatus }]
        : []),
      ...(date ? [{ id: "date", value: date }] : []),
    ]);
  }, [customerType, customerStatus, date]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {filterMap.map((filter) => (
        <div key={filter.id} className="flex flex-col">
          <label className="text-sm mb-1">{filter.label}</label>
          {filter.options ? (
            <Select value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem>All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type="text"
              value={filter.value}
              placeholder={`Filter ${filter.label}`}
              onChange={(e) => filter.onChange(e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
