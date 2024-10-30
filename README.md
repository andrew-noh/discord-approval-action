# Discord Approval Action

GitHub Action for deployment approvals via Discord buttons.

## Usage
```yaml
jobs:
  deploy:
  runs-on: ubuntu-latest
  steps:
  name: Request Approval
  uses: your-username/discord-approval-action@v1
  with:
    discord-bot-token: ${{ secrets.DISCORD_BOT_TOKEN }}
    channel-id: ${{ secrets.DISCORD_CHANNEL_ID }}
    title: "🚀 Deployment Required"
    description: "Please approve this deployment"
    timeout: "300"
```

## Inputs
| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| discord-bot-token | Discord Bot Token | Yes | - |
| channel-id | Discord Channel ID | Yes | - |
| title | Message Title | Yes | - |
| description | Message Description | No | "" |
| timeout | Timeout in seconds | No | 300 |

## Outputs
| Output | Description |
|--------|-------------|
| approved | 'true' if approved, 'false' otherwise |

## Setup
1. Create a Discord Bot at Discord Developer Portal
2. Add bot to your server with required permissions
3. Add DISCORD_BOT_TOKEN to repository secrets
4. Add DISCORD_CHANNEL_ID to repository secrets
