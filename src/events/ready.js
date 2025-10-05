const { Events } = require('discord.js');
const { REST, Routes } = require('discord.js');
const config = require('../config');
const { getSlashCommandsData } = require('../handlers/slashCommandHandler');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`🤖 Bot is ready! Logged in as ${client.user.tag}`);
        console.log(`📊 Serving ${client.guilds.cache.size} guild(s)`);
        
        // Register slash commands
        await registerSlashCommands(client);
    },
};

/**
 * Register slash commands with Discord API
 * @param {Client} client - Discord.js client instance
 */
async function registerSlashCommands(client) {
    try {
        const commands = getSlashCommandsData(client);
        
        if (commands.length === 0) {
            console.log('⚠️  No slash commands to register');
            return;
        }

        const rest = new REST().setToken(config.token);

        console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);

        // Register commands globally or for a specific guild (faster for testing)
        if (config.guildId && config.environment === 'development') {
            // Guild-specific registration (instant)
            const data = await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commands },
            );
            console.log(`✅ Successfully registered ${data.length} guild application (/) commands.`);
        } else {
            // Global registration (takes up to 1 hour)
            const data = await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commands },
            );
            console.log(`✅ Successfully registered ${data.length} global application (/) commands.`);
        }
    } catch (error) {
        console.error('❌ Error registering slash commands:', error);
    }
}
