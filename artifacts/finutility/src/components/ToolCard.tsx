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
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 bg-card border-border overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="p-8 pb-6 bg-gradient-to-br from-primary/5 to-transparent relative">
            <div className="absolute inset-0 bg-grid-slate-100/[0.05] bg-[size:16px_16px]"></div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground relative z-10">{title}</h3>
          </div>
          <div className="p-8 pt-0 flex flex-col flex-grow">
            <p className="text-sm text-muted-foreground flex-grow mb-6 leading-relaxed">{description}</p>
            <div className="flex items-center text-sm font-semibold text-primary mt-auto">
              Try it free <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
