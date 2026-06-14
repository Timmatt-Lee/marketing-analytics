import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { registerYoutubeTools } from './youtube.js';

const mockChannelsList = vi.fn();

vi.mock('googleapis', () => ({
  google: {
    youtube: vi.fn().mockImplementation(() => ({
      channels: {
        list: mockChannelsList,
      },
    })),
  },
}));

describe('Youtube MCP Tools', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server({ name: 'test', version: '1.0' }, { capabilities: {} });
    vi.clearAllMocks();
  });

  it('registers tools successfully', async () => {
    let listHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === ListToolsRequestSchema) {
        listHandler = handler;
      }
    });

    registerYoutubeTools(server);
    expect(listHandler).toBeDefined();

    const handlerFn = listHandler as () => Promise<{ tools: { name: string }[] }>;
    const response = await handlerFn();
    expect(response.tools).toHaveLength(1);
    expect(response.tools[0].name).toBe('get_youtube_channel_stats');
  });

  it('executes get_youtube_channel_stats successfully', async () => {
    let callHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === CallToolRequestSchema) {
        callHandler = handler;
      }
    });

    registerYoutubeTools(server);

    mockChannelsList.mockResolvedValueOnce({
      data: {
        items: [
          {
            snippet: { title: 'My Channel' },
            statistics: { subscriberCount: '100' },
          },
        ],
      },
    });

    const handlerFn = callHandler as (req: {
      params: { name: string; arguments: { channelId: string } };
    }) => Promise<{ isError?: boolean; content: { text: string }[] }>;
    const response = await handlerFn({
      params: {
        name: 'get_youtube_channel_stats',
        arguments: { channelId: '123' },
      },
    });

    expect(response.isError).toBeFalsy();
    expect(response.content[0].text).toContain('My Channel');
  });

  it('handles missing channel', async () => {
    let callHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === CallToolRequestSchema) {
        callHandler = handler;
      }
    });

    registerYoutubeTools(server);

    mockChannelsList.mockResolvedValueOnce({
      data: { items: [] },
    });

    const handlerFn = callHandler as (req: {
      params: { name: string; arguments: { channelId: string } };
    }) => Promise<{ isError?: boolean; content: { text: string }[] }>;
    const response = await handlerFn({
      params: {
        name: 'get_youtube_channel_stats',
        arguments: { channelId: '123' },
      },
    });

    expect(response.isError).toBe(true);
    expect(response.content[0].text).toContain('not found');
  });

  it('handles API errors', async () => {
    let callHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === CallToolRequestSchema) {
        callHandler = handler;
      }
    });

    registerYoutubeTools(server);

    mockChannelsList.mockRejectedValueOnce(new Error('Rate Limit Exceeded'));

    const handlerFn = callHandler as (req: {
      params: { name: string; arguments: { channelId: string } };
    }) => Promise<{ isError?: boolean; content: { text: string }[] }>;
    const response = await handlerFn({
      params: {
        name: 'get_youtube_channel_stats',
        arguments: { channelId: '123' },
      },
    });

    expect(response.isError).toBe(true);
    expect(response.content[0].text).toContain('API Error: Rate Limit Exceeded');
  });

  it('handles string API errors', async () => {
    let callHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === CallToolRequestSchema) {
        callHandler = handler;
      }
    });

    registerYoutubeTools(server);

    mockChannelsList.mockRejectedValueOnce('String Error');

    const handlerFn = callHandler as (req: {
      params: { name: string; arguments: { channelId: string } };
    }) => Promise<{ isError?: boolean; content: { text: string }[] }>;
    const response = await handlerFn({
      params: {
        name: 'get_youtube_channel_stats',
        arguments: { channelId: '123' },
      },
    });

    expect(response.isError).toBe(true);
    expect(response.content[0].text).toContain('API Error: String Error');
  });

  it('throws error on unknown tool', async () => {
    let callHandler: unknown;
    vi.spyOn(server, 'setRequestHandler').mockImplementation((schema, handler) => {
      if (schema === CallToolRequestSchema) {
        callHandler = handler;
      }
    });

    registerYoutubeTools(server);

    const handlerFn = callHandler as (req: {
      params: { name: string; arguments: Record<string, unknown> };
    }) => Promise<unknown>;
    await expect(
      handlerFn({
        params: {
          name: 'unknown_tool',
          arguments: {},
        },
      }),
    ).rejects.toThrow('Tool not found: unknown_tool');
  });
});
