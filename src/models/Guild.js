const mongoose = require('mongoose');

/**
 * Example Guild Schema
 * Stores guild-specific settings and data
 */
const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        default: '!',
    },
    settings: {
        welcomeChannel: {
            type: String,
            default: null,
        },
        welcomeMessage: {
            type: String,
            default: 'Welcome to the server, {user}!',
        },
        logsChannel: {
            type: String,
            default: null,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt field before saving
guildSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Guild', guildSchema);
