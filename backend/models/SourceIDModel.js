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
        type: Date,
        default: new Date(), 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
}, { collection: 'SourceModel' })

module.exports = mongoose.model('SourceModel', sourceSchema)