const route = require("express").Router();
const verify = require("../auth/verify");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

function formatDate(b) {
  if (b === "") return "";
  const a = new Date(b);
  const taun = a.getFullYear();
  const bulan = a.getMonth() + 1;
  const tanggal = a.getDate() + 1;
  const locale = [tanggal, bulan, taun].join("-");
  return locale;
}

function spvName(nama) {
  if (nama == "Cahyo") return "Cahyo Nurseto";
  return nama;
}

route.post("/auditplan", verify, async (req, res) => {
  if (req.body.tambahContainer.NPWP.length < 2)
    return res.status(400).json({ message: "data is invalid!" });
  // if (!(req.body)) return res.status(404).json({ message: 'usulan is not received' })
  // Load the docx file as binary content
  const auditplan = fs.readFileSync(
    path.resolve("./templates", "auditplan.docx"),
    "binary"
  );

  const zip = new PizZip(auditplan);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // const tujuan = spvName(req.body.tambahContainer.NamaSupervisor)

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  await doc.render({
    tujuan: spvName(req.body.tambahContainer.NamaSupervisor),
    tanggalND: formatDate(req.body.tambahContainer.TanggalPenunjukanSupervisor),
    namaWP: req.body.tambahContainer.NamaWP,
    NPWP: req.body.tambahContainer.NPWP,
    AlamatWP: req.body.tambahContainer.alamatWP,
    MasaPajak: req.body.tambahContainer.PeriodePajak,
    kode: req.body.tambahContainer.Kode,
    deskripsiKode: req.body.tambahContainer.DeskripsiKode,
  });

  const buf = await doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve("./templates", "auditplan_output.docx"), buf);

  var file = fs.createReadStream(`./templates/auditplan_output.docx`);
  var stat = fs.statSync(`./templates/auditplan_output.docx`);
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/docx");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.body.NamaWP}.docx`
  );
  file.pipe(res);
});

module.exports = route;
