// Require mongoose and date format
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Create Reaction (subdoc) Schema (put before so it can be accessed by the ThoughtSchema)
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // 280 character max
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
            trime: true
        },
        // Getter method to format timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Create Thought Schema
const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        // Must be between 1 and 280 characters
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Getter method to format timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // Array of nested docs created with reactionSchema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// Count how many reactions a thought gets
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema)

// Export!!
module.exports = Thought