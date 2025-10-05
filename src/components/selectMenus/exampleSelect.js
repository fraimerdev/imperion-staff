module.exports = {
    customId: 'example_select',
    async execute(interaction) {
        const selected = interaction.values[0];
        
        await interaction.reply({
            content: `You selected: **${selected}**`,
            ephemeral: true,
        });
    },
};
