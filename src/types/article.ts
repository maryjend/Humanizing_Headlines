export type SummaryLength = "10s" | "30s" | "60s";

export type Article = {
  id: string;
  headline: string;
  source: string;
  date: string;
  topic: string;
  imageUrl?: string;
  imageAlt?: string;
  fullUrl: string;
  summaries: {
    "10s": string;
    "30s": string;
    "60s": string;
  };
};