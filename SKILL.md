---
name: 'Cross-Platform Marketing Analytics'
description: 'Fetch and analyze social media data using Open Source MCP Servers to provide professional marketing insights.'
---

# Cross-Platform Marketing Analytics Skill

## When to use this skill

Trigger this skill whenever the user asks to:

- Analyze the performance of their recent marketing campaigns, MVs, or posts.
- Compare data across multiple social platforms (YouTube, Facebook, Instagram).
- Get data-driven marketing advice or next-step recommendations for their content.

## How to use this skill

1. **Identify the Target:** Ask the user for the specific post/video IDs or timeframes if they haven't provided them.
2. **Fetch Data via Open Source MCP Tools:**
   - **YouTube:** Use the tools provided by `@pauling-ai/youtube-mcp-server` (e.g., fetching channel statistics, listing videos, getting detailed video metrics).
   - **Meta:** Use the tools provided by the configured Meta Ads/Graph MCP server.
3. **Analyze and Synthesize:**
   - Do NOT just spit out raw JSON numbers.
   - Compare performance against industry benchmarks or historical data.
   - Identify which platform is performing best for this specific MV/campaign.
4. **Provide Actionable Advice:**
   - Based on the data (e.g., high view count but low engagement on YouTube vs high engagement on IG), provide concrete next steps (e.g., "Run IG story ads with a swipe-up link to the YouTube MV").
   - Act as a highly professional L5 Marketing Data Scientist.

## Setup Instructions

To enable this skill, the user must load the `mcp.config.json` into their AI client (e.g., Antigravity or Claude Desktop). The configuration will automatically pull and run the necessary open-source MCP servers via `npx`.
