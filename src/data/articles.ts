import { Article } from "@/types/article";

export const articles: Article[] = [
  {
    id: "1",
    headline: "Arizona Senate President complies with subpoena",
    source: "NPR",
    date: "2026-01-01",
    topic: "Politics",
    fullUrl: "https://...",
    content:
      "Arizona Senate President Warren Petersen confirmed he complied with a federal subpoena related to the 2020 election audit in Maricopa County. The subpoena is part of ongoing federal investigations into election processes and record handling.",
    summaries: {
      Short: "",
      Medium: "",
      Long: "",
    },
  },

  {
    id: "anthropic-pentagon",
    headline:
      "AI company Anthropic sues the Pentagon after being labeled a supply-chain risk",
    source: "NPR",
    date: "2026-03-09",
    topic: "Technology",
    imageUrl: "/images/anthropic.jpg",
    imageAlt: "Technology-related image",
    fullUrl:
      "https://www.npr.org/2026/03/09/nx-s1-5742548/anthropic-pentagon-lawsuit-amodai-hegseth",
    content:
      "Anthropic has sued the Pentagon after being labeled a supply-chain risk. The designation could limit the company's ability to work with the U.S. government. The dispute stems from Anthropic’s policies restricting certain military applications of its AI systems.",
    summaries: {
      Short: "",
      Medium: "",
      Long: "",
    },
  },

  {
    id: "visas-deportation-lawsuit",
    headline:
      "Civil liberties groups sue over alleged censorship tied to visas and deportation policy",
    source: "NPR",
    date: "2026-03-09",
    topic: "Immigration",
    imageUrl: "/images/visas.jpg",
    imageAlt: "University or immigration-related image",
    fullUrl:
      "https://www.npr.org/2026/03/09/nx-s1-5741213/trump-censorship-visas-deportation-lawsuit",
    content:
      "Civil liberties groups have filed a lawsuit challenging policies they say allow visa denial or deportation based on political views. The case raises concerns about free expression, academic freedom, and government overreach in immigration enforcement.",
    summaries: {
      Short: "",
      Medium: "",
      Long: "",
    },
  },
];