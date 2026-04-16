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

export function CategoryCard({ title, description, href, icon, colorClass = "text-primary bg-primary/10 shadow-primary/20" }: CategoryCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-border bg-card overflow-hidden relative">
        <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
          <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl ${colorClass} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3">{title}</h3>
          <p className="text-base text-muted-foreground flex-grow mb-8 leading-relaxed max-w-[250px] mx-auto">{description}</p>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors duration-300 mt-auto">
            <ArrowRight className="h-5 w-5" />
          </div>
        </CardContent>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 rounded-full opacity-[0.03] group-hover:scale-[3] transition-transform duration-700 bg-current"></div>
      </Card>
    </Link>
  );
}
