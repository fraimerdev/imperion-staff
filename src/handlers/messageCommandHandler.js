const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

/**
 * Load all message commands from the commands/message directory
 * @param {Client} client - Discord.js client instance
 */
function loadMessageCommands(client) {
    client.messageCommands = new Collection();
    const commandsPath = path.join(__dirname, '../commands/message');
    
    if (!fs.existsSync(commandsPath)) {
        console.log('⚠️  Message commands directory not found');
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('name' in command && 'execute' in command) {
            client.messageCommands.set(command.name, command);
            
            // Also register aliases if they exist
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    client.messageCommands.set(alias, command);
                });
            }
            
            console.log(`✅ Loaded message command: ${command.name}`);
        } else {
            console.log(`⚠️  The command at ${filePath} is missing a required "name" or "execute" property.`);
        }
    }
}

module.exports = { loadMessageCommands };
