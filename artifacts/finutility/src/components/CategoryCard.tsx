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
  backgroundImage?: string;
  titleGradient?: string;
}

export function CategoryCard({
  title,
  description,
  href,
  icon,
  colorClass = "text-primary bg-primary/10 shadow-primary/20",
  backgroundImage,
  titleGradient = "from-white to-slate-200",
}: CategoryCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-border overflow-hidden relative bg-slate-900">
        {backgroundImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover opacity-30 group-hover:opacity-45 scale-105 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30"></div>
          </div>
        )}
        <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
          <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl ${colorClass} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
          </div>
          <h3 className={`text-2xl font-black mb-3 text-transparent bg-clip-text bg-linear-to-r ${titleGradient}`}>
            {title}
          </h3>
          <p className="text-base text-slate-300 grow mb-8 leading-relaxed max-w-[250px] mx-auto">{description}</p>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 group-hover:bg-primary group-hover:border-primary transition-colors duration-300 mt-auto">
            <ArrowRight className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
