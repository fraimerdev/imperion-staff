const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Shows an example of select menu components'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('example_select')
                    .setPlaceholder('Choose an option')
                    .addOptions([
                        {
                            label: 'Option 1',
                            description: 'This is the first option',
                            value: 'option_1',
                        },
                        {
                            label: 'Option 2',
                            description: 'This is the second option',
                            value: 'option_2',
                        },
                        {
                            label: 'Option 3',
                            description: 'This is the third option',
                            value: 'option_3',
                        },
                    ]),
            );

        await interaction.reply({
            content: 'Choose an option from the menu below:',
            components: [row],
        });
    },
};
