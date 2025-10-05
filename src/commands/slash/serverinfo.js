const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get information about the server'),
    async execute(interaction) {
        const { guild } = interaction;
        
        const embed = {
            color: 0x0099ff,
            title: `${guild.name} Server Information`,
            thumbnail: {
                url: guild.iconURL({ dynamic: true }),
            },
            fields: [
                {
                    name: '👑 Owner',
                    value: `<@${guild.ownerId}>`,
                    inline: true,
                },
                {
                    name: '👥 Members',
                    value: `${guild.memberCount}`,
                    inline: true,
                },
                {
                    name: '📅 Created',
                    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: '🆔 Server ID',
                    value: guild.id,
                    inline: true,
                },
                {
                    name: '💬 Channels',
                    value: `${guild.channels.cache.size}`,
                    inline: true,
                },
                {
                    name: '😀 Emojis',
                    value: `${guild.emojis.cache.size}`,
                    inline: true,
                },
            ],
            timestamp: new Date().toISOString(),
        };

        await interaction.reply({ embeds: [embed] });
    },
};
