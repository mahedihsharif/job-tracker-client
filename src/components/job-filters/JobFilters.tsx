import type { JobFilters as Filters } from "@/lib/types";
import { Search, X } from "lucide-react";
import DateRangePicker from "../date-range-picker/DateRangePicker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface JobFiltersProps {
  filters: Filters;
}

const JobFilters = ({ filters }: JobFiltersProps) => {
  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.applyDateStart ||
    filters.applyDateEnd ||
    filters.lastDateStart ||
    filters.lastDateEnd;
  return (
    <div className="space-y-4 rounded-xl bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by job title or company..."
              value={filters.search}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full space-y-2 lg:w-48">
          <label className="text-sm font-medium text-muted-foreground">
            Status
          </label>
          <Select value={filters.status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row">
          <DateRangePicker
            label="Apply Date"
            startDate={filters.applyDateStart}
            endDate={filters.applyDateEnd}
          />
          <DateRangePicker
            label="Last Date"
            startDate={filters.lastDateStart}
            endDate={filters.lastDateEnd}
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
