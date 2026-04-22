"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleToggle = (status: Status) => {
    if (activeFilter.includes(status)) {
      onFilterChange(activeFilter.filter((s) => s !== status));
    } else {
      onFilterChange([...activeFilter, status]);
    }
  };

  const selectedCount = activeFilter.length;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="inline-flex items-center gap-3 rounded-full border border-transparent bg-transparent px-3 py-2 text-sm font-bold fg outline-none transition hover:text-primary focus-visible:border-default sm:bg-surface sm:px-4 sm:py-3"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>Filter by status</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-3 w-56 rounded-2xl border border-default bg-surface p-4 shadow-2xl sm:left-auto sm:right-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            Select status
          </p>
          <div className="space-y-3">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={activeFilter.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <span className="text-sm font-medium fg">{option.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            {selectedCount} selected
          </p>
        </div>
      ) : null}
    </div>
  );
}
