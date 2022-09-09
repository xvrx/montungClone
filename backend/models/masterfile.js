const mongoose = require("mongoose");

const masterSchema = mongoose.Schema(
  {
    NPWP: {
      type: String,
      maxLength: 20,
    },
    STATUS: {
      type: String,
    },
    TANGGAL_DAFTAR: {
      type: String,
    },
    TANGGAL_LAHIR: {
      type: String,
    },
    NAMA_WP: {
      type: String,
    },
    ALAMAT: {
      type: String,
    },
    KOTA: {
      type: String,
    },
    KODE_POS: {
      type: String,
    },
    NOMOR_TELEPON: {
      type: String,
    },
    NOMOR_FAX: {
      type: String,
    },
    EMAIL: {
      type: String,
    },
    NOMOR_IDENTITAS: {
      type: String,
    },
    STATUS_WP: {
      type: String,
    },
    JENIS_WP: {
      type: String,
    },
    KODE_KLU: {
      type: String,
    },
    NAMA_KLU: {
      type: String,
    },
    TANGGAL_PKP: {
      type: String,
    },
    KELURAHAN: {
      type: String,
    },
    KECAMATAN: {
      type: String,
    },
    PROPINSI: {
      type: String,
    },
    NO_SKT: {
      type: String,
    },
    NO_PKP: {
      type: String,
    },
    NO_PKP_CABUT: {
      type: String,
    },
    TGL_PKP_CABUT: {
      type: String,
    },
    NIP_AR: {
      type: String,
    },
    NAMA_AR: {
      type: String,
    },
    KATEGORI: {
      type: String,
    },
  },
  { collection: "masterfile" }
);

// module.exports = mongoose.model('masterfile', masterSchema)
module.exports = masterSchema;
