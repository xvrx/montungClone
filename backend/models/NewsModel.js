const mongoose = require('mongoose')

const NewsModel = mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true,
        unique: true
    },
    hal: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    tags: {
        type: Array,
        minLength: 1,
        required: true
    },
    fileName: {
        type: String,
        minLength: 1,
        unique: true,
        required: true
    }
}, { collection: 'NewsModel' })

module.exports = mongoose.model('NewsModel', NewsModel)