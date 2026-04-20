import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustSection } from "@/components/TrustSection";
import { useLocation } from "wouter";
import { legalTrustContent } from "@/lib/trustContent";

const pageContent = {
  "/about": {
    title: "About Gardens",
    intro:
      "Gardens is a home and garden education platform built to help homeowners plan better projects, avoid costly mistakes, and make confident decisions before spending money.",
    sections: [
      {
        heading: "What Gardens does",
        paragraphs: [
          "Gardens combines free cost calculators with practical, real-world guides covering home improvement, gardening, and exterior projects. The goal is to give homeowners realistic cost benchmarks and step-by-step guidance before they commit to any project or contractor.",
          "Every guide is structured around a real problem, a practical solution, and a demonstrated benefit — with a STAR scenario showing how real homeowners saved money using the same approach.",
        ],
      },
      {
        heading: "Who the site is for",
        paragraphs: [
          "Gardens is for homeowners, renters, and DIY enthusiasts who want honest cost information and practical guidance without having to sift through vague advice or aggressive upselling.",
          "It's especially useful before calling contractors — when you need a realistic benchmark to evaluate quotes and ask the right questions.",
        ],
      },
      {
        heading: "Our approach to trust",
        paragraphs: [
          "We provide plain-English guidance, privacy-first calculator behavior (all calculations run in your browser), and transparent disclaimers about where estimates may vary by region.",
          "Questions, corrections, and partnership inquiries can be sent to support@gardens.ai.",
        ],
      },
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains what information Gardens may collect, how it is used, and how the site is designed to minimize unnecessary data collection.",
    sections: [
      {
        heading: "Calculator inputs",
        paragraphs: [
          "Gardens is built to keep calculator usage privacy-first. Financial inputs entered into calculators are processed locally in your browser unless a feature clearly states otherwise. We do not ask users to create accounts in order to access core tools.",
          "Because the tools are browser-based, users should still avoid entering sensitive personal identifiers such as account numbers, social security numbers, or full legal documents into any field on the site.",
        ],
      },
      {
        heading: "Analytics, cookies, and advertising",
        paragraphs: [
          "Like many websites, Gardens may use basic analytics, log data, and cookies to understand page performance, improve usability, and support advertising or measurement tools. These may include page visits, browser type, device information, and referral data.",
          "If advertising services such as Google AdSense are used, third-party vendors may use cookies to serve ads based on prior visits to this and other sites, subject to their own policies and controls.",
        ],
      },
      {
        heading: "Contact and policy questions",
        paragraphs: [
          "If you contact us directly, we may receive the information you choose to include in that message, such as your name, email address, and the contents of your inquiry.",
          "For privacy questions or policy requests, contact support@omniweb.ai.",
        ],
      },
    ],
  },
  "/terms-of-use": {
    title: "Terms of Use",
    intro:
      "By accessing Gardens, you agree to use the site in a lawful manner and understand that the calculators and guides are provided for educational and informational purposes only.",
    sections: [
      {
        heading: "Permitted use",
        paragraphs: [
          "You may use Gardens for personal, educational, and general informational purposes. You may not misuse the site by attempting to disrupt service, scrape protected content at scale, or use the platform for fraudulent or unlawful activity.",
          "We reserve the right to limit access or modify site functionality at any time in order to protect service stability, content quality, or compliance obligations.",
        ],
      },
      {
        heading: "No professional relationship",
        paragraphs: [
          "Use of Gardens does not create a financial-advisor, tax-advisor, legal-advisor, fiduciary, lender, or client relationship. The site does not provide individualized recommendations.",
          "Users remain responsible for evaluating whether any calculation or article is appropriate for their own circumstances.",
        ],
      },
      {
        heading: "Content and limitation of liability",
        paragraphs: [
          "We strive to keep tools and articles useful, but we do not guarantee that every figure, assumption, feed, or example will always be complete, current, or error-free. Financial conditions and provider terms change over time.",
          "To the fullest extent permitted by law, Gardens is not liable for losses or decisions made in reliance on site content, calculator outputs, or third-party information displayed on the platform.",
        ],
      },
    ],
  },
  "/disclaimer": {
    title: "Disclaimer",
    intro:
      "The calculators, guides, and project cost estimates on Gardens are for educational and informational purposes only. They are not professional contractor assessments, engineering evaluations, or legal or financial advice.",
    sections: [
      {
        heading: "Educational use only",
        paragraphs: [
          "Calculator outputs are based on national average cost data and the dimensions entered by the user. They are intended to provide a realistic planning benchmark — not a guaranteed project cost or professional quote.",
          "Guides and articles are written to improve home improvement and gardening knowledge. They are not a substitute for on-site assessment by a qualified contractor, engineer, or licensed professional.",
        ],
      },
      {
        heading: "Cost estimates vary by location",
        paragraphs: [
          "Material prices and labor rates vary significantly by region, season, and market conditions. Our estimates are based on national averages and may not reflect current prices in your area.",
          "Always obtain multiple professional quotes before committing to any project over $1,000. Verify current material costs at local suppliers.",
        ],
      },
      {
        heading: "No guarantee of outcomes",
        paragraphs: [
          "Actual project costs, timelines, and results depend on factors not captured in our calculators — including site conditions, hidden structural issues, permit requirements, and contractor availability.",
          "Gardens is not liable for any project costs, damages, or decisions made in reliance on our calculator estimates or guide content.",
        ],
      },
    ],
  },
} as const;

export default function LegalPage() {
  const [location] = useLocation();
  const content = pageContent[location as keyof typeof pageContent] ?? pageContent["/disclaimer"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-8">{content.title}</h1>
          
          <div className="prose prose-blue max-w-none text-muted-foreground">
            <p><strong>Last Updated:</strong> April 20, 2026</p>
            <p>{content.intro}</p>
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-foreground">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <p>
              Questions about these policies can be sent to <a href="mailto:support@gardens.ai">support@gardens.ai</a>.
            </p>
          </div>
        </div>

        <TrustSection {...legalTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
