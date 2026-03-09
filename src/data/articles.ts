import { Article } from "@/types/article";

export const articles: Article[] = [
  {
    id: "arizona-records",
    headline:
      "Arizona Senate president says he complied with subpoena for 2020 election audit records",
    source: "NPR",
    date: "2026-03-09",
    topic: "Politics",
    imageUrl: "/images/arizona.jpg",
    imageAlt: "Arizona government-related image",
    fullUrl:
      "https://www.npr.org/2026/03/09/nx-s1-5742633/arizona-maricopa-county-2020-records-petersen",
    summaries: {
      "10s":
        "Arizona Senate President Warren Petersen says he complied with a federal subpoena for records tied to the 2020 Maricopa County election audit.",
      "30s":
        "Arizona Senate President Warren Petersen said he turned over records after receiving a federal grand jury subpoena related to the Republican-led review of the 2020 election in Maricopa County. The request focuses on documents tied to how the audit was conducted.",
      "60s":
        "Arizona Senate President Warren Petersen says he has complied with a federal grand jury subpoena seeking documents related to the 2020 election audit in Maricopa County. The subpoena concerns records tied to the Republican-led ballot review that followed the presidential election. Petersen said the records were turned over to the FBI, while officials have not publicly detailed the broader scope of the investigation."
    }
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
    summaries: {
      "10s":
        "Anthropic is suing the Pentagon after being labeled a supply-chain risk over limits on military AI use.",
      "30s":
        "Anthropic filed suit after the Pentagon classified the company as a supply-chain risk. The dispute centers on Anthropic’s refusal to allow unrestricted military uses of its AI systems.",
      "60s":
        "Anthropic, an AI company, has sued the U.S. government after the Pentagon labeled it a supply-chain risk, a move that could block it from certain defense work. The conflict stems from Anthropic’s safeguards limiting use of its models for autonomous weapons and domestic surveillance. The case highlights growing tension over how AI tools should be used in national security settings."
    }
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
    summaries: {
      "10s":
        "Civil liberties groups sued over policies they say allow visa denial or deportation based on political views.",
      "30s":
        "A lawsuit challenges policies that plaintiffs say let the government deny visas or deport people because of political speech or viewpoints. The case raises concerns about free expression and academic freedom.",
      "60s":
        "Civil liberties and academic groups have filed suit over policies they describe as ideological deportation. They argue the government is using immigration tools to punish or remove students and scholars based on political expression. The lawsuit claims the approach violates constitutional protections and could harm universities and international academic collaboration."
    }
  }
];