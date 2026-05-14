# mcp-blockchair

Blockchair multi-chain block explorer (BTC, ETH, LTC, DOGE, XMR, +12 more)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `stats` | Chain-wide stats. |
| `block` | Block details by hash or height. |
| `transaction` | Transaction details by txid. |
| `address` | Address dashboard (balance + recent txs). |
| `node` | Node software stats (sync status, version, latest block, …). |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "blockchair": {
      "url": "https://gateway.pipeworx.io/blockchair/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Blockchair data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
