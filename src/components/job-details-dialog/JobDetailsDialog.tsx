import type { IJob } from "@/types/job.types";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface JobDetailsProps {
  job: IJob | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const JobDetailsDialog = ({ job, open, setOpen }: JobDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {job?.job_title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{job?.company_name}</p>
        </DialogHeader>

        {/* Salary */}
        <div>
          <h4 className="font-semibold mb-1">Salary</h4>
          <p>
            {job?.salary
              ? `${job.salary.min ?? "?"} - ${job.salary.max ?? "?"} ${
                  job.salary.currency ?? ""
                }`
              : "Not specified"}
          </p>
        </div>

        {/* Job Details */}
        <div>
          <h4 className="font-semibold mb-1">Details</h4>
          <p className="text-sm text-muted-foreground">{job?.job_details}</p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Apply Date</h4>
            <p>{job?.apply_date?.split("T")[0]}</p>
          </div>
          <div>
            <h4 className="font-semibold">Last Date</h4>
            <p>{job?.last_date?.split("T")[0]}</p>
          </div>
        </div>

        {/* Email */}
        <div>
          <h4 className="font-semibold">Apply Email</h4>
          <p className="text-primary">{job?.apply_email}</p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job?.required_skills.map((skill, i) => (
              <Badge key={i} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-semibold mb-1">Status</h4>
          <Badge className="px-4 py-1">
            {job?.status
              ? job.status.charAt(0).toUpperCase() + job.status.slice(1)
              : "Not specified"}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
