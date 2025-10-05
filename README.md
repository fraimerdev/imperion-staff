# Discord Bot Handler

A comprehensive and reusable Discord bot handler built with discord.js v14, featuring slash commands, message commands, component handlers (buttons, select menus, modals), and MongoDB integration with Mongoose.

## Features

- ✨ **Slash Commands** - Modern application commands with full interaction support
- 💬 **Message Commands** - Traditional prefix-based commands with aliases
- 🎯 **Component Handlers** - Buttons, select menus, and modal interactions
- 🗄️ **MongoDB Integration** - Mongoose models for data persistence
- 🔄 **Hot-Reload Ready** - Modular structure for easy updates
- 🎨 **Fully Customizable** - Easy to extend and modify
- 📦 **Latest Discord.js** - Built with discord.js v14

## Project Structure

```
base-bot-handler/
├── src/
│   ├── commands/
│   │   ├── slash/          # Slash commands
│   │   │   ├── ping.js
│   │   │   ├── serverinfo.js
│   │   │   ├── buttons.js
│   │   │   ├── menu.js
│   │   │   └── feedback.js
│   │   └── message/        # Message/prefix commands
│   │       ├── ping.js
│   │       └── help.js
│   ├── components/
│   │   ├── buttons/        # Button handlers
│   │   │   ├── exampleButton.js
│   │   │   ├── exampleButtonSuccess.js
│   │   │   └── exampleButtonDanger.js
│   │   ├── selectMenus/    # Select menu handlers
│   │   │   └── exampleSelect.js
│   │   └── modals/         # Modal handlers
│   │       └── feedbackModal.js
│   ├── events/             # Discord event handlers
│   │   ├── ready.js
│   │   ├── interactionCreate.js
│   │   └── messageCreate.js
│   ├── handlers/           # Core handler logic
│   │   ├── eventHandler.js
│   │   ├── slashCommandHandler.js
│   │   ├── messageCommandHandler.js
│   │   └── componentHandler.js
│   ├── models/             # MongoDB/Mongoose models
│   │   ├── Guild.js
│   │   └── User.js
│   ├── config.js           # Bot configuration
│   └── database.js         # MongoDB connection
├── .env.example            # Environment variables template
├── .gitignore
├── index.js                # Entry point
├── package.json
└── README.md
```

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v16.9.0 or higher
- [MongoDB](https://www.mongodb.com/) (optional, but recommended)
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fraimerdev/base-bot-handler.git
   cd base-bot-handler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your bot's credentials:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here_for_testing
   PREFIX=!
   MONGODB_URI=mongodb://localhost:27017/discord-bot
   NODE_ENV=development
   ```

4. **Start the bot**
   ```bash
   npm start
   ```

## Bot Setup on Discord

### Creating a Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Copy the bot token and add it to your `.env` file
5. Enable the following **Privileged Gateway Intents**:
   - Server Members Intent
   - Message Content Intent

### Inviting the Bot

1. Go to the "OAuth2" → "URL Generator" section
2. Select the following scopes:
   - `bot`
   - `applications.commands`
3. Select the bot permissions you need (at minimum: "Send Messages", "Read Messages/View Channels")
4. Copy the generated URL and open it in your browser to invite the bot

## Usage

### Creating a Slash Command

Create a new file in `src/commands/slash/`:

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

### Creating a Message Command

Create a new file in `src/commands/message/`:

```javascript
module.exports = {
    name: 'mycommand',
    description: 'My command description',
    aliases: ['mc', 'cmd'],
    async execute(message, args) {
        await message.reply('Hello!');
    },
};
```

### Creating a Button Handler

Create a new file in `src/components/buttons/`:

```javascript
module.exports = {
    customId: 'my_button',
    async execute(interaction) {
        await interaction.reply({
            content: 'Button clicked!',
            ephemeral: true,
        });
    },
};
```

### Creating a Select Menu Handler

Create a new file in `src/components/selectMenus/`:

```javascript
module.exports = {
    customId: 'my_select_menu',
    async execute(interaction) {
        const selected = interaction.values[0];
        await interaction.reply({
            content: `You selected: ${selected}`,
            ephemeral: true,
        });
    },
};
```

### Creating a Modal Handler

Create a new file in `src/components/modals/`:

```javascript
module.exports = {
    customId: 'my_modal',
    async execute(interaction) {
        const inputValue = interaction.fields.getTextInputValue('my_input');
        await interaction.reply({
            content: `You submitted: ${inputValue}`,
            ephemeral: true,
        });
    },
};
```

### Creating a MongoDB Model

Create a new file in `src/models/`:

```javascript
const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MyModel', mySchema);
```

### Using MongoDB Models

In your commands or event handlers:

```javascript
const User = require('../../models/User');

// Create or update a user
const user = await User.findOneAndUpdate(
    { userId: interaction.user.id },
    {
        userId: interaction.user.id,
        username: interaction.user.username,
        $inc: { 'stats.commandsUsed': 1 }
    },
    { upsert: true, new: true }
);
```

## Example Commands

The bot comes with several example commands:

### Slash Commands
- `/ping` - Check bot latency
- `/serverinfo` - Get server information
- `/buttons` - Display example buttons
- `/menu` - Display an example select menu
- `/feedback` - Show a feedback modal

### Message Commands
- `!ping` - Check bot latency (aliases: `!p`)
- `!help` - List all commands (aliases: `!h`, `!commands`)

## Configuration

Edit `src/config.js` to customize:
- Bot intents
- Default prefix
- MongoDB connection settings
- Environment-specific settings

## MongoDB Integration

The bot includes MongoDB support with Mongoose. You can:
- Store guild settings
- Track user statistics
- Save custom data
- Use any Mongoose features

If MongoDB is not available, the bot will continue running without database features.

## Customization

### Adding New Event Handlers

Create a file in `src/events/`:

```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        console.log(`${member.user.tag} joined ${member.guild.name}`);
    },
};
```

### Modifying Bot Intents

Edit the intents in `src/config.js` or `index.js` to add/remove permissions:

```javascript
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    // Add more intents as needed
],
```

## Troubleshooting

### Slash commands not showing up
- Make sure `CLIENT_ID` is set in your `.env` file
- In development, set `GUILD_ID` for instant command registration
- For production, remove `GUILD_ID` (global commands take up to 1 hour to update)

### Message commands not working
- Ensure "Message Content Intent" is enabled in the Discord Developer Portal
- Check that your prefix is correct in `.env`

### Database connection errors
- Verify MongoDB is running
- Check your `MONGODB_URI` in `.env`
- The bot will continue without database if connection fails

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

ISC

## Support

For support, please open an issue on GitHub or contact the repository owner.

## Acknowledgments

- Built with [discord.js](https://discord.js.org/)
- Database powered by [Mongoose](https://mongoosejs.com/)
- Environment management with [dotenv](https://github.com/motdotla/dotenv)