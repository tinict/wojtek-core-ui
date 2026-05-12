import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card ";
import DonutChart from "./donut-chart";

function StatCard({
  title,
  data,
  centerText,
  centerSub,
}: {
  title: string;
  data: { label: string; value: number; color: string }[];
  centerText: string;
  centerSub: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={data} centerText={centerText} centerSub={centerSub} />
      </CardContent>
    </Card>
  );
}

export default StatCard;
