// src/components/ColumnFilters.jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function ColumnFilters({ table, filterOptions }) {
  const [customerType, setCustomerType] = useQueryState("customerType");
  const [customerName, setCustomerName] = useQueryState("customerName");
  const [vehicleModel, setVehicleModel] = useQueryState("vehicleModel");
  const [customerStatus, setCustomerStatus] = useQueryState("customerStatus");
  const [accountHolder, setAccountHolder] = useQueryState("accountHolder");
  const [concernPerson, setConcernPerson] = useQueryState("concernPerson");
  const [date, setDate] = useQueryState("date");
  const [dueDays, setDueDays] = useQueryState("dueDays");
  const [idNo, setIdNo] = useQueryState("idNo");

  const clearAllFilters = () => {
    setCustomerType(null);
    setCustomerName(null);
    setVehicleModel(null);
    setCustomerStatus(null);
    setAccountHolder(null);
    setConcernPerson(null);
    setDate(null);
    setDueDays(null);
    setIdNo(null);
  };

  const dropdownFilters = [
    {
      id: "customerType",
      label: "Customer Type",
      value: customerType,
      setValue: setCustomerType,
    },
    {
      id: "customerName",
      label: "Customer Name",
      value: customerName,
      setValue: setCustomerName,
    },
    {
      id: "vehicleModel",
      label: "Vehicle Model",
      value: vehicleModel,
      setValue: setVehicleModel,
    },
    {
      id: "customerStatus",
      label: "Customer Status",
      value: customerStatus,
      setValue: setCustomerStatus,
    },
    {
      id: "accountHolder",
      label: "Account Holder",
      value: accountHolder,
      setValue: setAccountHolder,
    },
    {
      id: "concernPerson",
      label: "Concern Person",
      value: concernPerson,
      setValue: setConcernPerson,
    },
  ];

  return (
    // <div className="grid grid-cols-2 md:grid-cols-10 gap-2 items-end">
    <div className="flex gap-2 flex-wrap">
      {/* ✅ Date Picker */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm mb-1">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(new Date(date), "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={(day) =>
                setDate(day ? day.toISOString().split("T")[0] : null)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* ID No */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm mb-1">ID No</label>
        <Input
          type="number"
          placeholder="Enter ID"
          value={idNo || ""}
          onChange={(e) => setIdNo(e.target.value || null)}
        />
      </div>

      {/* Due Days */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm mb-1">Due Days (≤)</label>
        <Input
          type="number"
          placeholder="Enter days"
          value={dueDays || ""}
          onChange={(e) => setDueDays(e.target.value || null)}
        />
      </div>

      {dropdownFilters.map((filter) => (
        <div key={filter.id} className="flex flex-col min-w-[150px]">
          <label className="text-sm mb-1">{filter.label}</label>
          <Select
            value={filter.value || "all"}
            onValueChange={(val) => filter.setValue(val === "all" ? null : val)}
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder={`Select ${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions[filter.id]?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {/* Reset */}
      <div className="flex items-end">
        <Button variant="outline" onClick={clearAllFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
