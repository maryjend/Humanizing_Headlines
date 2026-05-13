# Humanizing Headlines

Hello! Humanizing Headlines is a full-stack AI-powered news application designed to reduce news fatigue through intentional information design.

The platform reimagines how users interact with modern news by combining AI-generated summaries, customizable reading depth, and calming user experience principles.

---

# Project Purpose

Modern news platforms are often built around constant engagement, rapid scrolling, and emotionally overwhelming content delivery. Humanizing Headlines explores how artificial intelligence and intentional UX design can create a more balanced and personalized reading experience.

The goal of this project is not to replace the news, but to help users engage with information more intentionally and at their own pace.

---

# Core Features

- AI-generated article summaries
- Short / Medium / Long reading modes
- Dynamic article rendering
- Firebase authentication
- Saved article functionality
- Personalized reading preferences
- Trigger-word filtering
- Optional image visibility controls
- Responsive modern UI
- Live deployed web application

---

# How to Use Humanizing Headlines

## Browse Current Headlines

Users are presented with a live news feed powered by NewsAPI. Articles are displayed in a clean, card-based layout designed to improve readability and reduce visual overload.

## Open an Article

Selecting an article opens an individual story page where users can interact with AI-generated summaries instead of immediately consuming large blocks of text.

## Choose Summary Length

Each article can be viewed in three different summary depths:

- **Short** → quick overview for fast understanding
- **Medium** → more context and detail
- **Long** → deeper explanation and expanded information

This allows users to control how much information they consume based on time, focus, or emotional energy.

## Save Articles

Authenticated users can save articles to revisit later using Firebase-backed storage.

## Personalize the Experience

Users can customize their experience through:
- Trigger-word filtering
- Reduced visual intensity
- Optional image visibility settings
- Controlled reading depth

These features support a calmer and more intentional relationship with digital news consumption.

---

# Responsible AI Use

Humanizing Headlines uses AI as a support tool rather than a replacement for journalism.

Key responsible AI considerations include:
- AI summaries are generated from existing news content, not fabricated independently
- Original article sources remain visible to users
- Users can access the original article at any time
- The platform promotes informed reading rather than engagement optimization
- AI is used to reduce information overload, not manipulate user attention

The project emphasizes transparency, accessibility, and intentional information consumption.

---

# Technologies Used

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend / Services
- Firebase Authentication
- Firestore Database
- OpenAI API
- NewsAPI
- Vercel Deployment

---

# Technical Overview

## News Data Flow
1. News articles are fetched from NewsAPI
2. Articles are formatted and rendered dynamically
3. Users select an article
4. The OpenAI API generates layered summaries
5. Summaries are displayed in Short / Medium / Long formats
6. User preferences and saved articles are stored in Firebase

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-repo/humanizing-headlines.git