import React from "react";
import "./selesai.css";
import axios from 'axios';
import { useContext } from "react";
import { MontungContext } from "../../../Context/MontungContext";
import { SelesaiContext } from "../../../Context/SelesaiContext";
import { FaAngleDoubleDown, FaSearch } from "react-icons/fa";
import { TambahContext } from "../../../Context/modalContext/TambahContext";
import { ModalContext } from "../../../Context/modalContext/ModalContext";


const FragmentSelesai = () => {
  const { selesaiFiltered, serverOrigin, loading, thousandSeparator, sum, sumFloat, defaultDate } =
    useContext(MontungContext);
  const { optionLHP, setoptionLHP } = useContext(TambahContext);
  const { modalLHP, setModalLHP,setnotifModal,
    setnotifModalTitle,
    setnotifModalMessage,
    setnotifModalButton, } = useContext(ModalContext);

  function addSearchFilter(e) {
    console.log(e.target.value);
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
  } = useContext(SelesaiContext);

  const selesaiKriteriaFiltered = selesaiFiltered.filter((selesai) => {
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
      if (selesai.Kriteria === filtered[a]) {
        return true;
      }
    }
    return false;
  });

  function editPencairan(selesai) {
    const newID = selesai._id;
    const newPencairan = selesai.NilaiPencairan;
    const sisaPencairan =
      selesai?.NilaiSKPTerbit - selesai?.NilaiPencairan || 0;
    const newtanggalPencairan = selesai?.tanggalPencairan || defaultDate(new Date);
    setoptionLHP({
      _id: newID,
      NilaiPencairan: newPencairan,
      tanggalPencairan: newtanggalPencairan,
      sisaPencairan: sisaPencairan,
      TanggalProyeksiPencairan: selesai?.TanggalProyeksiPencairan,
      NilaiSKPTerbit: selesai?.NilaiSKPTerbit,
    });
    setModalLHP(true);
  }

  function downloadLHP() {
    loading(true)
    axios.post(serverOrigin + 'xlsx/selesai', selesaiFiltered, { withCredentials: true, responseType: 'blob' })
      .then((res) => {
        // console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `LHP selesai.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        loading(false)
      }).catch(async (err) => {
        console.log(err.response.data)
        const error = await (err?.response?.data)?.text()
        if (error) {
          const message = await error
          // console.log(message)
          if (JSON.parse(message).login === false) return window.location.reload()
          loading(false)
          if (JSON.parse(message).message === "No records found!") {
            setnotifModalTitle('file tidak ditemukan!')
            setnotifModalMessage(`tidak terdapat data tunggakan pemeriksaan pada database.`)
            setnotifModalButton(false)
            setnotifModal(true)
          }
        }
        console.log(err.response)
        loading(false)
      })
  }

  return (
    <div className="selesai-container">
      <div className="selesai-sub-container">
        <div className="selesai-opts-container">
          <label htmlFor="search-selesai" className="selesai-search-container">
            <input
              onBlur={addSearchFilter}
              spellCheck="false"
              type="text"
              placeholder="Cari Laporan"
              id="search-selesai"
              required
            />
            <div id="search-line-2"></div>
            <div className="search-logo">
              <FaSearch />
            </div>
          </label>
          <div className="selesai-criteria-container">
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
          <div className="selesai-xlsx-container">
            <div onClick={downloadLHP} id="downloadXLSX">
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
        <div className="selesai-table">
          <div className="selesai-table-heading">
            <h5>No</h5>
            <h5>Nama</h5>
            <h5>NPWP</h5>
            <h5>Kode</h5>
            <h5>Masa</h5>
            <h5>Nomor LHP</h5>
            <h5>Konversi</h5>
            <h5>Nilai SKP</h5>
            <h5>Disetujui</h5>
            <h5>Pencairan SKP</h5>
          </div>

          <div className="selesai-list-container">
            {selesaiFiltered
              ?.filter((selesai) => {
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
                  if (selesai.Kriteria === filtered[a]) {
                    return true;
                  }
                }

                if (filtered.length === 0) return selesai.NPWP.toString() > 0;
                return false;
              })
              .map((selesai, index) => {
                return (
                  <div
                    onClick={() => editPencairan(selesai)}
                    key={index + 1}
                    className="selesai-table-list"
                  >
                    <h5>{index + 1}</h5>
                    <h5>{selesai.NamaWP}</h5>
                    <h5>{selesai.NPWP}</h5>
                    <h5>{selesai.Kode}</h5>
                    <h5>{selesai.PeriodePajak}</h5>
                    <h5>{selesai.LHP}</h5>
                    <h5>{parseFloat(selesai.NilaiKonversi)}</h5>
                    <h5>
                      {selesai.NilaiSKPTerbit.toString().length === 0
                        ? "Rp0"
                        : `Rp ${thousandSeparator(selesai.NilaiSKPTerbit)}`}
                    </h5>
                    <h5>
                      {selesai.Disetujui.toString().length === 0
                        ? "Rp0"
                        : `Rp ${thousandSeparator(selesai.Disetujui)}`}
                    </h5>
                    <h5>
                      {selesai.NilaiPencairan.toString().length === 0
                        ? "Rp0"
                        : `Rp ${thousandSeparator(selesai.NilaiPencairan)}`}
                    </h5>
                    <div className="separator"></div>
                  </div>
                );
              })}
            {selesaiFiltered.length > 0 ? (
              <div className="selesai-total">
                <h5>{null}</h5>
                <h5>{null}</h5>
                <h5>{null}</h5>
                <h5>{null}</h5>
                <h5>{null}</h5>
                <h5>{null}</h5>
                <h5>{sumFloat(selesaiFiltered, "NilaiKonversi")}</h5>
                <h5>{`Rp ${thousandSeparator(
                  sum(selesaiKriteriaFiltered, "NilaiSKPTerbit")
                )}`}</h5>
                <h5>{`Rp ${thousandSeparator(
                  sum(selesaiKriteriaFiltered, "Disetujui")
                )}`}</h5>
                <h5>{`Rp ${thousandSeparator(
                  sum(selesaiKriteriaFiltered, "NilaiPencairan")
                )}`}</h5>
              </div>
            ) : (
              <p id="inavailable">no data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragmentSelesai;
