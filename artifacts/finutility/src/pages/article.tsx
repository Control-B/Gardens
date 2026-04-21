import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock3 } from "lucide-react";
import { guideArticles, guidesBySlug } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { articleTrustContent } from "@/lib/trustContent";

export default function ArticlePage() {
  const [pathname] = useLocation();
  const slug = pathname.replace(/^\//, "");
  const article = guidesBySlug[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-black text-foreground">Guide not found</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              That article is not available yet. Explore the guides hub or jump into a calculator.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild>
                <Link href="/guides">Browse guides</Link>
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
          <Link href="/guides" className="text-sm text-primary hover:underline mb-8 inline-block">← Back to Guides</Link>

          <header className="mb-10 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary">
                <BookOpen className="h-4 w-4" />
                {meta.pillar}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                {meta.contentType}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                {meta.cluster}
              </span>
              <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />{article.readTime}</span>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-black text-foreground leading-tight">
              {article.title}
            </h1>

            <p className="mt-6 text-xl text-muted-foreground leading-8">
              {article.description}
            </p>
          </header>

          <div className="mb-10">
            <AdPlaceholder />
          </div>

          <div className="prose prose-blue prose-lg max-w-none text-foreground">
            {article.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="my-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <h2 className="text-2xl font-black text-slate-900">Apply this guide to your own numbers</h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              The guide gives you the framework. The calculator helps you test the scenario with your own measurements and get a real estimate.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              {article.calculatorHref && (
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <a href={article.calculatorHref}>{article.calculatorLabel ?? "Open Calculator"}</a>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild>
                <Link href="/guides">Browse all guides</Link>
              </Button>
            </div>
          </div>

          <div className="my-12">
            <AdPlaceholder />
          </div>

          <section className="mt-12">
            <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="text-2xl font-black text-foreground">Related guides</h2>
                <p className="text-muted-foreground mt-2">Keep exploring the topic with related educational articles.</p>
              </div>
              <Link href="/guides" className="text-sm font-semibold text-primary hover:underline">View all guides</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <a key={related.slug} href={`/${related.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{related.category}</div>
                  <h3 className="mt-3 text-xl font-black text-foreground">{related.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{related.description}</p>
                </a>
              ))}
            </div>
          </section>
        </article>

        <TrustSection {...articleTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
