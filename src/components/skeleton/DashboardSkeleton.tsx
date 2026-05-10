const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-4">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border p-4 space-y-3 bg-muted/40">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-6 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-xl p-4 bg-muted/40">
        <div className="h-4 w-40 bg-muted rounded" />

        <div className="flex gap-3">
          <div className="h-10 w-40 bg-muted rounded-md" />
          <div className="h-10 w-40 bg-muted rounded-md" />
          <div className="h-10 w-24 bg-muted rounded-md" />
        </div>
      </div>

      {/*  Table */}
      <div className="border rounded-xl p-4 space-y-4 bg-muted/40">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-full" />
          ))}
        </div>

        <hr />

        {/* Table Rows */}
        {[...Array(6)].map((_, row) => (
          <div key={row} className="grid grid-cols-5 gap-4 items-center">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-8 w-16 bg-muted rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
