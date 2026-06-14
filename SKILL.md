---
name: 'Cross-Platform Marketing Analytics'
description: 'Fetch and analyze social media data (YouTube, Meta, Dcard, etc.) to provide professional marketing insights.'
---

# Cross-Platform Marketing Analytics Skill

## When to use this skill

Trigger this skill whenever the user asks to:

- Analyze the performance of their recent marketing campaigns, MVs, or posts.
- Compare data across multiple social platforms (YouTube, Facebook, Instagram, Threads, TikTok, Dcard, PTT, Xiaohongshu).
- Get data-driven marketing advice or next-step recommendations for their content.

## How to use this skill

1. **Identify the Target:** Ask the user for the specific post/video IDs or timeframes if they haven't provided them.
2. **Fetch Data via MCP Tools:**
   - Use `get_youtube_channel_stats` to get overall YouTube health.
   - (Future Tool) Use `get_youtube_video_analytics` to get specific MV performance.
   - (Future Tool) Use `get_meta_insights` for FB/IG metrics.
3. **Analyze and Synthesize:**
   - Do NOT just spit out raw JSON numbers.
   - Compare performance against industry benchmarks or historical data.
   - Identify which platform is performing best for this specific MV/campaign.
4. **Provide Actionable Advice:**
   - Based on the data (e.g., high view count but low engagement on YouTube vs high engagement on IG), provide concrete next steps (e.g., "Run IG story ads with a swipe-up link to the YouTube MV").
   - Act as a highly professional L5 Marketing Data Scientist.

## Required Infrastructure

This skill relies on the local `marketing-analytics-mcp` server running. Ensure the MCP server is connected before attempting to fetch data.
