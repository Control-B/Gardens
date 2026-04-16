import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

interface CalculatorCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CalculatorCard({ title, description, children }: CalculatorCardProps) {
  return (
    <Card className="w-full shadow-sm border-border bg-card overflow-hidden">
      <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
        <CardTitle className="text-xl text-foreground font-bold">{title}</CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
}
