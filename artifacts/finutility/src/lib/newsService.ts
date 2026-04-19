/**
 * newsService.ts
 *
 * Fetches real financial news from public RSS feeds.
 *
 * Strategy (per feed):
 *   1. Return localStorage cache if < 24 h old.
 *   2. Try api.rss2json.com  — returns JSON, handles CORS.
 *   3. If that fails, try corsproxy.io  — returns raw XML, parsed with DOMParser.
 *   4. If both fail for a feed, that feed is silently skipped.
 */

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

export type NewsCategory = "markets" | "crypto" | "personal-finance";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  source: string;
  category: NewsCategory;
}

interface FeedConfig {
  url: string;
  source: string;
  category: NewsCategory;
}

/* ── Verified-working RSS feeds (Reuters dropped RSS in 2020 — excluded) ── */
const FEEDS: FeedConfig[] = [
  // Markets
  {
    url: "https://feeds.bbci.co.uk/news/business/rss.xml",
    source: "BBC Business",
    category: "markets",
  },
  {
    url: "https://www.theguardian.com/uk/business/rss",
    source: "The Guardian",
    category: "markets",
  },
  {
    url: "https://feeds.marketwatch.com/marketwatch/topstories/",
    source: "MarketWatch",
    category: "markets",
  },
  {
    url: "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    source: "CNBC",
    category: "markets",
  },
  // Crypto
  {
    url: "https://www.coindesk.com/arc/outboundfeeds/rss/",
    source: "CoinDesk",
    category: "crypto",
  },
  {
    url: "https://cointelegraph.com/rss",
    source: "CoinTelegraph",
    category: "crypto",
  },
  {
    url: "https://decrypt.co/feed",
    source: "Decrypt",
    category: "crypto",
  },
  // Personal Finance
  {
    url: "https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=rss_headline",
    source: "Investopedia",
    category: "personal-finance",
  },
  {
    url: "https://www.cnbc.com/id/10000664/device/rss/rss.html",
    source: "CNBC Personal Finance",
    category: "personal-finance",
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

function cacheKey(url: string) {
  return `finutil_news_v2_${btoa(url).slice(0, 44)}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, " ")
    .trim();
}

function safeText(el: Element | null): string {
  return el?.textContent?.trim() ?? "";
}

/** Extract the best thumbnail from an RSS <item> element. */
function extractThumbnail(item: Element): string {
  // <media:thumbnail url="…"/>
  const mediaThumbnail =
    item.querySelector("thumbnail") ??
    item.getElementsByTagNameNS("*", "thumbnail")[0];
  if (mediaThumbnail?.getAttribute("url"))
    return mediaThumbnail.getAttribute("url")!;

  // <media:content url="…" medium="image"/>
  const mediaContent = item.getElementsByTagNameNS("*", "content")[0];
  if (mediaContent?.getAttribute("url")) return mediaContent.getAttribute("url")!;

  // <enclosure url="…" type="image/…"/>
  const enclosure = item.querySelector("enclosure");
  if (enclosure?.getAttribute("type")?.startsWith("image"))
    return enclosure.getAttribute("url") ?? "";

  // og:image buried in description/content CDATA
  const desc =
    item.querySelector("description")?.textContent ??
    item.querySelector("content")?.textContent ??
    "";
  const imgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return "";
}

function parseXmlItems(xml: string, config: FeedConfig): NewsItem[] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item")).slice(0, 12);

  return items
    .map((item) => {
      const title = stripHtml(safeText(item.querySelector("title")));
      if (!title) return null;

      return {
        title,
        link:
          safeText(item.querySelector("link")) ||
          safeText(item.querySelector("guid")) ||
          "",
        pubDate: safeText(item.querySelector("pubDate")),
        description:
          stripHtml(
            safeText(item.querySelector("description")) ||
              safeText(item.querySelector("content"))
          ).slice(0, 160) + "…",
        thumbnail: extractThumbnail(item),
        source: config.source,
        category: config.category,
      } satisfies NewsItem;
    })
    .filter(Boolean) as NewsItem[];
}

/* ── Fetch strategies ───────────────────────────────────────────────────── */

/** Strategy 1: rss2json.com converts RSS → JSON and handles CORS */
async function viaRss2Json(config: FeedConfig): Promise<NewsItem[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    config.url
  )}&count=12`;

  const res = await fetch(url, { signal: AbortSignal.timeout(9000) });
  if (!res.ok) throw new Error(`rss2json HTTP ${res.status}`);

  const json = await res.json();
  if (json.status !== "ok" || !Array.isArray(json.items))
    throw new Error("rss2json returned non-ok status");

  return json.items.map(
    (item: Record<string, unknown>): NewsItem => ({
      title: stripHtml(String(item.title ?? "")),
      link: String(item.link ?? ""),
      pubDate: String(item.pubDate ?? ""),
      description:
        stripHtml(
          String(item.description ?? item.content ?? "")
        ).slice(0, 160) + "…",
      thumbnail:
        String(item.thumbnail ?? "") ||
        String(
          (item.enclosure as Record<string, string> | null)?.thumbnail ?? ""
        ),
      source: config.source,
      category: config.category,
    })
  );
}

/** Strategy 2: corsproxy.io as CORS proxy → raw XML → DOMParser */
async function viaProxy(config: FeedConfig): Promise<NewsItem[]> {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(config.url)}`;
  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(9000) });
  if (!res.ok) throw new Error(`corsproxy HTTP ${res.status}`);
  const xml = await res.text();
  return parseXmlItems(xml, config);
}

/* ── Per-feed fetch with caching ─────────────────────────────────────────── */

async function fetchFeed(config: FeedConfig): Promise<NewsItem[]> {
  const key = cacheKey(config.url);

  // Serve from cache if fresh
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { data, ts } = JSON.parse(raw) as { data: NewsItem[]; ts: number };
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch {
    /* corrupt — refetch */
  }

  // Try both strategies
  let data: NewsItem[] = [];
  try {
    data = await viaRss2Json(config);
  } catch {
    try {
      data = await viaProxy(config);
    } catch {
      return []; // both failed — skip this feed silently
    }
  }

  // Cache successful result
  if (data.length) {
    try {
      localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch {
      /* storage full — ignore */
    }
  }
  return data;
}

/* ── Public API ──────────────────────────────────────────────────────────── */

export async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const all: NewsItem[] = [];
  results.forEach((r) => {
    if (r.status === "fulfilled") all.push(...r.value);
  });
  // Deduplicate by link, sort newest-first
  const seen = new Set<string>();
  return all
    .filter((item) => {
      if (!item.link || seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    })
    .sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
}

/** Timestamp of the most recent cached fetch, or null if nothing cached yet. */
export function getCacheTimestamp(): Date | null {
  for (const feed of FEEDS) {
    try {
      const raw = localStorage.getItem(cacheKey(feed.url));
      if (raw) {
        const { ts } = JSON.parse(raw) as { ts: number };
        return new Date(ts);
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

/** Wipe all cached news so the next fetchAllNews() goes fresh to every feed. */
export function clearNewsCache() {
  FEEDS.forEach((f) => {
    try {
      localStorage.removeItem(cacheKey(f.url));
    } catch {
      /* ignore */
    }
  });
}
