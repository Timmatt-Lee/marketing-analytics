import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';

export function registerYoutubeTools(server: Server) {
  // Store existing handlers if necessary, or just append.
  // In a real app, you might want to compose these better.

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'get_youtube_channel_stats',
          description: 'Get basic statistics (subscribers, views) for a specific YouTube channel',
          inputSchema: {
            type: 'object',
            properties: {
              channelId: {
                type: 'string',
                description: 'The ID of the YouTube channel (e.g., UC_x5XG1OV2P6uZZ5FSM9Ttw)',
              },
            },
            required: ['channelId'],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'get_youtube_channel_stats') {
      const { channelId } = request.params.arguments as { channelId: string };

      try {
        const response = await youtube.channels.list({
          part: ['statistics', 'snippet'],
          id: [channelId],
        });

        if (!response.data.items || response.data.items.length === 0) {
          return {
            content: [{ type: 'text', text: 'Channel not found.' }],
            isError: true,
          };
        }

        const channel = response.data.items[0];
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  title: channel.snippet?.title,
                  statistics: channel.statistics,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `API Error: ${errorMessage}` }],
          isError: true,
        };
      }
    }

    throw new Error(`Tool not found: ${request.params.name}`);
  });
}
