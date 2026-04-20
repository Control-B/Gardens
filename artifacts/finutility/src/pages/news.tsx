import { useState, useEffect } from "react";
import { Newspaper, RefreshCw, ExternalLink, Clock, TrendingUp, Bitcoin, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AIBar } from "@/components/AIBar";
import {
  fetchAllNews,
  clearNewsCache,
  getCacheTimestamp,
  type NewsItem,
  type NewsCategory,
} from "@/lib/newsService";
import heroBg from "@assets/Landing42.jpeg";
import fallbackMarkets from "@assets/Landing39.jpeg";
import fallbackCrypto from "@assets/Crypto3.jpeg";
import fallbackPersonalFinance from "@assets/Landing41.jpeg";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const categoryMeta: Record<
  "all" | NewsCategory,
  { label: string; icon: React.ReactNode; accent: string; border: string }
> = {
  all: {
    label: "All News",
    icon: <Newspaper className="h-4 w-4" />,
    accent: "from-blue-400 to-violet-400",
    border: "border-blue-500/40",
  },
  markets: {
    label: "Markets",
    icon: <TrendingUp className="h-4 w-4" />,
    accent: "from-emerald-400 to-teal-400",
    border: "border-emerald-500/40",
  },
  crypto: {
    label: "Crypto",
    icon: <Bitcoin className="h-4 w-4" />,
    accent: "from-fuchsia-400 to-violet-400",
    border: "border-fuchsia-500/40",
  },
  "personal-finance": {
    label: "Personal Finance",
    icon: <Wallet className="h-4 w-4" />,
    accent: "from-amber-400 to-orange-400",
    border: "border-amber-500/40",
  },
};

const categoryFallback: Record<NewsCategory, string> = {
  markets: fallbackMarkets,
  crypto: fallbackCrypto,
  "personal-finance": fallbackPersonalFinance,
};

const sourceBadgeColors: Record<string, string> = {
  "BBC Business": "bg-red-500/20 text-red-300 border-red-500/30",
  "CNBC Markets": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "CNBC Personal Finance": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Reuters: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  CoinDesk: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  CoinTelegraph: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  Investopedia: "bg-green-500/20 text-green-300 border-green-500/30",
};

/* ─── skeleton card ────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 animate-pulse">
      <div className="h-44 bg-slate-700" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-700 rounded w-1/3" />
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 rounded w-4/5" />
        <div className="h-3 bg-slate-700 rounded w-2/5 mt-4" />
      </div>
    </div>
  );
}

/* ─── news card ────────────────────────────────────────────────────────────── */
function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const meta = categoryMeta[item.category];
  const badgeClass =
    sourceBadgeColors[item.source] ??
    "bg-slate-600/40 text-slate-300 border-slate-500/30";

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex flex-col bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      {/* Thumbnail — always shows an image; falls back to a category asset */}
      <div className="relative h-44 overflow-hidden bg-slate-700 shrink-0">
        <img
          src={item.thumbnail || categoryFallback[item.category]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = categoryFallback[item.category];
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-800/80 to-transparent" />
        {/* Category badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-slate-900/70 backdrop-blur-sm text-transparent bg-clip-text bg-linear-to-r ${meta.accent} border-white/10`}
        >
          {item.category === "markets" && (
            <TrendingUp className="h-3 w-3 text-emerald-400" />
          )}
          {item.category === "crypto" && (
            <Bitcoin className="h-3 w-3 text-fuchsia-400" />
          )}
          {item.category === "personal-finance" && (
            <Wallet className="h-3 w-3 text-amber-400" />
          )}
          <span className={`text-transparent bg-clip-text bg-linear-to-r ${meta.accent}`}>
            {meta.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Source + time */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}
          >
            {item.source}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="h-3 w-3" />
            {timeAgo(item.pubDate)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        {/* Read more */}
        <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
          Read full article <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </motion.a>
  );
}

