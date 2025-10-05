const mongoose = require('mongoose');

/**
 * Example User Schema
 * Stores user-specific data and statistics
 */
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        default: '0',
    },
    avatar: {
        type: String,
        default: null,
    },
    stats: {
        commandsUsed: {
            type: Number,
            default: 0,
        },
        messagesCount: {
            type: Number,
            default: 0,
        },
    },
    settings: {
        language: {
            type: String,
            default: 'en',
        },
        notifications: {
            type: Boolean,
            default: true,
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
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);
