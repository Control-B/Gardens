import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock3, ChevronRight, ArrowLeft, Lightbulb, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import { guideArticles, guidesBySlug } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { articleTrustContent } from "@/lib/trustContent";
import { useState, useEffect } from "react";

const HERO_IMAGES: Record<string, string> = {
  "Home Improvement": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85&auto=format&fit=crop",
  "Garden & Outdoor": "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=1400&q=85&auto=format&fit=crop",
  "Exterior & Curb Appeal": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=85&auto=format&fit=crop",
  "Cleaning & Home Care": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1400&q=85&auto=format&fit=crop",
  "Decor & Organization": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85&auto=format&fit=crop",
  "Outdoor Living": "https://images.unsplash.com/photo-1605276373954-0240a31ba65f?w=1400&q=85&auto=format&fit=crop",
};

const PILLAR_COLORS: Record<string, string> = {
  "Garden & Outdoor": "bg-lime-100 text-lime-800",
  "Exterior & Curb Appeal": "bg-amber-100 text-amber-800",
  "Home Improvement": "bg-emerald-100 text-emerald-800",
  "Cleaning & Home Care": "bg-sky-100 text-sky-800",
  "Decor & Organization": "bg-violet-100 text-violet-800",
  "Outdoor Living": "bg-orange-100 text-orange-800",
};

const PILLAR_ACCENT: Record<string, string> = {
  "Garden & Outdoor": "border-lime-300 bg-lime-50 text-lime-900",
  "Exterior & Curb Appeal": "border-amber-300 bg-amber-50 text-amber-900",
  "Home Improvement": "border-emerald-300 bg-emerald-50 text-emerald-900",
  "Cleaning & Home Care": "border-sky-300 bg-sky-50 text-sky-900",
  "Decor & Organization": "border-violet-300 bg-violet-50 text-violet-900",
  "Outdoor Living": "border-orange-300 bg-orange-50 text-orange-900",
};

const RELATED_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80&auto=format&fit=crop",
];

function isFaqSection(heading: string) {
  return heading.toLowerCase().includes("faq") || heading.toLowerCase().includes("frequently asked");
}

function isProTipsSection(heading: string) {
  return heading.toLowerCase().includes("pro tip") || heading.toLowerCase().includes("quick tip");
}

function isMistakesSection(heading: string) {
  return heading.toLowerCase().includes("mistake") || heading.toLowerCase().includes("avoid") || heading.toLowerCase().includes("warning");
}

function isBenefitSection(heading: string) {
  return heading.toLowerCase().includes("benefit") || heading.toLowerCase().includes("why this matter");
}

