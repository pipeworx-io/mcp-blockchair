# @pipeworx/blockchair

[Blockchair](https://blockchair.com) MCP — multi-chain block explorer (Bitcoin, Ethereum, Litecoin, BCH, Doge, Dash, ZEC, XRP, Stellar, Monero, Cardano, EOS, …). Free tier keyless (~30 req/min).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `stats(chain)` — chain-wide stats (height, hashrate, supply, …)
- `block(chain, hash_or_height)` — block details
- `transaction(chain, txid)` — transaction details
- `address(chain, address)` — address dashboard
- `node(chain)` — node software stats

`chain` is one of: `bitcoin`, `bitcoin-cash`, `litecoin`, `bitcoin-sv`, `dogecoin`, `dash`, `groestlcoin`, `zcash`, `ecash`, `ethereum`, `mixin`, `monero`, `stellar`, `ripple`, `cardano`, `eos`.

## Data source

`https://api.blockchair.com/<chain>/`

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
