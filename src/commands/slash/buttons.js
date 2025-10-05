const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttons')
        .setDescription('Shows an example of button components'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('example_button')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('example_button_success')
                    .setLabel('Success')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('example_button_danger')
                    .setLabel('Danger')
                    .setStyle(ButtonStyle.Danger),
            );

        await interaction.reply({
            content: 'Here are some example buttons!',
            components: [row],
        });
    },
};
