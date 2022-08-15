const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        maxLength: 15,
        minLength: 1,
        required: true,
        unique: true
    },
    key: {
        type: String,
        minLength: 1,
        maxLength: 15,
        required: true
    }
}, { collection: 'UserModel' })

module.exports = mongoose.model('UserModel', userSchema)