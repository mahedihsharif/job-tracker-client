import type { IStatusCounts } from "@/types/job.types";
import { Briefcase, Clock, Send, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SummaryCardsProps {
  total: number;
  counts: IStatusCounts;
}

const SummaryCard = ({ total, counts }: SummaryCardsProps) => {
  // Define the card data with titles, values, icons, and colors
  const cards = [
    {
      title: "Total Jobs",
      value: total,
      icon: Briefcase,
      color: "bg-primary/10 text-primary",
      iconColor: "text-primary",
    },
    {
      title: "Applied",
      value: counts.applied ?? 0,
      icon: Send,
      color: "bg-chart-2/10 text-chart-2",
      iconColor: "text-chart-2",
    },
    {
      title: "Pending",
      value: counts.pending ?? 0,
      icon: Clock,
      color: "bg-chart-3/20 text-chart-4",
      iconColor: "text-warning",
    },
    {
      title: "Shortlisted",
      value: counts.shortlisted ?? 0,
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
