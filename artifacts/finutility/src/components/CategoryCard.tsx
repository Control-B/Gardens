import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export function CategoryCard({ title, description, href, icon, colorClass = "text-primary bg-primary/10" }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center text-center h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
          <p className="text-base text-muted-foreground flex-grow mb-6">{description}</p>
          <div className="flex items-center text-sm font-bold text-primary mt-auto">
            Explore {title} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
