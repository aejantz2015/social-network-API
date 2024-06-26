const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
                "Please fill in a valid email address",
            ],
        },
        thougths: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User