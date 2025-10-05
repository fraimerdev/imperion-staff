const { Events } = require('discord.js');
const config = require('../config');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Check if message starts with prefix
        if (!message.content.startsWith(config.prefix)) return;

        // Parse command and arguments
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Get command from collection
        const command = message.client.messageCommands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(`Error executing message command ${commandName}:`, error);
            
            try {
                await message.reply('There was an error while executing this command!');
            } catch (replyError) {
                console.error('Could not send error message:', replyError);
            }
        }
    },
};
