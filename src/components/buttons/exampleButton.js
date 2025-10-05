module.exports = {
    customId: 'example_button',
    async execute(interaction) {
        await interaction.reply({
            content: '✅ You clicked the primary button!',
            ephemeral: true,
        });
    },
};
