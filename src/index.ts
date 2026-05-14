interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Blockchair MCP — multi-chain block explorer (free tier, keyless).
 *
 * Docs: https://blockchair.com/api/docs
 */


const BASE = 'https://api.blockchair.com';
const UA = 'pipeworx-mcp-blockchair/1.0 (+https://pipeworx.io)';

const CHAINS = new Set([
  'bitcoin',
  'bitcoin-cash',
  'litecoin',
  'bitcoin-sv',
  'dogecoin',
  'dash',
  'groestlcoin',
  'zcash',
  'ecash',
  'ethereum',
  'mixin',
  'monero',
  'stellar',
  'ripple',
  'cardano',
  'eos',
]);

const tools: McpToolExport['tools'] = [
  {
    name: 'stats',
    description: 'Chain-wide stats.',
    inputSchema: {
      type: 'object',
      properties: { chain: { type: 'string' } },
      required: ['chain'],
    },
  },
  {
    name: 'block',
    description: 'Block details by hash or height.',
    inputSchema: {
      type: 'object',
      properties: {
        chain: { type: 'string' },
        hash_or_height: { type: 'string', description: 'Block hash (hex) or numeric height as string.' },
      },
      required: ['chain', 'hash_or_height'],
    },
  },
  {
    name: 'transaction',
    description: 'Transaction details by txid.',
    inputSchema: {
      type: 'object',
      properties: {
        chain: { type: 'string' },
        txid: { type: 'string' },
      },
      required: ['chain', 'txid'],
    },
  },
  {
    name: 'address',
    description: 'Address dashboard (balance + recent txs).',
    inputSchema: {
      type: 'object',
      properties: {
        chain: { type: 'string' },
        address: { type: 'string' },
      },
      required: ['chain', 'address'],
    },
  },
  {
    name: 'node',
    description: 'Node software stats (sync status, version, latest block, …).',
    inputSchema: {
      type: 'object',
      properties: { chain: { type: 'string' } },
      required: ['chain'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const chain = chainOf(args);
  switch (name) {
    case 'stats':
      return bcGet(`/${chain}/stats`);
    case 'block':
      return bcGet(`/${chain}/dashboards/block/${encodeURIComponent(reqStr(args, 'hash_or_height', '"700000"'))}`);
    case 'transaction':
      return bcGet(`/${chain}/dashboards/transaction/${encodeURIComponent(reqStr(args, 'txid', '"<txid>"'))}`);
    case 'address':
      return bcGet(`/${chain}/dashboards/address/${encodeURIComponent(reqStr(args, 'address', '"<addr>"'))}`);
    case 'node':
      return bcGet(`/${chain}/nodes`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function chainOf(args: Record<string, unknown>): string {
  const c = reqStr(args, 'chain', '"bitcoin"').toLowerCase();
  if (!CHAINS.has(c)) throw new Error(`Unknown chain "${c}". One of: ${[...CHAINS].join(', ')}.`);
  return c;
}

async function bcGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 402) throw new Error('Blockchair: 402 — request requires paid plan.');
  if (res.status === 429) throw new Error('Blockchair: 429 rate-limit (free tier).');
  if (!res.ok) throw new Error(`Blockchair: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
