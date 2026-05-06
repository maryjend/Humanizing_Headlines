export type SummaryLength = "Short" | "Medium" | "Long";
export type Article = {
  id: string;
  headline: string;
  source: string;
  date: string;
  topic: string;
  imageUrl?: string;
  imageAlt?: string;
  fullUrl: string;

  content: string;

  summaries: {
    Short: string;
    Medium: string;
    Long: string;
  };
};