import React from "react";
import "./usulan.css";
import { useContext } from "react";
import { MontungContext } from "../../../Context/MontungContext";
import { UsulanContext } from "../../../Context/UsulanContext";
import {
  FaAngleDoubleDown,
  FaSearch,
  FaPlus,
  FaPaperclip,
} from "react-icons/fa";
import { ModalContext } from "../../../Context/modalContext/ModalContext";
import { TambahContext } from "../../../Context/modalContext/TambahContext";
import axios from 'axios'

const FragmentUsulan = () => {

  const {
    pemsusFilter,
    setpemsusFilter,
    rutinFilter,
    setrutinFilter,
    rutinLBFilter,
    setrutinLBFilter,
    tujuanLainFilter,
    settujuanLainFilter,
  } = useContext(UsulanContext);

  const { settambahModal, setEditActive } = useContext(ModalContext);
  const { montung, usulanFiltered, dateRange, formatDate, loading, serverOrigin } =
    useContext(MontungContext);
  const { tambahContainer, setTambahContainer, emptyContainer } =
    useContext(TambahContext);

  function addSearchFilter(e) {
    console.log(e.target.value);
  }

  function tambahUsulan() {
    setEditActive(false);
    settambahModal(true);
  }

  function cetakUsulan() {
    console.log("harry potters suckin a dick");
  }

  function downloadUsulan() {
    loading(true)
    axios.post(serverOrigin + 'xlsx/usulan', usulanFiltered, { withCredentials: true, responseType: 'blob' })
      .then((res) => {
        // console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `usulan.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        loading(false)
      }).catch(async (err) => {
        console.log(err.response.data)
        const error = await (err.response.data).text()
        const message = await error
        if (JSON.parse(message).login === false) return window.location.reload()
        loading(false)
      })
  }

  function editUsulan(usulan) {
    setEditActive(true);
    setTambahContainer(usulan);
    settambahModal(true);
  }

  function auditplanReminder(tunggakan) {
    {
      /* <h5>{tunggakan.AuditPlan}<br /> {tunggakan.TanggalAuditPlan && `(${tunggakan.TanggalAuditPlan})`}</h5> */
    }

    if (tunggakan.AuditPlan && tunggakan.TanggalAuditPlan) {
      return `${tunggakan.AuditPlan} \n ${tunggakan.TanggalAuditPlan && `(${formatDate(tunggakan.TanggalAuditPlan)})`
        }`;
    } else if (
      tunggakan.TanggalPenunjukanSupervisor &&
      !tunggakan.TanggalAuditPlan
    ) {
      const days =
        8 -
        dateRange(
          new Date(tunggakan?.TanggalPenunjukanSupervisor),
          new Date()
        )[0];
      if (days > 0)
        return <p style={{ color: "#93e635" }}>sisa waktu : {days} hari</p>;
      if (days === 0)
        return (
          <p style={{ color: "#e7a165" }}>
            hari terakhir batas waktu <br /> penyusunan audit plan!
          </p>
        );
      return (
        <p style={{ color: "#e15c47" }}>
          audit plan lewat waktu <br /> {days * -1} hari !
        </p>
      );
    } else {
      return null;
    }
  }


  return (
    <div className="usulan-container">
      <div className="usulan-sub-container">
        <div className="tunggakan-opts-container">
          <label htmlFor="search-usulan" className="usulan-search-container">
            <input
              onBlur={addSearchFilter}
              spellCheck="false"
              type="text"
              placeholder="Cari Usulan"
              id="search-usulan"
              required
            />
            <div id="search-line-2"></div>
            <div className="search-logo">
              <FaSearch />
            </div>
          </label>
          <div className="usulan-criteria-container">
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
          <div className="usulan-tambah-container">
            <div onClick={() => tambahUsulan()} id="tambah-usulan">
              <FaPlus size={20} id="xlsx-icon" />
              <label
                style={{ marginLeft: "5px", fontSize: "0.8rem" }}
                htmlFor="downloadXLSX"
              >
                Tambah Usulan
              </label>
            </div>
          </div>
          <div className="usulan-tambah-container">
            <div onClick={() => cetakUsulan()} id="tambah-usulan">
              <FaPaperclip size={20} id="xlsx-icon" />
              <label
                style={{ marginLeft: "5px", fontSize: "0.8rem" }}
                htmlFor="downloadXLSX"
              >
                Cetak Usulan
              </label>
            </div>
          </div>
          <div className="usulan-xlsx-container">
            <div onClick={downloadUsulan} id="downloadXLSX">
              <FaAngleDoubleDown size={20} id="xlsx-icon" />
              <label
                style={{ marginLeft: "5px", fontSize: "0.8rem" }}
                htmlFor="downloadXLSX"
              >
                Download .XLSX
              </label>
            </div>
          </div>
        </div>
        <div className="usulan-table">
          <div className="usulan-table-heading">
            <h5>No</h5>
            <h5>Nama</h5>
            <h5>NPWP</h5>
            <h5>Kode</h5>
            <h5>Masa</h5>
            <h5>Nomor Usulan</h5>
            <h5>Instruksi</h5>
            <h5>Penunjukan Supervisor</h5>
            <h5>Audit Plan</h5>
          </div>

          <div className="usulan-list-container">
            {usulanFiltered
              .filter((usulan) => {
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
                  if (usulan.Kriteria === filtered[a]) {
                    return true;
                  }
                }

                if (filtered.length === 0) return usulan.NPWP.toString() > 0;
                return false;
              })
              .map((tunggakan, index) => {
                return (
                  <div
                    onClick={() => editUsulan(tunggakan)}
                    key={index + 1}
                    className="usulan-table-list"
                  >
                    <h5>{index + 1}</h5>
                    <h5>{tunggakan.NamaWP}</h5>
                    <h5>{tunggakan.NPWP}</h5>
                    <h5>{tunggakan.Kode}</h5>
                    <h5>{tunggakan.PeriodePajak}</h5>
                    <h5>
                      {tunggakan.NomorUsulanPemeriksaan} <br />
                      {tunggakan.TanggalUsulan && `(${formatDate(tunggakan.TanggalUsulan)})`}
                    </h5>
                    <h5>
                      {tunggakan.NomorInstruksiPemeriksaan} <br />
                      {tunggakan.TanggalInstruksi &&
                        `(${formatDate(tunggakan.TanggalInstruksi)})`}
                    </h5>
                    <h5>
                      {tunggakan.PenunjukanSupervisor}
                      <br />
                      {tunggakan.TanggalPenunjukanSupervisor &&
                        `(${formatDate(tunggakan.TanggalPenunjukanSupervisor)})`}
                    </h5>
                    {/* <h5>{tunggakan.AuditPlan}<br /> {tunggakan.TanggalAuditPlan && `(${tunggakan.TanggalAuditPlan})`}</h5> */}
                    <h5>{auditplanReminder(tunggakan)}</h5>
                    <div className="separator"></div>
                  </div>
                );
              })}
            <div id="usulan-line-ends">
              <p>
                {usulanFiltered.length > 0
                  ? "end of the line"
                  : "no data available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragmentUsulan;
