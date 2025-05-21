"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

export default function ColumnFilters({ filterOptions = {} }) {
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
    <div className="flex gap-2 flex-wrap items-end">
      {/* Date Picker */}
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
                <span>Pick date</span>
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
      <div className="flex flex-col min-w-[120px]">
        <label className="text-sm mb-1">ID No</label>
        <Input
          type="number"
          placeholder="Enter ID"
          value={idNo || ""}
          onChange={(e) => setIdNo(e.target.value || null)}
        />
      </div>

      {/* Due Days */}
      <div className="flex flex-col min-w-[120px]">
        <label className="text-sm mb-1">Due Days</label>
        <Input
          type="number"
          placeholder="Enter days"
          value={dueDays || ""}
          onChange={(e) => setDueDays(e.target.value || null)}
        />
      </div>

      {/* Searchable Dropdowns */}
      {dropdownFilters.map((filter) => {
        const options = filterOptions[filter.id] || [];
        const selectedLabel = options.find((opt) => opt === filter.value);

        return (
          <div key={filter.id} className="flex flex-col min-w-[120px]">
            <label className="text-sm mb-1">{filter.label}</label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full pr-10"
                  >
                    {selectedLabel ?? `${filter.label}`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder={`Search ${filter.label}...`} />
                    <CommandList>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option}
                            value={option}
                            onSelect={() => filter.setValue(option)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                filter.value === option
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {filter.value && (
                <button
                  onClick={() => filter.setValue(null)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Reset All */}
      <div className="flex items-end">
        <Button variant="outline" onClick={clearAllFilters}>
          <XCircle className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
