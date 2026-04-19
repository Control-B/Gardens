import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  valueColorClass?: string;
}

export function ResultCard({ title, value, subtitle, valueColorClass = "text-primary" }: ResultCardProps) {
  return (
    <Card className="overflow-hidden border-border/60 bg-white">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</h3>
        <div className={`text-2xl md:text-3xl font-black ${valueColorClass} whitespace-nowrap overflow-hidden text-ellipsis`}>
          {value}
        </div>
        {subtitle && <p className="text-sm text-muted-foreground mt-2 font-medium">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
