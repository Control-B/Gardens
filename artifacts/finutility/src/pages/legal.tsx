import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-8">Legal & Policies</h1>
          
          <div className="prose prose-blue max-w-none text-muted-foreground">
            <p><strong>Last Updated:</strong> October 2023</p>
            
            <h2 className="text-foreground">Disclaimer</h2>
            <p>
              The information and calculators provided on FinUtility AI are for educational and informational purposes only. They do not constitute financial, legal, tax, or investment advice. 
            </p>
            <p>
              While we strive to ensure the accuracy of our mathematical models, FinUtility AI makes no guarantees regarding the accuracy, completeness, or applicability of any calculations to your specific situation. The financial insights provided are generated based on your calculator inputs and publicly available market data, and should not be interpreted as personalized financial advice.
            </p>
            <p>
              Always consult with a qualified financial professional, CPA, or registered investment advisor before making significant financial decisions.
            </p>

            <h2 className="text-foreground">Privacy Policy</h2>
            <p>
              FinUtility AI is designed to be privacy-first. <strong>All calculations are performed locally in your web browser.</strong> We do not collect, store, transmit, or share the financial data you enter into our calculators.
            </p>
            <p>
              We may collect standard, anonymized website analytics (such as page views and browser types) to improve our service. We may also use third-party advertising networks which may use cookies to serve relevant ads.
            </p>

            <h2 className="text-foreground">Terms of Use</h2>
            <p>
              By using FinUtility AI, you agree to use the site for personal, non-commercial purposes. You may not scrape, copy, or reverse-engineer our proprietary calculators or insight logic without explicit permission.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
