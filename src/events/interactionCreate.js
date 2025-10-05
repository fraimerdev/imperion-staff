const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Handle slash commands
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}:`, error);
                
                const errorMessage = { 
                    content: 'There was an error while executing this command!', 
                    ephemeral: true 
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
        // Handle button interactions
        else if (interaction.isButton()) {
            const button = interaction.client.components.buttons.get(interaction.customId);

            if (!button) {
                console.error(`No button handler matching ${interaction.customId} was found.`);
                return;
            }

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(`Error executing button ${interaction.customId}:`, error);
                
                const errorMessage = { 
                    content: 'There was an error while handling this button!', 
                    ephemeral: true 
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
        // Handle select menu interactions
        else if (interaction.isStringSelectMenu()) {
            const selectMenu = interaction.client.components.selectMenus.get(interaction.customId);

            if (!selectMenu) {
                console.error(`No select menu handler matching ${interaction.customId} was found.`);
                return;
            }

            try {
                await selectMenu.execute(interaction);
            } catch (error) {
                console.error(`Error executing select menu ${interaction.customId}:`, error);
                
                const errorMessage = { 
                    content: 'There was an error while handling this select menu!', 
                    ephemeral: true 
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
        // Handle modal submissions
        else if (interaction.isModalSubmit()) {
            const modal = interaction.client.components.modals.get(interaction.customId);

            if (!modal) {
                console.error(`No modal handler matching ${interaction.customId} was found.`);
                return;
            }

            try {
                await modal.execute(interaction);
            } catch (error) {
                console.error(`Error executing modal ${interaction.customId}:`, error);
                
                const errorMessage = { 
                    content: 'There was an error while handling this modal!', 
                    ephemeral: true 
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
    },
};
