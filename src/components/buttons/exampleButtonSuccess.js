module.exports = {
    customId: 'example_button_success',
    async execute(interaction) {
        await interaction.reply({
            content: '✅ Success button clicked!',
            ephemeral: true,
        });
    },
};
