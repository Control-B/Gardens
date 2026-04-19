import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  backgroundImage?: string;
  titleGradient?: string;
}

export function ToolCard({ title, description, href, icon, backgroundImage, titleGradient = "from-fuchsia-300 via-violet-300 to-cyan-300" }: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 bg-card border-border overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative overflow-hidden h-40">
            {backgroundImage ? (
              <>
                <img
                  src={backgroundImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/45 group-hover:bg-slate-900/35 transition-colors duration-500"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent">
                <div className="absolute inset-0 bg-grid-slate-100/[0.05] bg-[size:16px_16px]"></div>
              </div>
            )}
            <div className="absolute bottom-4 left-6 flex items-center gap-3 z-10">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30">
                {icon}
              </div>
              <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r ${titleGradient} drop-shadow-md`}>{title}</h3>
            </div>
          </div>
          <div className="p-6 flex flex-col grow">
            <p className="text-base text-slate-800 grow mb-6 leading-relaxed">{description}</p>
            <div className="flex items-center text-base font-semibold text-primary mt-auto">
              Try it free <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
