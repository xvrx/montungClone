const mongoose = require('mongoose')

const KonversiSchema = mongoose.Schema({
    JenisPemeriksaan: {
        type: String
    },
    JenisWP: {
        type: String
    },
    Kriteria: {
        type: String
    },
    Kode: {
        type: String
    },
    Lingkup: {
        type: String
    },
    Pengampu: {
        type: String
    },
    lewat: {
        type: Number
    },
    tepat: {
        type: Number
    },
    MetodePengusulan: {
        type: String
    }
}, { collection: 'NilaiKonversi' })

module.exports = mongoose.model('NilaiKonversi', KonversiSchema)