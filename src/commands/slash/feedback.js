const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Submit feedback about the bot'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('feedback_modal')
            .setTitle('Bot Feedback');

        const nameInput = new TextInputBuilder()
            .setCustomId('feedback_name')
            .setLabel('Your Name')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your name')
            .setRequired(false);

        const feedbackInput = new TextInputBuilder()
            .setCustomId('feedback_text')
            .setLabel('Your Feedback')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Tell us what you think!')
            .setRequired(true);

        const firstRow = new ActionRowBuilder().addComponents(nameInput);
        const secondRow = new ActionRowBuilder().addComponents(feedbackInput);

        modal.addComponents(firstRow, secondRow);

        await interaction.showModal(modal);
    },
};
