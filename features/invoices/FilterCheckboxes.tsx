"use client";

import type { Status } from "@/types/status";
import type { FilterOptions } from "@/types/filter";

interface FilterCheckboxesProps {
  activeFilter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
}

const statusOptions: Array<{ label: string; value: Status }> = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

export function FilterCheckboxes({
  activeFilter,
  onFilterChange,
}: FilterCheckboxesProps) {
  const handleToggle = (status: Status) => {
    if (activeFilter.includes(status)) {
      // Remove status from filter
      onFilterChange(activeFilter.filter((s) => s !== status));
    } else {
      // Add status to filter
      onFilterChange([...activeFilter, status]);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="text-sm font-semibold text-muted">Filter by:</span>
      <div className="flex gap-4 sm:gap-6">
        {statusOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={activeFilter.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="w-4 h-4 rounded accent-primary"
            />
            <span className="text-sm font-medium fg">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
