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
  const tanggalSP2 = new Date(req?.body?.TanggalSP2);
  const lhp = req?.body?.LHP?.length > 0;
  const tanggualLHP =  req?.body?.TanggalLHP?.length > 0;

  const konversi = await KonversiModel.findOne({
    Kode: req?.body?.Kode
  }).exec();
  //   console.log(`SP2: ${sp2}, lhp: ${lhp}`);

  if (konversi !== null && sp2 && (!lhp || !tanggualLHP)) {
    const currentDate = new Date();
    
    const ketepatan_sp2 = ketepatanWaktu(tanggalSP2, currentDate);
    req.body.NilaiKonversi = konversi[ketepatan_sp2]

    console.log(`konversi (${ketepatan_sp2}):`, konversi[ketepatan_sp2])
    
    } else if (sp2 && lhp && tanggualLHP) {
      const ketepatan_lhp = ketepatanWaktu(tanggalSP2, new Date(tanggualLHP));
      req.body.NilaiKonversi = konversi[ketepatan_lhp];
      console.log(`konversi (${ketepatan_lhp}):`, konversi[ketepatan_lhp])
    } else {
    req.body.NilaiKonversi = 0;
    console.log(`konversi (error):`, 0)
  }
  
  
  next();
}

module.exports = { dateRange, ketepatanWaktu, countKonversi };
