require('dotenv').config();

module.exports = {
    // Discord Configuration
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    
    // Message Command Configuration
    prefix: process.env.PREFIX || '!',
    
    // MongoDB Configuration
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/discord-bot',
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Bot Settings
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildMembers'
    ]
};
