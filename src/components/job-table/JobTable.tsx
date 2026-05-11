import type { Job, JobStatus } from "@/lib/types";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddJobDialog from "../add-job-dialog/AddJobDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface JobTableProps {
  jobs: Job[];
  onUpdateJob: (job: Job) => void;
  onDeleteJob: (id: string) => void;
}

const statusStyles: Record<JobStatus, string> = {
  pending: "bg-warning/20 text-warning-foreground border-warning/30",
  applied: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  shortlisted: "bg-success/10 text-success border-success/30",
};

const statusLabels: Record<JobStatus, string> = {
  pending: "Pending",
  applied: "Applied",
  shortlisted: "Shortlisted",
};

const formatSalary = (min: number, max: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)}-${formatter.format(max)}`;
};
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return format(new Date(dateString), "MMM dd, yyyy");
};
const JobTable = ({ jobs, onUpdateJob, onDeleteJob }: JobTableProps) => {
  const [updatingJob, setUpdatingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  const handleUpdate = (job: Job) => {
    setUpdatingJob(job);
  };

  const handleDelete = (job: Job) => {
    setDeletingJob(job);
  };

  const confirmDelete = () => {
    if (deletingJob) {
      onDeleteJob(deletingJob.id);
      setDeletingJob(null);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm">
        <div className="mb-4 rounded-full bg-muted p-4">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          No jobs found
        </h3>
        <p className="text-sm text-muted-foreground">
          Add your first job application to get started.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="rounded-xl bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Job Title</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Salary</TableHead>
              <TableHead className="font-semibold">Apply Date</TableHead>
              <TableHead className="font-semibold">Last Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {job.company}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatSalary(job.minSalary, job.maxSalary)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(job.applyDate)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(job.lastDate)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[job.status]}>
                    {statusLabels[job.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="hidden items-center justify-end gap-2 sm:flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleUpdate(job)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(job)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                  <div className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Edit Dialog */}
      {updatingJob && (
        <AddJobDialog
          open={!!updatingJob}
          onOpenChange={(open) => !open && setUpdatingJob(null)}
          updateJob={updatingJob}
          onUpdateJob={(job) => {
            onUpdateJob(job);
            setUpdatingJob(null);
          }}
          onAddJob={() => {}}
        />
      )}
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingJob}
        onOpenChange={(open) => !open && setDeletingJob(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the application
              <strong> {deletingJob?.title} at</strong>
              <strong>{deletingJob?.company}</strong>? This action can't be
              undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobTable;
