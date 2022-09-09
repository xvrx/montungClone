const route = require("express").Router();
const Pemeriksaan = require("../models/PemeriksaanModel");
const KodeModel = require("../models/NilaiKonversi");

const verify = require("../auth/verify");
const caster = require("../utils/caster");
const konversi = require("../utils/Konversi");

// api/pemeriksaan
route.get("/", async (req, res) => {
  if (req.session.role === "admin") {
    // console.log('admin requested data,', req.session.nama, req.session)
    try {
      const adminData = await Pemeriksaan.find({});
      res.status(200).json({
        data: adminData,
        message: `Welcome ${req.session.nama}`,
        description: "data successfully fetched from the server!",
      });
    } catch (error) {
      console.log("admin retrieval error :", error)
      res.status(500).json({
        data: [],
        message: "Something went wrong!",
        description: "Cannot reach the server!",
      });
      // console.log('/pemeriksaan visited!')
    }
  } else if (req.session.role === "fppspv") {
    // console.log("spv requested data,", req.session.nama);
    const user = String(req.session.nama);
    try {
      const spvData = await Pemeriksaan.find({ NamaSupervisor: user });
      // console.log(spvData.length)
      res.status(200).json({
        data: spvData,
        message: `Welcome ${req.session.nama}`,
        description: "data successfully fetched from the server!",
      });
    } catch (error) {
      res.status(500).json({
        data: [],
        message: "Something went wrong!",
        description: "Cannot reach the server!",
      });
    }
    // console.log('failed to identify user')
    // res.status(404).send('bad Requests')
  } else if (req.session.role === "fpp") {
    // console.log("fpp requested data,", req.session.nama);
    const user = String(req.session.nama);
    try {
      const fppData = await Pemeriksaan.find({ PIC: user }).exec();
      res.status(200).json({
        data: fppData,
        message: `Welcome ${req.session.nama}`,
        description: "data successfully fetched from the server!",
      });
    } catch (error) {
      res.status(500).json({
        data: [],
        message: "Something went wrong!",
        description: "Cannot reach the server!",
      });
    }
  }
});

route.get("/kode/:nomorKode", verify, async (req, res) => {
  const kode = req.params.nomorKode;

  try {
    const KodeFound = await KodeModel.findOne({ nomorKode: kode });
    if (KodeFound !== null) {
      return res.status(200).json(KodeFound);
    } else {
      return res.status(404).json({ message: "Kode not found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Search through DB failed!" });
  }
});

route.post("/montung", verify, async (req, res) => {
  const newData = req.body;
  // console.log(newData)
  if (newData !== null) {
    const newUsulan = new Pemeriksaan(newData);
    await newUsulan.save();
    res.status(200).json({ message: "new usulan saved!", data: newUsulan });
  } else {
    return res
      .status(400)
      .json({ message: `something is wrong with the server!` });
  }
});

route.delete("/montung/:id", verify, async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  if (!id) {
    return res.status(400).json({ message: "record has no ID!" });
  } else {
    try {
      await Pemeriksaan.findByIdAndDelete(id).exec();
      return res
        .status(200)
        .json({ message: "record is successfully deleted!" });
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ message: "something is wrong!", errormsg: `${err}` });
    }
  }
});

route.patch(
  "/montung/:id",
  verify,
  konversi.countKonversi,
  async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const newVer = {
      PIC: payload?.PIC,
      ProfileWP: payload?.ProfileWP,
      Tahapan: payload?.Tahapan,
      Kendala: payload?.Kendala,
      TanggalMulaiPemeriksaan: payload?.TanggalMulaiPemeriksaan,
      NilaiKonversi: caster.numify(payload?.NilaiKonversi),
      NilaiLBterbit: caster.numify(payload?.NilaiLBterbit),
      NilaiPencairan: caster.numify(payload?.NilaiPencairan),
      NilaiProyeksiLB: caster.numify(payload?.NilaiProyeksiLB),
      NilaiProyeksiPencairan: caster.numify(payload?.NilaiProyeksiPencairan),
      NilaiProyeksiSKP: caster.numify(payload?.NilaiProyeksiSKP),
      NilaiSKPTerbit: caster.numify(payload?.NilaiSKPTerbit),
      Disetujui: caster.numify(payload?.Disetujui),
      LHP: payload?.LHP,
      TanggalLHP: payload?.TanggalLHP,
      TanggalProyeksiLHP: payload?.TanggalProyeksiLHP,
      TanggalProyeksiPencairan: payload?.TanggalProyeksiPencairan,
      TanggalProyeksiSKP: payload?.TanggalProyeksiSKP,
      PotensiDSPP: caster.numify(payload?.PotensiDSPP),
    };

    if (id && payload) {
      try {
        Pemeriksaan.findByIdAndUpdate(
          id,
          newVer,
          { new: true },
          (err, newRec) => {
            if (err) {
              res.status(500).json({ message: "server failed to update!" });
            } else {
              return res.status(200).json({
                message: "data is successfully updated!",
                nilai: newRec.NilaiKonversi,
              });
            }
          }
        );
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to update data in DB!" });
      }
    } else {
      return res.status(400).json({ message: "req _id or body not found!" });
    }
  }
);

route.patch("/pencairan/:id", verify, async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const opt = {
    NilaiPencairan: caster.numify(payload?.NilaiPencairan),
    NilaiProyeksiPencairan: caster.numify(payload?.NilaiProyeksiPencairan),
    NilaiSKPTerbit: caster.numify(payload?.NilaiSKPTerbit),
    TanggalProyeksiPencairan: payload?.TanggalProyeksiPencairan,
    tanggalPencairan: payload?.tanggalPencairan,
    sisaPencairan: caster.numify(payload?.sisaPencairan),
  };

  // console.log("cast result :", caster.numify(""));

  if (id && payload) {
    try {
      Pemeriksaan.findByIdAndUpdate(id, opt, { new: true }, (err, newRec) => {
        if (err) {
          res.status(500).json({ message: "server failed to update!" });
        } else {
          return res.status(200).json({
            message: "data is successfully updated!",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "failed to update data, server unreachable!" });
    }
  } else {
    return res.status(400).json({ message: "req _id or body not found!" });
  }
});

module.exports = route;
