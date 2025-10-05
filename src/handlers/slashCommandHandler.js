const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

/**
 * Load all slash commands from the commands/slash directory
 * @param {Client} client - Discord.js client instance
 */
function loadSlashCommands(client) {
    client.slashCommands = new Collection();
    const commandsPath = path.join(__dirname, '../commands/slash');
    
    if (!fs.existsSync(commandsPath)) {
        console.log('⚠️  Slash commands directory not found');
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.slashCommands.set(command.data.name, command);
            console.log(`✅ Loaded slash command: ${command.data.name}`);
        } else {
            console.log(`⚠️  The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

/**
 * Get all slash command data for registration
 * @param {Client} client - Discord.js client instance
 * @returns {Array} Array of command data
 */
function getSlashCommandsData(client) {
    const commands = [];
    
    if (client.slashCommands) {
        client.slashCommands.forEach(command => {
            commands.push(command.data.toJSON());
        });
    }
    
    return commands;
}

module.exports = { loadSlashCommands, getSlashCommandsData };
