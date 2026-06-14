import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as dotenv from 'dotenv';
import { registerYoutubeTools } from './tools/youtube.js';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

// Setup MCP Server
const server = new Server(
  {
    name: 'marketing-analytics-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Register Tools
registerYoutubeTools(server);

// Start Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Marketing Analytics MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
