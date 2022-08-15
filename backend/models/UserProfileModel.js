const mongoose = require('mongoose')

const userProfileSchema = mongoose.Schema({
    nama: {
        type: String,
        maxLength: 75,
        minLength: 75,
        required: true,
    },
    pics: {
        type: Buffer,
        required: true,
    },
    notif: {
        type: Number,
        required: true,
    },
    nip: {
        type: Number,
        maxLength: 9,
        minLength: 9,
        required: true,
        unique: true
    },

    NIP: {
        type: Number,
        maxLength: 18,
        minLength: 18,
        required: true,
        unique: true
    },
    jabatan: {
        type: String,
        maxLength: 255,
        required: true,
    },
    posisi: {
        type: String,
        maxLength: 255,
        required: true,
    },
    pangkat: {
        type: String,
        maxLength: 15,
        required: true,
    },
    unit: {
        type: String,
        maxLength: 50,
        required: true,
    },
    bio: {
        type: String,
        maxLength: 255,
        required: true,
    },
})

module.exports = mongoose.model('User Profile', userProfileSchema)