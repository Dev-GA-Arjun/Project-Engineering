"use client"

import { Button } from "@/components/ui/button"

export type FilterStatus = "all" | "active" | "completed"

interface FilterButtonsProps {
  currentFilter: FilterStatus
  onFilterChange: (filter: FilterStatus) => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export function FilterButtons({ currentFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ]

  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={`flex-1 ${
            currentFilter === filter.value 
              ? "bg-background shadow-sm" 
              : "hover:bg-background/50"
          }`}
        >
          {filter.label}
          <span className="ml-1.5 text-xs text-muted-foreground">
            {counts[filter.value]}
          </span>
        </Button>
      ))}
    </div>
  )
}
