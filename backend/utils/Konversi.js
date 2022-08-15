const KonversiModel = require("../models/NilaiKonversi");

function dateRange(date1, date2) {
  let days = Math.ceil((date2 - date1) / 8.64e7);
  let month = days / 28;
  return { days, month };
}

function ketepatanWaktu(date1, date2) {
  const range = dateRange(date1, date2);
  if (range.month < 7) return "tepat";
  return "lewat";
}

async function countKonversi(req, res, next) {
  const sp2 = req?.body?.NomorSP2?.length > 0;
  const lhp = req?.body?.LHP?.length > 0;

  //   console.log(`SP2: ${sp2}, lhp: ${lhp}`);

  if (sp2 && !lhp) {
    const currentDate = new Date();
    const tanggalSP2 = new Date(req?.body?.TanggalSP2);
    const ketepatan = ketepatanWaktu(tanggalSP2, currentDate);
    const konversi = await KonversiModel.findOne({
      Kode: req?.body?.Kode,
    }).exec();
    // console.log(konversi, ketepatan);

    // console.log("konversi :", konversi[ketepatan]);
    if (!konversi) {
      req.body.NilaiKonversi = 0;
    } else {
      req.body.NilaiKonversi = konversi[ketepatan];
    }
  }

  if (sp2 && lhp) {
    const currentDate = new Date(req?.body?.TanggalLHP);
    const tanggalSP2 = new Date(req?.body?.TanggalSP2);
    const ketepatan = ketepatanWaktu(tanggalSP2, currentDate);
    const konversi = await KonversiModel.findOne({
      Kode: req?.body?.Kode,
    }).exec();
    const nilaiKonversi = konversi[ketepatan];
    // console.log('konversi :', konversi[ketepatan])
    if (!nilaiKonversi) {
      req.body.NilaiKonversi = 0;
    } else {
      req.body.NilaiKonversi = konversi[ketepatan];
    }
  }

  next();
}

module.exports = { dateRange, ketepatanWaktu, countKonversi };
