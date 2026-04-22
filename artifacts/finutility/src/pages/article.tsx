import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock3, ChevronRight, ArrowLeft } from "lucide-react";
import { guideArticles, guidesBySlug } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { articleTrustContent } from "@/lib/trustContent";

const HERO_IMAGES: Record<string, string> = {
  "Home Improvement": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85&auto=format&fit=crop",
  "Garden & Outdoor": "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=1400&q=85&auto=format&fit=crop",
  "Exterior & Curb Appeal": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=85&auto=format&fit=crop",
};

const PILLAR_COLORS: Record<string, string> = {
  "Garden & Outdoor": "bg-lime-100 text-lime-800",
  "Exterior & Curb Appeal": "bg-amber-100 text-amber-800",
  "Home Improvement": "bg-emerald-100 text-emerald-800",
};

const RELATED_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80&auto=format&fit=crop",
];

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
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
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8 mb-8">
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

          <div className="mb-10">
            <AdPlaceholder />
          </div>

          {/* ── Article Body ───────────────────────────── */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-10">
            <div className="prose prose-stone prose-lg max-w-none">
              {article.sections.map((section, sectionIdx) => (
                <section key={section.heading} className={sectionIdx > 0 ? "mt-10" : ""}>
                  <h2 className="text-2xl font-extrabold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-stone-700 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>

          {/* ── CTA ────────────────────────────────────── */}
          <div className="my-10 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
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

          <div className="my-10">
            <AdPlaceholder />
          </div>

          {/* ── Related Articles ───────────────────────── */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
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
