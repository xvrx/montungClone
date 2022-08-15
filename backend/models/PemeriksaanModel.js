const mongoose = require('mongoose')

const PemeriksaanSchema = mongoose.Schema({
    NPWP: {
        type: String,
        required: true
    },
    NamaWP: {
        type: String,
        required: true
    },
    PeriodePajak: {
        type: String,
        required: true
    },
    Kode: {
        type: String,
        required: true
    },
    DeskripsiKode: {
        type: String,
        required: true
    },
    Kriteria: {
        type: String,
        required: true
    },
    PotensiDSPP: {
        type: Number
    },
    Jenis: {
        type: String,
        required: true
    },
    ProfileWP: {
        type: String
    },
    NomorUsulanPemeriksaan: {
        type: String
    },
    TanggalUsulan: {
        type: String
    },
    NomorInstruksiPemeriksaan: {
        type: String
    },
    TanggalInstruksi: {
        type: String
    },
    PenunjukanSupervisor: {
        type: String
    },
    TanggalPenunjukanSupervisor: {
        type: String
    },
    AuditPlan: {
        type: String
    },
    TanggalAuditPlan: {
        type: String
    },
    NamaSupervisor: {
        type: String
    },
    NamaKetuaTim: {
        type: String
    },
    NamaAnggotaTim1: {
        type: String
    },
    NamaAnggotaTim2: {
        type: String
    },
    PIC: {
        type: String
    },
    TanggalMulaiPemeriksaan: {
        type: String
    },
    NomorSP2: {
        type: String
    },
    TanggalSP2: {
        type: String
    },
    LHP: {
        type: String
    },
    TanggalLHP: {
        type: String
    },
    NilaiKonversi: {
        type: Number,
        default: 0
    },
    NilaiSKPTerbit: {
        type: Number,
        default: 0
    },
    TanggalProyeksiLHP: {
        type: String
    },
    TanggalProyeksiSKP: {
        type: String
    },
    NilaiProyeksiSKP: {
        type: Number,
        default: 0
    },
    TanggalProyeksiPencairan: {
        type: String
    },
    NilaiPencairan: {
        type: Number,
        default: 0
    },
    Disetujui: {
        type: Number
    },
    Tahapan: {
        type: Array,
        default: {
            deskripsiTahapan: "Menyampaikan Tanggal Mulai Pemeriksaan",
            namaTahapan: "Mulai Pemeriksaan",
            tanggal: ""
        }
    },
    TanggalTahapan: {
        type: String
    },
    Kendala: {
        type: String
    },
    reviewAtasan: {
        type: String
    },
    alamatWP: {
        type: String,
        required: true
    },
    KLU: {
        type: String,
        required: true
    },
    AR: {
        type: String,
        required: true
    },
    NilaiLBterbit: {
        type: Number,
        default: 0
    },
    NilaiProyeksiLB: {
        type: Number,
        default: 0
    },
    NilaiProyeksiPencairan: {
        type: Number,
        default: 0
    },
    NilaiPencairan: {
        type: Number,
        default: 0
    },
    NilaiSKPTerbit: {
        type: Number,
        default: 0
    },
    TanggalProyeksiPencairan: {
        type: String
    },
    sisaPencairan: {
        type: Number,
        default: 0
    },
    tanggalPencairan: {
        type: String
    }
}, { collection: 'PemeriksaanModel' })

module.exports = mongoose.model('PemeriksaanModel', PemeriksaanSchema)