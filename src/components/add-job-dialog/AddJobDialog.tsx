import type { Job, JobStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import SkillsInput from "../skills-input/SkillsInput";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface AddJobDialogProps {
  onAddJob: (job: Omit<Job, "id">) => void;
  updateJob?: Job;
  onUpdateJob?: (job: Job) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddJobDialog = ({
  onAddJob,
  updateJob,
  onUpdateJob,
  open,
  onOpenChange,
}: AddJobDialogProps) => {
  const isUpdating = !!updateJob;
  const [modalOpen, setModalOpen] = useState(false);
  const isOpen = open ?? modalOpen;
  const setIsOpen = onOpenChange ?? setModalOpen;

  const [formData, setFormData] = useState<{
    title: string;
    company: string;
    minSalary: string;
    maxSalary: string;
    details: string;
    email: string;
    skills: string[];
    applyDate: Date | undefined;
    lastDate: Date | undefined;
    status: JobStatus;
  }>({
    title: updateJob?.title ?? "",
    company: updateJob?.company ?? "",
    minSalary: updateJob?.minSalary.toString() ?? "",
    maxSalary: updateJob?.maxSalary.toString() ?? "",
    details: updateJob?.details ?? "",
    email: updateJob?.email ?? "",
    skills: updateJob?.skills ?? [],
    applyDate: updateJob?.applyDate ? new Date(updateJob.applyDate) : undefined,
    lastDate: updateJob?.lastDate ? new Date(updateJob.lastDate) : undefined,
    status: updateJob?.status ?? "pending",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      minSalary: "",
      maxSalary: "",
      details: "",
      email: "",
      skills: [],
      applyDate: undefined,
      lastDate: undefined,
      status: "pending",
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      company: formData.company,
      minSalary: parseInt(formData.minSalary) || 0,
      maxSalary: parseInt(formData.maxSalary) || 0,
      details: formData.details,
      email: formData.email,
      skills: formData.skills,
      applyDate: formData.applyDate
        ? format(formData.applyDate, "yyyy-MM-dd")
        : "",
      lastDate: formData.lastDate
        ? format(formData.lastDate, "yyyy-MM-dd")
        : "",
      status: formData.status,
    };

    if (isUpdating && updateJob && onUpdateJob) {
      onUpdateJob({ ...jobData, id: updateJob.id });
    } else {
      onAddJob(jobData);
    }

    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isUpdating && (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Edit Job" : "Add new Job"}</DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update the job application details below"
              : "Fill in the details to add a new job application."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Senior Developer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="e.g. TechCorp Inc."
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minSalary">Min Salary (BDT)</Label>
              <Input
                id="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={(e) =>
                  setFormData({ ...formData, minSalary: e.target.value })
                }
                placeholder="e.g. 80000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary">Max Salary (BDT)</Label>
              <Input
                id="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={(e) =>
                  setFormData({ ...formData, maxSalary: e.target.value })
                }
                placeholder="e.g. 120000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Job Details</Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Describe the job role and responsibilities..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Apply Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="careers@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <SkillsInput
              skills={formData.skills}
              onSkillsChange={(skills) => setFormData({ ...formData, skills })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Apply Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.applyDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.applyDate
                      ? format(formData.applyDate, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.applyDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, applyDate: date })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Last Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.lastDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.lastDate
                      ? format(formData.lastDate, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.lastDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, lastDate: date })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: JobStatus) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isUpdating ? "Save Changes" : "Add Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
