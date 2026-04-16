import { Button } from "@/components/ui/button";

export function AdPlaceholder() {
  return (
    <div className="w-full my-8 bg-muted/30 border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 relative overflow-hidden" data-testid="ad-placeholder">
      <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-[10px] uppercase tracking-widest px-2 py-1 rounded-bl-lg font-semibold">
        Advertisement
      </div>
      <div>
        <h4 className="font-bold text-foreground text-lg">Partner With Us</h4>
        <p className="text-sm text-muted-foreground mt-1">Reach thousands of engaged users daily. Premium placement available.</p>
      </div>
      <Button variant="outline" className="shrink-0" data-testid="btn-ad-learn-more">
        Learn More
      </Button>
    </div>
  );
}
