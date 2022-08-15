const mongoose = require('mongoose')

const userIDschema = mongoose.Schema({
    nama: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true,
        unique: true
    },
    pics: {
        type: String,
        minLength: 1,
        required: true
    },
    notif: {
        type: Number,
        minLength: 0,
        required: true,
    },
    nip: {
        type: String,
        minLength: 9,
        maxLength: 9,
        required: true,
        unique: true
    },
    jabatan: {
        type: String,
        minLength: 0,
        maxLength: 45,
        required: true
    },
    posisi: {
        type: String,
        minLength: 0,
        maxLength: 45,
        required: true
    },
    pangkat: {
        type: String,
        minLength: 0,
        maxLength: 45,
        required: true
    },
    unit: {
        type: String,
        minLength: 0,
        maxLength: 45,
        required: true
    },
    bio: {
        type: String,
        minLength: 0,
        maxLength: 45,
        required: true
    },
    NIP: {
        type: String,
        minLength: 15,
        maxLength: 15,
        required: true,
        unique: true
    },
    role: {
        type: String,
        minLength: 1,
        maxLength: 25,
        required: true
    }
}, { collection: 'UserIDModel' })

module.exports = mongoose.model('UserIDModel', userIDschema)

// {
//     nama: "Azrael Situmorang",
//     pics: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
//     notif: 0,
//     nip: "817931767",
//     jabatan: "pelaksana abadi",
//     posisi: "Tukang Lempar Balok",
//     pangkat: "II/a",
//     unit: "Seksi P3",
//     bio: "life is suffering, death is deliverance",
//    NIP: "200011215 156 485"
//   }

// type: String,
//         minLength: 1,
//         maxLength: 15,
//         required: true