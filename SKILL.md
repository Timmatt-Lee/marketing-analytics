---
name: 'Deep Marketing Insights (Browser Protocol)'
description: 'Fetch and analyze exhaustive social media marketing insights directly from platform UI dashboards bypassing API limits, outputting pure data and strategic reports.'
---

# Deep Marketing Insights (Sequential Browser Protocol)

## When to use this skill
Trigger this skill whenever the user asks to:
- Fetch deep insights for a specific marketing campaign, MV, or post across multiple platforms (YouTube, Facebook, Instagram, Threads).
- Overcome the API limitations of Meta's "Professional Mode" personal profiles by simulating browser navigation.
- Extract EXHAUSTIVE, no-stone-left-unturned raw data.

## Execution Protocol: The Sequential Single-Agent

To execute this skill reliably without overwhelming the local Chromium instance, you **MUST** spawn exactly ONE `browser` subagent. You will provide this single agent with a strict 4-step sequential checklist to execute one by one.

Use the `invoke_subagent` tool with a single subagent. 

### Strict Global Rules for the Subagent
1.  **Exhaustive Extraction Mandate (CRITICAL):** Do NOT summarize data. You must extract literally every single numerical metric, chart data point, demographic percentage, traffic source, watch time, impressions, reach, and interaction count visible on the Insights/Analytics dashboard. If you see a number, record it.
2.  **Relevance Filtering (CRITICAL):** You MUST ONLY click on posts/reels/videos explicitly related to the requested target. Visually verify the caption/thumbnail before clicking. Do NOT click irrelevant Reels or Shorts, as this skews algorithm and view counts.
3.  **Language Requirement:** All synthesis, analysis, insights, and final reports returned to the user **MUST ALWAYS be in Traditional Chinese (Taiwan)**. 

### Sequential Navigation Path (Prompt for the Subagent)
Instruct the subagent to perform the following steps sequentially:
- **Step 1: YouTube Analytics.** Navigate to `https://studio.youtube.com/` -> Content -> Filter by target. Open Analytics. Scrape every sub-tab (Overview, Reach, Engagement, Audience). Wait for data to load before proceeding to Step 2.
- **Step 2: Facebook Insights.** Navigate to `https://www.facebook.com/timmatt.lee` -> Scroll timeline -> Find target posts -> Click **"View Insights" (查看洞察報告)**. Scrape every number in the modal.
- **Step 3: Instagram Insights.** Navigate to `https://www.instagram.com/timmatt.lee/` (or Meta Business Suite if accessible). Find target -> Click "View Insights". Scrape Reach, Plays, Replays, Profile Activity.
- **Step 4: Threads Engagement.** Navigate to `https://www.threads.net/@timmatt.lee` -> Find target -> Scrape all visible engagement numbers.
- **Step 5: LinkedIn Analytics.** Navigate to `https://www.linkedin.com/in/timmatt-lee/` -> Go to 'Activity' / 'Posts' -> Find target -> Click 'View analytics' or scrape impressions, reactions, and demographic/job title data if available.

## Post-Extraction Synthesis: The Two-Report Protocol
Once the single subagent returns the exhaustive raw data from all 4 platforms, you MUST generate exactly **TWO** distinct Markdown artifacts:

1.  `raw_insights_data_collection.md`
    - **Purpose:** 100% pure data dump.
    - **Format:** Absolutely NO AI commentary, NO strategic fluff, NO "insights" or opinions. Just raw, exhaustive metrics grouped by platform and post, presented in lists or tables.

2.  `marketing_strategy_plan.md`
    - **Purpose:** The L5 Professional Strategy based entirely on the raw data.
    - **Format:** Focus on funnel optimization, demographic targeting, and specific action items for the next campaign.
