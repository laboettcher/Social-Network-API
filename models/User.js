// Require mongoose!
const { Schema, model } = require('mongoose');

// Create the User Schema (username, email, thoughts, friends)
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trime: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator(validEmail) {
                    // Validate with a regex woot woot!
                    return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                        validEmail
                    );
                },
                message: 'Please enter a valid email address.',
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

const User = model('User', UserSchema)

// Export!!
module.exports = User