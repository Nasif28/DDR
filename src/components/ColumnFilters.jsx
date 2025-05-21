// src/components/ColumnFilters.jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getFilterOptions } from "@/lib/getFilterOptions";

export default function ColumnFilters({ table, filterOptions }) {
  const [customerType, setCustomerType] = useQueryState("customerType");
  const [customerName, setCustomerName] = useQueryState("customerName");
  const [vehicleModel, setVehicleModel] = useQueryState("vehicleModel");
  const [customerStatus, setCustomerStatus] = useQueryState("customerStatus");
  const [accountHolder, setAccountHolder] = useQueryState("accountHolder");
  const [concernPerson, setConcernPerson] = useQueryState("concernPerson");

  const filters = [
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
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2">
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-col min-w-[150px]">
          <label className="text-sm mb-1">{filter.label}</label>
          <Select
            value={filter.value || "all"}
            onValueChange={(val) => filter.setValue(val === "all" ? null : val)}
          >
            <SelectTrigger className="min-w-[120px]">
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
    </div>
  );
}
