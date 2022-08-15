const mongoose = require('mongoose')

const session = mongoose.Schema({
    _id: {
        type: String
    },
    expires: {
        type: Date
    },
    session: {
        type: String
    }
}, { collection: 'sessions' })

module.exports = mongoose.model('sessions', session)