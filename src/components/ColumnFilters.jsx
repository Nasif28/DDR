"use client";

import React, { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

export default function ColumnFilters({ table, filterOptionsFromAPI }) {
  // 🟡 Query-bound filter states
  const [filterDate, setFilterDate] = useQueryState("date");
  const [dueDays, setDueDays] = useQueryState("dueDays");
  const [balanceMin, setBalanceMin] = useQueryState("balanceMin");
  const [balanceMax, setBalanceMax] = useQueryState("balanceMax");

  const [accountHolder, setAccountHolder] = useQueryState("accountHolder");
  const [customerType, setCustomerType] = useQueryState("customerType");
  const [customerStatus, setCustomerStatus] = useQueryState("customerStatus");
  const [customerName, setCustomerName] = useQueryState("customerName");
  const [vehicleModel, setVehicleModel] = useQueryState("vehicleModel");

  // 🟢 Sync to TanStack columnFilters
  useEffect(() => {
    const filters = [];

    if (filterDate) filters.push({ id: "date", value: filterDate });
    if (dueDays) filters.push({ id: "dueDays", value: parseInt(dueDays) });

    if (balanceMin || balanceMax) {
      filters.push({
        id: "balanceDue",
        value: {
          min: balanceMin ? parseFloat(balanceMin) : 0,
          max: balanceMax ? parseFloat(balanceMax) : Infinity,
        },
      });
    }

    if (accountHolder)
      filters.push({ id: "accountHolder", value: accountHolder });
    if (customerType) filters.push({ id: "customerType", value: customerType });
    if (customerStatus)
      filters.push({ id: "customerStatus", value: customerStatus });
    if (customerName) filters.push({ id: "customerName", value: customerName });
    if (vehicleModel) filters.push({ id: "vehicleModel", value: vehicleModel });

    table.setColumnFilters(filters);
  }, [
    filterDate,
    dueDays,
    balanceMin,
    balanceMax,
    accountHolder,
    customerType,
    customerStatus,
    customerName,
    vehicleModel,
  ]);

  const dropdownFilters = [
    {
      id: "accountHolder",
      label: "Account Holder",
      value: accountHolder,
      setValue: setAccountHolder,
    },
    {
      id: "customerType",
      label: "Customer Type",
      value: customerType,
      setValue: setCustomerType,
    },
    {
      id: "customerStatus",
      label: "Customer Status",
      value: customerStatus,
      setValue: setCustomerStatus,
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
      {/* Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !filterDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate
                ? format(new Date(filterDate), "yyyy-MM-dd")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filterDate ? new Date(filterDate) : undefined}
              onSelect={(date) =>
                setFilterDate(date ? format(date, "yyyy-MM-dd") : null)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Due Days - Number less than */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Due Days &lt;</label>
        <Input
          type="number"
          value={dueDays || ""}
          onChange={(e) => setDueDays(e.target.value || null)}
        />
      </div>

      {/* Balance Due - Range */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Balance Due (Range)</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={balanceMin || ""}
            onChange={(e) => setBalanceMin(e.target.value || null)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={balanceMax || ""}
            onChange={(e) => setBalanceMax(e.target.value || null)}
          />
        </div>
      </div>

      {/* Dropdown filters (dynamic values from API) */}
      {dropdownFilters.map((filter) => (
        <div key={filter.id} className="flex flex-col">
          <label className="text-sm mb-1">{filter.label}</label>
          <Select
            value={filter.value || "all"}
            onValueChange={(val) => filter.setValue(val === "all" ? null : val)}
            className="w-[180px]"
          >
            <SelectTrigger className="min-w-[120px]">
              <SelectValue placeholder={`Select ${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptionsFromAPI[filter.id]?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
