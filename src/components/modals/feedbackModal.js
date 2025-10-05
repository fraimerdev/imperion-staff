module.exports = {
    customId: 'feedback_modal',
    async execute(interaction) {
        const name = interaction.fields.getTextInputValue('feedback_name') || 'Anonymous';
        const feedback = interaction.fields.getTextInputValue('feedback_text');

        // Here you could save the feedback to your MongoDB database
        console.log(`Feedback received from ${name}: ${feedback}`);

        await interaction.reply({
            content: `✅ Thank you for your feedback, ${name}!\n\nYour feedback:\n>>> ${feedback}`,
            ephemeral: true,
        });
    },
};
