const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    short_description: {
        type: String,
        trim: true
    },
    publish_date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", postSchema)