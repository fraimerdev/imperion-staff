const fs = require('fs');
const path = require('path');

/**
 * Load all event handlers from the events directory
 * @param {Client} client - Discord.js client instance
 */
function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    
    if (!fs.existsSync(eventsPath)) {
        console.log('⚠️  Events directory not found');
        return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        console.log(`✅ Loaded event: ${event.name}`);
    }
}

module.exports = { loadEvents };
