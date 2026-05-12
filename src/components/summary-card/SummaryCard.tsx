import type { Job } from "@/lib/types";
import { Briefcase, Clock, Send, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SummaryCardsProps {
  jobs: Job[];
}

const SummaryCard = ({ jobs }: SummaryCardsProps) => {
  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter((job) => job.status === "applied").length;
  const pendingJobs = jobs.filter((job) => job.status === "pending").length;
  const shortlistedJobs = jobs.filter(
    (job) => job.status === "shortlisted",
  ).length;

  const cards = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "bg-primary/10 text-primary",
      iconColor: "text-primary",
    },
    {
      title: "Applied",
      value: appliedJobs,
      icon: Send,
      color: "bg-chart-2/10 text-chart-2",
      iconColor: "text-chart-2",
    },
    {
      title: "Pending",
      value: pendingJobs,
      icon: Clock,
      color: "bg-chart-3/20 text-chart-4",
      iconColor: "text-warning",
    },
    {
      title: "Shortlisted",
      value: shortlistedJobs,
      icon: Star,
      color: "bg-chart-2/10 text-chart-2",
      iconColor: "text-success",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${card.color}`}>
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCard;
