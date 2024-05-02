const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const dayjs = require('dayjs')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280.
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dayjs.unix(timeStap).format('MM DD, YYY hh:mm')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = module ("Thought", thoughtSchema)

module.exports = Thought