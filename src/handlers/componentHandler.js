const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

/**
 * Load all component handlers (buttons, select menus, modals)
 * @param {Client} client - Discord.js client instance
 */
function loadComponents(client) {
    client.components = {
        buttons: new Collection(),
        selectMenus: new Collection(),
        modals: new Collection()
    };

    // Load buttons
    loadComponentType(client, 'buttons', 'button');
    
    // Load select menus
    loadComponentType(client, 'selectMenus', 'select menu');
    
    // Load modals
    loadComponentType(client, 'modals', 'modal');
}

/**
 * Load a specific type of component
 * @param {Client} client - Discord.js client instance
 * @param {string} type - Component type directory name
 * @param {string} displayName - Display name for logging
 */
function loadComponentType(client, type, displayName) {
    const componentsPath = path.join(__dirname, `../components/${type}`);
    
    if (!fs.existsSync(componentsPath)) {
        console.log(`⚠️  ${displayName} directory not found`);
        return;
    }

    const componentFiles = fs.readdirSync(componentsPath).filter(file => file.endsWith('.js'));

    for (const file of componentFiles) {
        const filePath = path.join(componentsPath, file);
        const component = require(filePath);

        if ('customId' in component && 'execute' in component) {
            client.components[type].set(component.customId, component);
            console.log(`✅ Loaded ${displayName}: ${component.customId}`);
        } else {
            console.log(`⚠️  The ${displayName} at ${filePath} is missing a required "customId" or "execute" property.`);
        }
    }
}

module.exports = { loadComponents };
