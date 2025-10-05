const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./src/config');
const { connectDatabase } = require('./src/database');
const { loadEvents } = require('./src/handlers/eventHandler');
const { loadSlashCommands } = require('./src/handlers/slashCommandHandler');
const { loadMessageCommands } = require('./src/handlers/messageCommandHandler');
const { loadComponents } = require('./src/handlers/componentHandler');

/**
 * Initialize the Discord bot
 */
async function startBot() {
    console.log('🚀 Starting Discord Bot...');

    // Validate configuration
    if (!config.token) {
        console.error('❌ Error: DISCORD_TOKEN is not set in environment variables');
        process.exit(1);
    }

    // Create Discord client
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
    });

    // Store config in client for easy access
    client.config = config;

    // Connect to MongoDB
    try {
        await connectDatabase();
    } catch (error) {
        console.error('❌ Failed to connect to database. Bot will continue without database.', error);
    }

    // Load all handlers
    console.log('\n📦 Loading handlers...');
    loadEvents(client);
    loadSlashCommands(client);
    loadMessageCommands(client);
    loadComponents(client);
    console.log('✅ All handlers loaded successfully!\n');

    // Login to Discord
    try {
        await client.login(config.token);
    } catch (error) {
        console.error('❌ Failed to login to Discord:', error);
        process.exit(1);
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

// Start the bot
startBot();
