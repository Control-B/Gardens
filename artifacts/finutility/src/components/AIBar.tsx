import { useState, useEffect } from "react";
import { BarChart2, ArrowUp, AlertCircle, TrendingUp, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { getInsight, CARD_POOLS, type Insight } from "@/lib/insightEngine";

interface FinancialInsightBarProps {
  placeholder?: string;
  accentColor?: string;
}

export function AIBar({
  placeholder = "Ask anything about your finances…",
  accentColor = "text-emerald-600",
}: FinancialInsightBarProps) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  /* ── Rotating card indices ─────────────────────────────────────────── */
  const [cardIndices, setCardIndices] = useState([0, 0, 0, 0, 0, 0]);
  const [fadingCard, setFadingCard] = useState<number | null>(null);

  useEffect(() => {
    let turn = 0;
    const interval = setInterval(() => {
      const idx = turn % 6;
      turn++;
      setFadingCard(idx);
      setTimeout(() => {
        setCardIndices((prev) => {
          const next = [...prev];
          next[idx] = (prev[idx] + 1) % CARD_POOLS[idx].length;
          return next;
        });
        setFadingCard(null);
      }, 280);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  /* ── Submit ────────────────────────────────────────────────────────── */
  const handleSubmit = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setInsight(null);
    setNoMatch(false);

    setTimeout(() => {
      const intent = parseNaturalLanguage(q);
      if (intent) {
        setLoading(false);
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params)}`);
        return;
      }
      const result = getInsight(q);
      if (result) {
        setInsight(result);
      } else {
        setNoMatch(true);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <section className="bg-zinc-900 border-b border-zinc-700 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600">
            <BarChart2 className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Financial Insight</span>
          <span className="text-[10px] uppercase tracking-wider bg-violet-900/50 text-violet-300 border border-violet-700/50 px-2 py-0.5 rounded-full font-bold">
            Data-driven
          </span>
        </div>

        {/* Input */}
        <div className="relative flex items-center bg-zinc-800 border border-zinc-600 rounded-2xl px-5 py-4 gap-3 focus-within:border-zinc-400 transition-all shadow-sm mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(query)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-base outline-none"
          />
          <button
            onClick={() => handleSubmit(query)}
            disabled={!query.trim() || loading}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-30 transition-all shrink-0 shadow-sm"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {/* 2×3 rotating topic cards */}
        <div className="grid grid-cols-3 gap-3">
          {CARD_POOLS.map((pool, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(pool[cardIndices[i]])}
              className="h-20 flex items-center gap-2.5 text-left bg-zinc-800 hover:bg-violet-950/60 border border-zinc-600 hover:border-violet-500/60 rounded-xl px-4 py-3 transition-all group"
            >
              <span className="text-zinc-500 group-hover:text-violet-400 transition-colors text-lg leading-none shrink-0">+</span>
              <span
                className="text-xs text-zinc-400 group-hover:text-violet-200 transition-all leading-snug line-clamp-2"
                style={{ opacity: fadingCard === i ? 0 : 1, transition: "opacity 0.28s ease" }}
              >
                {pool[cardIndices[i]]}
              </span>
            </button>
          ))}
        </div>

        {/* Result panel */}
        {(loading || insight || noMatch) && (
          <div className="mt-4 bg-zinc-800 border border-zinc-600 rounded-2xl p-5">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
                  <span className="text-zinc-400 text-sm">Looking up insight…</span>
              </div>
            ) : noMatch ? (
              <div className="flex items-start gap-3">
                <BarChart2 className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Try a specific topic like <span className="text-violet-300 font-medium">"compound interest"</span>,{" "}
                  <span className="text-violet-300 font-medium">"mortgage rates"</span>, or{" "}
                  <span className="text-violet-300 font-medium">"crypto profit"</span> — or use our calculators directly for precise numbers.
                </p>
              </div>
            ) : insight ? (
              <div className="space-y-4">
                {/* Insight text */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600 mt-0.5">
                    <BarChart2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">{insight.text}</p>
                </div>

                {/* Data points */}
                {insight.dataPoints.length > 0 && (
                  <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {insight.dataPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <TrendingUp className="h-3 w-3 text-violet-400 shrink-0 mt-0.5" />
                        {point}
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculator CTA */}
                {insight.calculatorHref && (
                  <div className="ml-10">
                    <button
                      onClick={() => setLocation(insight.calculatorHref!)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {insight.calculatorLabel}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-3 mt-4 bg-linear-to-r from-blue-900/70 to-violet-900/70 border border-violet-700/40 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 text-violet-300 shrink-0 mt-0.5" />
          <p className="text-xs text-violet-200 leading-relaxed">
            <span className="font-semibold text-white">Not financial advice.</span> Insights are based on publicly available financial data and general principles. Figures reflect typical market conditions as of April 2026 and may change. For personalised advice, consult a qualified financial professional.
          </p>
        </div>

      </div>
    </section>
  );
}
