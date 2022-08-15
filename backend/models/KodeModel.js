const mongoose = require('mongoose')

const KodeSchema = mongoose.Schema({
    nomorKode: {
        type: String
    },
    jenisWP: {
        type: String
    },
    kriteria: {
        type: String
    },
    PenerbitNP2: {
        type: String
    },
    ruangLingkup: {
        type: String
    },
    deskripsiKode: {
        type: String
    }
}, { collection: 'Kode' })

module.exports = mongoose.model('Kode', KodeSchema)