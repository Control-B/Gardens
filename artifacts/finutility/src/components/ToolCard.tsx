import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30 bg-card">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground flex-grow mb-4">{description}</p>
          <div className="flex items-center text-sm font-semibold text-primary mt-auto">
            Use Calculator <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
