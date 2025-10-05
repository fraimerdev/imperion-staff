module.exports = {
    name: 'help',
    description: 'Lists all available commands',
    aliases: ['h', 'commands'],
    async execute(message, args) {
        const commands = message.client.messageCommands;
        const commandList = [...new Set(commands.map(cmd => cmd.name))]; // Remove duplicates from aliases

        const embed = {
            color: 0x0099ff,
            title: '📚 Available Commands',
            description: `Use the prefix \`${message.client.config.prefix}\` before commands.`,
            fields: [
                {
                    name: 'Commands',
                    value: commandList.map(name => {
                        const cmd = commands.get(name);
                        return `\`${name}\`${cmd.aliases ? ` (aliases: ${cmd.aliases.map(a => `\`${a}\``).join(', ')})` : ''} - ${cmd.description || 'No description'}`;
                    }).join('\n') || 'No commands available',
                },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Message Commands',
            },
        };

        await message.reply({ embeds: [embed] });
    },
};
