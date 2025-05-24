"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

const filters = [
  {
    key: "customerName",
    label: "Customer Name",
    options: [
      "AB Bank Limited",
      "Ananta Apparels Ltd.",
      "ABM Yusuf Ali Khan",
      "Ahsan Group Limited",
      "Craig Rempel",
    ],
  },
  {
    key: "customerType",
    label: "Customer Type",
    options: ["Corporate", "Personal", "Agent", "Assistant"],
  },
  {
    key: "accountHolder",
    label: "Account Holder",
    options: [
      "DALIA",
      "Carolyn Grady",
      "Cheryl Ferry",
      "Dennis Hegmann",
      "Jenny Lindgren",
    ],
  },
];

export default function CustomDropdownFilters() {
  const [customerName, setCustomerName] = useQueryState("customerName");
  const [customerType, setCustomerType] = useQueryState("customerType");
  const [accountHolder, setAccountHolder] = useQueryState("accountHolder");

  const states = {
    customerName: [customerName, setCustomerName],
    customerType: [customerType, setCustomerType],
    accountHolder: [accountHolder, setAccountHolder],
  };

  return (
    <div className="flex gap-2 flex-wrap items-end">
      {filters.map((filter) => {
        const [value, setValue] = states[filter.key];
        return (
          <div key={filter.key} className=" min-w-[150px]">
            <label className="text-sm mb-1 text-red-700">{filter.label}</label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full pr-10"
                  >
                    {value ?? `Select ${filter.label}`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder={`Search ${filter.label}...`} />
                    <CommandList>
                      <CommandGroup>
                        {filter.options.map((option) => (
                          <CommandItem
                            key={option}
                            value={option}
                            onSelect={() => setValue(option)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === option ? "opacity-100" : "opacity-0"
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

              {value && (
                <button
                  onClick={() => setValue(null)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
