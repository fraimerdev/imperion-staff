module.exports = {
    customId: 'example_button_danger',
    async execute(interaction) {
        await interaction.reply({
            content: '⚠️ Danger button clicked! Be careful!',
            ephemeral: true,
        });
    },
};
