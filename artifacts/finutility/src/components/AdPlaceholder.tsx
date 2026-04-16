import { Button } from "@/components/ui/button";

export function AdPlaceholder() {
  return (
    <div className="w-full my-8 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4" data-testid="ad-placeholder">
      <div>
        <h4 className="font-bold text-[#92400E] text-lg">Your Ad Here</h4>
        <p className="text-sm text-[#B45309] mt-1">Reach thousands of engaged users daily. Advertise with us.</p>
      </div>
      <Button className="bg-[#D97706] hover:bg-[#B45309] text-white shrink-0" data-testid="btn-ad-learn-more">
        Learn More
      </Button>
    </div>
  );
}
