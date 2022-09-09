import React from "react";
import "../styles/tunggakan.css";
import { useContext } from "react";
import { MontungContext } from "../Context/MontungContext";
import { TunggakanContext } from "../Context/TunggakanContext";
import { FaAngleDoubleDown, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavContext } from "../Context/NavContext";
import { ModalContext } from "../Context/modalContext/ModalContext";
import { TambahContext } from "../Context/modalContext/TambahContext";

import axios from 'axios'
// sometimes { withCredentials : true } doesnt work for no fucking reason, so use the following instead
axios.defaults.withCredentials = true

const Tunggakan = () => {
  const {
    montung,
    tunggakanFiltered,
    thousandSeparator,
    dateRange,
    formatDate,
    serverOrigin,
    loading
  } = useContext(MontungContext);
  const { nav, previousNav } = useContext(NavContext);
  const { 
    setTunggakanModal,
    setnotifModal,
    setnotifModalTitle,
    setnotifModalMessage,
    setnotifModalButton, } = useContext(ModalContext);
  const { tunggakanContainer, setTunggakanContainer } =
    useContext(TambahContext);

  function addSearchFilter(e) {
    console.log(e.target.value);
  }

  function editTunggakan(tunggakan) {
    console.log(tunggakan);
    setTunggakanContainer(tunggakan);
    setTunggakanModal(true);
  }

  function jatuhTempo(tunggakan) {
    const selisih = dateRange(new Date(tunggakan.TanggalSP2), new Date());
    const sisaBulan = 7 - selisih[1];
    const edges = sisaBulan - Math.floor(sisaBulan);
    const remainDays = Math.round(edges * 30);
    if (sisaBulan > 1)
      return [
        `sisa ${Math.floor(sisaBulan) - 1} bulan, ${remainDays} hari`,
        sisaBulan,
      ];
    if (sisaBulan < 1 && sisaBulan > 0)
      return [
        `sisa ${remainDays} hari`,
        sisaBulan,
      ];
    return [
      `lewat waktu ${Math.ceil(sisaBulan) * -1} bulan, ${remainDays} hari`,
      sisaBulan,
    ];
  }

  // {
  //   method: "post",
  //   data: someJsonData,
  //   withCredentials: true
  // }

  function downloadTunggakan() {
    loading(true)
    console.log(document.cookie)
    axios.post(serverOrigin + 'xlsx/tunggakan', tunggakanFiltered, {
      withCredentials: true,
      responseType: 'blob'
    })
      .then((res) => {
        // console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `tunggakan.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        loading(false)
      }).catch(async (err) => {
        // console.log("failed to download file :",err.response)
        const error = await (err?.response?.data)?.text()
        if (error) {
          const message = await error
          // console.log(JSON.parse(message).message)
          if (JSON.parse(message).login === false) return window.location.reload()
          loading(false)
          if (JSON.parse(message).message === "No records found!") {
            setnotifModalTitle('file tidak ditemukan!')
            setnotifModalMessage(`tidak terdapat data tunggakan pemeriksaan pada database.`)
            setnotifModalButton(false)
            setnotifModal(true)
          }
          
        }
        loading(false)
      })
  }

  const {
    pemsusFilter,
    setpemsusFilter,
    rutinFilter,
    setrutinFilter,
    rutinLBFilter,
    setrutinLBFilter,
    tujuanLainFilter,
    settujuanLainFilter,
  } = useContext(TunggakanContext);

  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      className="tunggakan-container"
      initial={{ x: previousNav > 3 || nav > 3 ? -600 : 600, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
    >
      <div className="tunggakan-sub-container">
        <div className="tunggakan-opts-container">
          <label
            htmlFor="search-tunggakan"
            className="tunggakan-search-container"
          >
            <input
              onBlur={addSearchFilter}
              spellCheck="false"
              type="text"
              placeholder="Cari Tunggakan"
              id="search-tunggakan"
              required
            />
            <div id="search-line-2"></div>
            <div className="search-logo">
              <FaSearch />
            </div>
          </label>
          <div className="tunggakan-criteria-container">
            <label
              style={{ color: pemsusFilter ? "#fdbc2c" : "rgb(136, 136, 136)" }}
              className="criteria-class"
              htmlFor="criteria-pemsus"
            >
              <input
                checked={pemsusFilter}
                onChange={(e) => setpemsusFilter(e.target.checked)}
                type="checkbox"
                id="criteria-pemsus"
              />
              Pemsus
            </label>
            <label
              style={{ color: rutinFilter ? "#fdbc2c" : "rgb(136, 136, 136)" }}
              className="criteria-class"
              htmlFor="criteria-rutin"
            >
              {" "}
              <input
                checked={rutinFilter}
                onChange={(e) => setrutinFilter(e.target.checked)}
                type="checkbox"
                id="criteria-rutin"
              />
              Rutin
            </label>
            <label
              style={{
                color: rutinLBFilter ? "#fdbc2c" : "rgb(136, 136, 136)",
              }}
              className="criteria-class"
              htmlFor="criteria-rutinLB"
            >
              <input
                checked={rutinLBFilter}
                onChange={(e) => setrutinLBFilter(e.target.checked)}
                type="checkbox"
                id="criteria-rutinLB"
              />
              Rutin LB
            </label>
            <label
              style={{
                color: tujuanLainFilter ? "#fdbc2c" : "rgb(136, 136, 136)",
              }}
              className="criteria-class"
              htmlFor="criteria-tujuanLain"
            >
              <input
                checked={tujuanLainFilter}
                onChange={(e) => settujuanLainFilter(e.target.checked)}
                type="checkbox"
                id="criteria-tujuanLain"
              />
              Tujuan Lain
            </label>
          </div>
          <div className="tunggakan-xlsx-container">
            <div onClick={downloadTunggakan} id="downloadXLSX">
              <FaAngleDoubleDown size={20} id="xlsx-icon" />
              <label
                style={{ marginLeft: "5px", fontSize: "0.8rem" }}
                htmlFor="downloadXLSX"
              >
                Download
              </label>
            </div>
          </div>
        </div>
        <div className="tunggakan-table">
          <div className="tunggakan-table-heading">
            <h5>No</h5>
            <h5>Nama</h5>
            <h5>NPWP</h5>
            <h5>Kode</h5>
            <h5>Masa</h5>
            <h5>Tanggal SP2</h5>
            <h5>PIC</h5>
            <h5>Proyeksi Selesai</h5>
            <h5>Proyeksi SKP</h5>
            <h5>Tahapan</h5>
            <h5>Jatuh Tempo </h5>
          </div>

          <div className="tunggakan-list-container">
            {tunggakanFiltered
              .filter((tunggakan) => {
                const bruh = () => {
                  const kriteria = [];
                  if (pemsusFilter) kriteria.push("Pemsus");
                  if (rutinFilter) kriteria.push("Rutin");
                  if (rutinLBFilter) kriteria.push("Rutin LB");
                  if (tujuanLainFilter) kriteria.push("Tujuan Lain");

                  return kriteria;
                };

                const filtered = bruh();

                for (const a in filtered) {
                  if (tunggakan.Kriteria === filtered[a]) {
                    return true;
                  }
                }

                if (filtered.length === 0) return tunggakan.NPWP.toString() > 0;
                return false;
              })
              .map((tunggakan, index) => {
                return (
                  <div
                    onClick={() => editTunggakan(tunggakan)}
                    key={index + 1}
                    className="tunggakan-table-list"
                  >
                    <h5>{index + 1}</h5>
                    <h5>{tunggakan.NamaWP}</h5>
                    <h5>{tunggakan.NPWP}</h5>
                    <h5>{tunggakan.Kode}</h5>
                    <h5>{tunggakan.PeriodePajak}</h5>
                    <h5>{formatDate(tunggakan.TanggalSP2) || ""}</h5>
                    <h5>{tunggakan.PIC}</h5>
                    <h5>{formatDate(tunggakan.TanggalProyeksiLHP) || ""}</h5>
                    <h5>
                      {tunggakan.NilaiProyeksiSKP > 0
                        ? `Rp ${thousandSeparator(tunggakan.NilaiProyeksiSKP)}`
                        : `-`}
                    </h5>
                    <h5>{tunggakan.Tahapan[0]?.namaTahapan}</h5>
                    <h5
                      style={
                        jatuhTempo(tunggakan)[1] < 0
                          ? { color: "#e15c47" }
                          : jatuhTempo(tunggakan)[1] < 2
                            ? { color: "#e1c047" }
                            : { color: "#93e635" }
                      }
                    >
                      {jatuhTempo(tunggakan)[0]}
                    </h5>
                    <div className="separator"></div>
                  </div>
                );
              })}
            <div id="tunggakan-line-ends">
              <p>
                {tunggakanFiltered.length > 0
                  ? "end of the line"
                  : "no data available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tunggakan;
