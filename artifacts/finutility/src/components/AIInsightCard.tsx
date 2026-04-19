import { BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIInsightCardProps {
  content: string;
}

export function AIInsightCard({ content }: AIInsightCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-700 shadow-sm w-full my-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-white">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              Financial Insight
              <span className="text-[10px] uppercase tracking-wider bg-violet-900/50 text-violet-300 border border-violet-700/50 px-2 py-0.5 rounded-full font-bold">Data-driven</span>
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
