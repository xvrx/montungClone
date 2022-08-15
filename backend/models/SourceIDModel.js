const mongoose = require('mongoose')

const sourceSchema = mongoose.Schema({
    targetCair: {
        type: Number,
        required: true
    },
    targetKonversi: {
        type: Number,
        required: true
    },
    current: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Source Model', sourceSchema)