/* ─── main page ────────────────────────────────────────────────────────────── */
export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | NewsCategory>("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (forceRefresh = false) => {
    if (forceRefresh) {
      clearNewsCache();
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(false);
    try {
      const data = await fetchAllNews();
      setNews(data);
      setLastUpdated(getCacheTimestamp());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const rawFiltered =
    activeTab === "all" ? news : news.filter((n) => n.category === activeTab);
  // Only show complete rows (multiples of 3 columns)
  const filtered = rawFiltered.slice(0, Math.floor(rawFiltered.length / 3) * 3);

  const tabs = (["all", "markets", "crypto", "personal-finance"] as const);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-br from-slate-950/92 via-blue-950/80 to-slate-900/88" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-400 to-violet-600 text-white mb-8 shadow-lg shadow-blue-500/20">
              <Newspaper className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Financial{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-violet-300">
                News
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed">
              Live headlines from the world's top financial sources — markets,
              crypto, and personal finance — updated daily.
            </p>
            {lastUpdated && (
              <p className="text-sm text-slate-500">
                Last updated:{" "}
                <span className="text-slate-400">
                  {lastUpdated.toLocaleString()}
                </span>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* AI Bar */}
      <AIBar
        placeholder="Ask anything about today's financial news or markets…"
        suggestions={[
          "What is quantitative easing?",
          "How do interest rate hikes affect crypto?",
          "What does a falling dollar mean for investments?",
          "How do I protect savings during inflation?",
        ]}
        accentColor="text-blue-400"
      />

      {/* Stats strip */}
      <section className="bg-slate-900 border-b border-slate-800 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["7", "Live Sources"],
              ["Daily", "Update Frequency"],
              ["3", "Categories"],
              ["Free", "Always"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-violet-300 mb-1">
                  {val}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="bg-slate-950 px-4 pt-10">
        <div className="container mx-auto px-4 md:px-8">
          <AdPlaceholder />
        </div>
      </div>

      {/* Category tabs + refresh */}
      <section className="bg-slate-950 py-10 flex-1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const meta = categoryMeta[tab];
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? `bg-linear-to-r ${meta.accent} text-white border-transparent shadow-lg`
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    {meta.icon}
                    {meta.label}
                    {!loading && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-slate-700"}`}
                      >
                        {tab === "all"
                          ? news.length
                          : news.filter((n) => n.category === tab).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* RSS badge + Refresh */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="6.5" cy="17.5" r="2.5" />
                  <path d="M4 4a1 1 0 0 0 0 2 14 14 0 0 1 14 14 1 1 0 0 0 2 0A16 16 0 0 0 4 4z" />
                  <path d="M4 10a1 1 0 0 0 0 2 8 8 0 0 1 8 8 1 1 0 0 0 2 0A10 10 0 0 0 4 10z" />
                </svg>
                RSS Feed
              </div>
              <button
                onClick={() => load(true)}
                disabled={refreshing || loading}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-full transition-all disabled:opacity-40"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing…" : "Refresh Now"}
              </button>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <Newspaper className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Couldn't load news
              </h3>
              <p className="text-slate-400 mb-6">
                Check your connection and try again.
              </p>
              <button
                onClick={() => load(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-500">
              No articles found for this category yet.
            </div>
          ) : (
            <>
              {Array.from(
                { length: Math.ceil(filtered.length / 12) },
                (_, chunkIdx) => {
                  const chunk = filtered.slice(chunkIdx * 12, chunkIdx * 12 + 12);
                  return (
                    <div key={chunkIdx}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chunk.map((item, i) => (
                          <NewsCard
                            key={`${item.link}-${chunkIdx}-${i}`}
                            item={item}
                            index={chunkIdx * 12 + i}
                          />
                        ))}
                      </div>
                      {/* Ad after every group of 12 cards (4 rows × 3 cols) */}
                      <div className="mt-8 mb-2">
                        <AdPlaceholder />
                      </div>
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-slate-950 px-4 pb-6">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[11px] text-slate-600 text-center italic">
            News content is sourced from third-party RSS feeds and updated once
            daily. freetawn.com does not produce, verify, or endorse any
            articles. This is not financial advice.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