function isStarSection(heading: string) {
  return heading.toLowerCase().includes("star scenario") || heading.toLowerCase().includes("scenario:");
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-3 group"
      >
        <span className="font-semibold text-stone-800 group-hover:text-green-700 transition-colors text-sm leading-relaxed">
          {question}
        </span>
        <ChevronDown className={`h-4 w-4 text-stone-400 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-sm text-stone-600 leading-relaxed pb-4">{answer}</p>
      )}
    </div>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-stone-100">
      <div
        className="h-full bg-green-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function ArticlePage() {
  const [pathname] = useLocation();
  const slug = pathname.replace(/^\//, "");
  const article = guidesBySlug[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <div className="text-6xl mb-6">🌿</div>
            <h1 className="text-4xl font-extrabold text-stone-900 mb-4">Guide Not Found</h1>
            <p className="text-lg text-stone-500 mb-8">
              That article is not available yet. Explore the guides hub or jump into a calculator.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild className="bg-green-700 hover:bg-green-800">
                <Link href="/guides">Browse all guides</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => guidesBySlug[relatedSlug])
    .filter(Boolean)
    .slice(0, 3);
  const meta = getGuideMetadata(article);
  const heroImage = HERO_IMAGES[meta.pillar] ?? HERO_IMAGES["Home Improvement"];
  const pillarColor = PILLAR_COLORS[meta.pillar] ?? "bg-emerald-100 text-emerald-800";
  const accentColor = PILLAR_ACCENT[meta.pillar] ?? PILLAR_ACCENT["Home Improvement"];

  // Separate FAQ sections from main body
  const mainSections = article.sections.filter((s) => !isFaqSection(s.heading));
  const faqSection = article.sections.find((s) => isFaqSection(s.heading));

  // Extract the first "problem" section for the "Why This Matters" box
  const problemSection = mainSections.find((s) =>
    s.heading.toLowerCase().includes("problem") || s.heading.toLowerCase().includes("the challenge")
  );
  const bodySections = mainSections.filter((s) => s !== problemSection);

  // Parse FAQ items from Q: A: format
  const faqItems = faqSection
    ? faqSection.paragraphs.map((p) => {
        const qMatch = p.match(/^Q:\s*(.+?)\s*A:\s*(.+)$/s);
        if (qMatch) return { question: qMatch[1].trim(), answer: qMatch[2].trim() };
        return null;
      }).filter(Boolean) as { question: string; answer: string }[]
    : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <ReadingProgress />
      <Navbar />

      <main className="flex-1">
        {/* ── Article Hero ─────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <img
            src={heroImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/15" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-12 max-w-4xl">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-5 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Guides
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pillarColor}`}>
                {meta.pillar}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white border border-white/20">
                {meta.contentType}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/60">
                <Clock3 className="h-3 w-3" /> {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-2xl">
              {article.title}
            </h1>
          </div>
        </section>

        <article className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">

          {/* ── Intro Card ─────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8 mb-6">
            <p className="text-lg text-stone-600 leading-relaxed">{article.description}</p>
            {article.calculatorHref && (
              <div className="mt-5 flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                <span className="text-sm text-stone-600">Use the free calculator alongside this guide:</span>
                <Link
                  href={article.calculatorHref}
                  className="text-sm font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
                >
                  {article.calculatorLabel ?? "Open Calculator"} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* ── Why This Matters Box ─────────────────────── */}
          {problemSection && (
            <div className={`rounded-2xl border-l-4 p-6 mb-8 ${accentColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 shrink-0" />
                <p className="text-xs font-bold uppercase tracking-widest">Why This Matters</p>
              </div>
              <h2 className="font-bold text-base mb-3">{problemSection.heading.replace(/^The Problem:\s*/i, "")}</h2>
              {problemSection.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i} className="text-sm leading-relaxed opacity-90 mb-2">{p}</p>
              ))}
            </div>
          )}

          <div className="mb-8">
            <AdPlaceholder />
          </div>

          {/* ── Article Body ───────────────────────────── */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-10">
            <div className="space-y-10">
              {bodySections.map((section) => {
                const isProTips = isProTipsSection(section.heading);
                const isMistakes = isMistakesSection(section.heading);
                const isBenefit = isBenefitSection(section.heading);
                const isStar = isStarSection(section.heading);

                if (isProTips) {
                  return (
                    <section key={section.heading}>
                      <h2 className="text-xl font-extrabold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {section.heading}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.paragraphs.map((p, i) => (
                          <div key={i} className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                            <span className="text-green-600 font-bold text-lg shrink-0 mt-0.5">✓</span>
                            <p className="text-sm text-stone-700 leading-relaxed">{p}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (isMistakes) {
                  return (
                    <section key={section.heading}>
                      <h2 className="text-xl font-extrabold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        {section.heading}
                      </h2>
                      <div className="space-y-3">
                        {section.paragraphs.map((p, i) => (
                          <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                            <span className="text-amber-500 font-bold shrink-0 mt-0.5">⚠</span>
                            <p className="text-sm text-stone-700 leading-relaxed">{p}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (isBenefit) {
                  return (
                    <section key={section.heading}>
                      <div className="bg-stone-900 text-white rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-extrabold mb-4">{section.heading}</h2>
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-white/85 leading-relaxed mb-3 text-sm">{p}</p>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (isStar) {
                  return (
                    <section key={section.heading}>
                      <h2 className="text-xl font-extrabold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                        {section.heading}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.paragraphs.map((p, i) => {
                          const [label, ...rest] = p.split(":");
                          return (
                            <div key={i} className="bg-stone-50 rounded-xl p-4">
                              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">{label}</p>
                              <p className="text-sm text-stone-700 leading-relaxed">{rest.join(":").trim()}</p>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                }

                return (
                  <section key={section.heading}>
                    <h2 className="text-xl font-extrabold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-stone-700 leading-relaxed mb-4">{p}</p>
                    ))}
                  </section>
                );
              })}
            </div>
          </div>

          {/* ── FAQ Section ────────────────────────────── */}
          {faqItems.length > 0 && (
            <section className="mt-8 bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
              </div>
              <div>
                {faqItems.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} />
                ))}
              </div>
            </section>
          )}

          {/* ── CTA ────────────────────────────────────── */}
          <div className="my-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
            <div className="text-3xl mb-3">🧮</div>
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">Apply this guide to your own numbers</h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm leading-relaxed mb-6">
              The guide gives you the framework. The calculator helps you test the scenario with your own measurements and get a real estimate.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {article.calculatorHref && (
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 rounded-full px-8">
                  <Link href={article.calculatorHref}>{article.calculatorLabel ?? "Open Calculator"}</Link>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link href="/guides">Browse all guides</Link>
              </Button>
            </div>
          </div>

          <div className="my-8">
            <AdPlaceholder />
          </div>

          {/* ── Newsletter Block ────────────────────────── */}
          <div className="my-8 bg-stone-900 text-white rounded-2xl p-8 text-center">
            <div className="text-2xl mb-3">📬</div>
            <h2 className="text-xl font-extrabold mb-2">Get More Guides Like This</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Seasonal guides, money-saving tips, and practical how-tos delivered to your inbox — free, no spam.
            </p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-11 px-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-green-400"
              />
              <button className="h-11 px-6 rounded-full bg-green-600 hover:bg-green-700 font-bold text-sm transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>

          {/* ── Related Articles ───────────────────────── */}
          {relatedArticles.length > 0 && (
            <section className="mt-10">
              <div className="flex items-end justify-between gap-4 mb-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Keep Learning</p>
                  <h2 className="text-2xl font-extrabold text-stone-900">Related Guides</h2>
                </div>
                <Link href="/guides" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((related, i) => (
                  <Link key={related.slug} href={`/${related.slug}`}>
                    <div className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                      <div className="h-36 overflow-hidden">
                        <img
                          src={RELATED_IMAGE_POOL[i % RELATED_IMAGE_POOL.length]}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{related.category}</div>
                        <h3 className="font-bold text-stone-900 group-hover:text-green-700 transition-colors leading-snug flex-1">{related.title}</h3>
                        <div className="flex items-center gap-1 text-green-700 text-xs font-semibold mt-3">
                          Read guide <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <TrustSection {...articleTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
