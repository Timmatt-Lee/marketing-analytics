---
name: 'Deep Marketing Insights (Browser Protocol)'
description: 'Fetch and analyze deep social media marketing insights (Reach, Retention, Demographics) directly from platform UI dashboards bypassing API limits.'
---

# Deep Marketing Insights (Browser Protocol)

## When to use this skill
Trigger this skill whenever the user asks to:
- Fetch deep insights (Reach, Impressions, Retention, Demographics) for a specific marketing campaign, MV, or post across multiple platforms (YouTube, Facebook, Instagram, Threads).
- Overcome the API limitations of Meta's "Professional Mode" personal profiles by simulating browser navigation.
- Generate a professional L5 Marketing Strategy report based on real backend data.

## Execution Protocol: The 4-Agent Concurrent Swarm

To execute this skill efficiently, you **MUST** spawn four independent `browser` subagents concurrently (in a single tool call) to process the four platforms in parallel.

Use the `invoke_subagent` tool with an array of 4 subagents, assigning each one a specific platform target.

### Strict Global Rules for ALL Subagents
1.  **Relevance Filtering (CRITICAL):** The user's algorithm and view counts will be skewed if you click on the wrong content. **You MUST ONLY click on posts/reels/videos explicitly related to the requested target (e.g., the MV title, specific keywords).** Visually verify the caption/thumbnail before clicking. Do NOT click into irrelevant Reels or Shorts while browsing.
2.  **Login State:** Assume the user is already logged into the default Chrome profile for all platforms. Do not attempt to log in or use credentials.
3.  **Language Requirement:** All synthesis, analysis, insights, and final reports returned to the user **MUST ALWAYS be in Traditional Chinese (Taiwan)**. Do not output English analysis.

### Subagent 1: YouTube Analyst
- **Target URL:** `https://studio.youtube.com/`
- **Action:** Navigate to Content. Filter by the target video/MV title and related Shorts.
- **Extraction Target:** Open Analytics. Extract Traffic Sources (percentages), Audience Demographics (Age/Gender/Top Geographies), and Audience Retention metric (average view duration or % viewed at specific timestamps).

### Subagent 2: Facebook Analyst
- **Target URL:** `https://www.facebook.com/timmatt.lee`
- **Action:** Scroll the timeline carefully. Identify posts strictly matching the target keywords.
- **Extraction Target:** Click the **"View Insights" (查看洞察報告)** button below the relevant post. Extract Post Reach (觸觸及人數), Impressions (曝光次數), 3-second/1-minute views, and deep Demographics (Age/Gender) if available in the modal.

### Subagent 3: Instagram Analyst
- **Target URL:** `https://www.instagram.com/timmatt.lee/` (or Meta Business Suite if accessible).
- **Action:** Locate the specific Reels/Posts matching the target. Be highly cautious not to auto-play or click irrelevant Reels.
- **Extraction Target:** Click "View Insights". Extract Accounts Reached (Followers vs. Non-followers), Plays vs. Replays, and Interactions.

### Subagent 4: Threads Analyst
- **Target URL:** `https://www.threads.net/@timmatt.lee`
- **Action:** Scroll and locate threads containing the target keywords.
- **Extraction Target:** Extract View counts and reply/quote engagement ratios.

## Post-Extraction Synthesis
Once all 4 subagents return their data:
1. Synthesize the raw numbers into a Markdown artifact (e.g., `deep_marketing_insights.md`).
2. Provide a data-driven "L5 Professional Action Plan" focusing on funnel optimization, demographic targeting, and platform-specific behavior.
3. **Remember:** The final output MUST BE in Traditional Chinese.
