# Quick Start Guide

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Bot
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your credentials
nano .env  # or use your preferred editor
```

### 3. Get Bot Token
1. Go to https://discord.com/developers/applications
2. Create a new application or select existing one
3. Go to "Bot" section
4. Copy the token and paste it in your `.env` file as `DISCORD_TOKEN`
5. Copy your Application ID from "General Information" and paste it as `CLIENT_ID`

### 4. Enable Intents
In the Discord Developer Portal, under Bot settings, enable:
- ✅ Server Members Intent
- ✅ Message Content Intent

### 5. Invite Bot to Server
1. Go to OAuth2 → URL Generator
2. Select scopes: `bot` and `applications.commands`
3. Select permissions (minimum: Send Messages, View Channels)
4. Copy the URL and open it to invite your bot

### 6. Start Bot
```bash
npm start
```

## Testing Commands

Once the bot is running:

### Slash Commands (/)
- `/ping` - Check bot latency
- `/serverinfo` - Get server information
- `/buttons` - Test button components
- `/menu` - Test select menu
- `/feedback` - Test modal form

### Message Commands (prefix: !)
- `!ping` - Check bot latency
- `!help` - List all message commands

## MongoDB Setup (Optional)

If you want to use the database features:

### Local MongoDB
```bash
# Install MongoDB
# Visit: https://www.mongodb.com/try/download/community

# Start MongoDB
mongod

# Update .env with connection string
MONGODB_URI=mongodb://localhost:27017/discord-bot
```

### MongoDB Atlas (Cloud)
```bash
# 1. Create free cluster at https://www.mongodb.com/cloud/atlas
# 2. Get connection string
# 3. Update .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/discord-bot
```

## Project Structure Quick Reference

```
Commands:
├── src/commands/slash/     → Add new slash commands here
└── src/commands/message/   → Add new message commands here

Components:
├── src/components/buttons/      → Button click handlers
├── src/components/selectMenus/  → Select menu handlers
└── src/components/modals/       → Modal submit handlers

Events:
└── src/events/             → Discord event handlers

Database:
└── src/models/             → Mongoose schemas
```

## Adding a New Slash Command

1. Create file in `src/commands/slash/mycommand.js`
2. Use this template:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mycommand')
        .setDescription('My command description'),
    async execute(interaction) {
        await interaction.reply('Hello!');
    },
};
```

3. Restart the bot - command will auto-register!

## Common Issues

**Commands not showing up?**
- Check CLIENT_ID is set
- For testing, set GUILD_ID for instant registration
- Wait up to 1 hour for global commands

**Message commands not working?**
- Enable Message Content Intent in Developer Portal
- Check PREFIX in .env

**Database errors?**
- Bot will run without database
- Check MongoDB is running
- Verify MONGODB_URI format

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Explore example commands in `src/commands/`
3. Customize `src/config.js` for your needs
4. Add your own commands and features!

## Support

- 📖 Documentation: See README.md
- 🐛 Issues: Open a GitHub issue
- 💡 discord.js Docs: https://discord.js.org/

---

Happy coding! 🚀
