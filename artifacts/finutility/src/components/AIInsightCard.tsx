import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIInsightCardProps {
  content: string;
}

export function AIInsightCard({ content }: AIInsightCardProps) {
  return (
    <Card className="bg-blue-50 border-blue-200 shadow-sm w-full my-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
              AI Insight
              <span className="text-[10px] uppercase tracking-wider bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-bold">Beta</span>
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
