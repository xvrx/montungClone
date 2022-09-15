import React, { useRef } from "react";
import {
  FaRegWindowClose,
  FaTrashAlt,
  FaStackOverflow,
  FaUsers,
  FaStreetView,
  FaWindowClose,
  FaCheckDouble,
  FaUserPlus,
  FaExclamationCircle,
  FaTwitch,
  FaGrinSquintTears,
  FaEdit,
  FaRegEdit,
  FaPlusSquare,
} from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import "./TunggakanModal.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { TambahContext } from "../../Context/modalContext/TambahContext";
import { ModalContext } from "../../Context/modalContext/ModalContext";
import { MontungContext } from "../../Context/MontungContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const TunggakanModal = () => {
  // ModalContext
  const {
    settunggakanModal,
    setNotifStatus,
    setnotifModal,
    setnotifModalTitle,
    setnotifModalMessage,
    setnotifModalButton,
    setTunggakanModal,
    tahapanModal,
    settahapanModal,
    editTahapan,
    seteditTahapan,
    settahapanIdx,
  } = useContext(ModalContext);

  const {
    tahapanContainer,
    settahapanContainer,
    tunggakanContainer,
    setTunggakanContainer,
    emptyContainer,
  } = useContext(TambahContext);
  const { montung, setMontung, rupiah, digit, loading, serverOrigin } =
    useContext(MontungContext);

  const LHPref = useRef();

  function parseOnBlur(amount) {
    if (!amount || amount === 0 || amount === "0") return "";
    const parsed = parseInt(amount);
    return parsed;
  }

  function closeModal() {
    setTunggakanModal(false);
    setTunggakanContainer(emptyContainer);
  }

  function proyeksiSKPcairCh(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({
      ...tunggakanContainer,
      NilaiProyeksiPencairan: formatted,
    });
    return formatted;
  }

  function proyeksiSKPonCh(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({
      ...tunggakanContainer,
      NilaiProyeksiSKP: formatted,
    });
    return formatted;
  }

  function potensiDSPPoc(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({ ...tunggakanContainer, PotensiDSPP: formatted });
    return formatted;
  }

  function skpstpTerbitOc(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({ ...tunggakanContainer, NilaiSKPTerbit: formatted });
    return formatted;
  }

  function skpdisetujuiOc(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({ ...tunggakanContainer, Disetujui: formatted });
    return formatted;
  }

  function nilaiLbTerbitOc(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({ ...tunggakanContainer, NilaiLBterbit: formatted });
    return formatted;
  }
  function proyeksiLBoc(e) {
    const formatted = rupiah(e.target.value);
    setTunggakanContainer({
      ...tunggakanContainer,
      NilaiProyeksiLB: formatted,
    });
    return formatted;
  }

  function lhpInput(e) {
    if (e.target.value.length === 1) {
      setTunggakanContainer({
        ...tunggakanContainer,
        LHP: `LAP-00${e.target.value}/WPJ.29/KP.0404/RIK.SIS/2022`,
      });
      setTimeout(() => {
        LHPref.current.setSelectionRange(7, 7);
      }, 10);
    } else {
      setTunggakanContainer({ ...tunggakanContainer, LHP: e.target.value });
    }
  }

  function updateTunggakan() {
    if (tunggakanContainer.LHP === "" || tunggakanContainer.TanggalLHP === "") {
      loading(true);

      let tunggakanIdx = montung.findIndex(
        (i) => i._id === tunggakanContainer._id
      );
      const montungUpdated = [...montung];
      montungUpdated[tunggakanIdx] = tunggakanContainer;
      const tanggalMulai =
        montungUpdated[tunggakanIdx].Tahapan[
          montungUpdated[tunggakanIdx].Tahapan.length - 1
        ]?.tanggal;

      if (!tanggalMulai) {
        montungUpdated[tunggakanIdx].TanggalMulaiPemeriksaan = "";
      } else {
        montungUpdated[tunggakanIdx].TanggalMulaiPemeriksaan = tanggalMulai;
        setTunggakanContainer({
          ...tunggakanContainer,
          TanggalMulaiPemeriksaan: tanggalMulai,
        });
      }

      axios
        .patch(
          serverOrigin + `pemeriksaan/montung/${tunggakanContainer._id}`,
          tunggakanContainer,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          montungUpdated[tunggakanIdx].NilaiKonversi = res?.data?.nilai;
          setMontung(montungUpdated);
          setTunggakanModal(false);
          setTunggakanContainer(emptyContainer);
        })
        .catch((err) => {
          if (err?.response?.data?.login === false) {
            window.location.reload()
          }
          console.log(err.response);
        });

      loading(false);
    } else if (tunggakanContainer.LHP !== "" && tunggakanContainer.TanggalLHP !== "") {
      setnotifModalTitle("LHP telah selesai?");
      setnotifModalMessage(
        `Update status data Tunggakan atas ${tunggakanContainer.NamaWP} (${tunggakanContainer.NPWP}) menjadi LHP?`
      );
      setNotifStatus("submit-lhp");
      setnotifModalButton(true);
      setnotifModal(true);
    }
  }

  function tahapanEdit(tahapan, index) {
    seteditTahapan(true);
    settahapanIdx(index);
    settahapanContainer(tahapan);
    settahapanModal(true);
  }

  function deleteTahapan(tahapan, idx) {
    setnotifModalTitle("Hapus Tahapan?");
    setnotifModalMessage(
      `hapus tahapan kegiatan ${tahapan.namaTahapan} tanggal ${tahapan.tanggal}?`
    );
    settahapanContainer({ ...tahapanContainer, namaTahapan: idx });
    setNotifStatus("delete-tahapan");
    setnotifModalButton(true);
    setnotifModal(true);
  }

  return (
    <motion.div
      className="tunggakan-modal-subcontainer"
      animate={{ y: 0, transition: { duration: 0.5 } }}
      initial={{ y: -500 }}
    >
      <div className="tunggakan-modal-inner">
        <div className="tunggakan-modal-title">
          <h3>
            {`Update Data Pemeriksaan (${tunggakanContainer.NamaWP}) ${
              tunggakanContainer.NilaiKonversi > 0
                ? ": " + tunggakanContainer.NilaiKonversi + " Konversi"
                : ""
            } `}
          </h3>
        </div>
        <div className="tunggakan-modal-close" onClick={closeModal}>
          <FaRegWindowClose size={20} color="#fdbc2c" />
        </div>

        <div className="tunggakan-content-container">
          <div className="tunggakan-modal-content">
            <div className="tunggakan-modal-sub-title">
              <h3>
                <FaEdit /> {"Usulan & Instruksi"}
              </h3>
            </div>
            <div className="input-group-1">
              <div className="modal-input-container">
                <label
                  id="tunggakan-npwp-logo"
                  htmlFor="tunggakan-npwp"
                ></label>
                <input
                  readOnly
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.NPWP}
                  type="number"
                  id="tunggakan-npwp"
                  required
                />
                <label
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-npwp"
                >
                  NPWP
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-npwp"
                ></label>
              </div>
              <div className="modal-input-container">
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.NamaWP}
                  type="text"
                  id="tunggakan-nama"
                  required
                />
                <label
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-nama"
                >
                  NAMA
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-nama"
                ></label>
              </div>
              <div className="modal-input-container">
                <input
                  readOnly
                  maxLength={150}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.alamatWP}
                  type="text"
                  id="tunggakan-alamat"
                  required
                />
                <label
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-alamat"
                >
                  ALAMAT
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-alamat"
                ></label>
              </div>
              <div className="modal-input-container">
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.KLU}
                  type="text"
                  id="tunggakan-klu"
                  required
                />
                <label className="tunggakan-modal-text" htmlFor="tunggakan-klu">
                  KLU
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-klu"
                ></label>
              </div>
              <div className="modal-input-container">
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.AR}
                  type="text"
                  id="tunggakan-ar"
                  required
                />
                <label className="tunggakan-modal-text" htmlFor="tunggakan-ar">
                  AR
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-ar"
                ></label>
              </div>
              <div className="modal-input-container" id="tunggakan-jenis-wp">
                <FaEdit color="#cc9b30" /> &nbsp;
                <select
                  disabled
                  readOnly
                  value={
                    tunggakanContainer.Jenis === null
                      ? "Strategis"
                      : tunggakanContainer.Jenis
                  }
                >
                  <option value="Strategis">WP Strategis</option>
                  <option value="Kewilayahan">WP Kewilayahan</option>
                </select>
              </div>
            </div>
            <div className="input-group-2">
              <div className="modal-input-container">
                <input
                  readOnly
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.PeriodePajak}
                  type="text"
                  id="tunggakan-masa"
                  required
                />
                <label
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-masa"
                >
                  MASA
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-masa"
                ></label>
              </div>
              <div className="modal-input-container">
                <input
                  readOnly
                  maxLength={6}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.Kode}
                  type="text"
                  id="tunggakan-kode"
                  required
                />
                <label
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-kode"
                >
                  KODE
                </label>
                <label
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-kode"
                ></label>
              </div>
              <div
                className="modal-input-container"
                id="tunggakan-deskripsiKode"
              >
                <input
                  readOnly
                  maxLength={150}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.DeskripsiKode}
                  type="text"
                  id="tunggakan-deskripsi-kode"
                  required
                />
                <label
                  id="tunggakan-modal-deskripsiKode"
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-deskripsi-kode"
                >
                  DESKRIPSI KODE
                </label>
                <label
                  id="tunggakan-modal-deskripKode-garis"
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-deskripsi-kode"
                ></label>
              </div>
            </div>
            <div className="input-group-3">
              {/* tunggakan */}
              <div
                className="modal-input-container"
                id="tunggakan-nomortunggakan"
              >
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  value={tunggakanContainer.NomorUsulanPemeriksaan}
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  type="text"
                  id="tunggakan-nomor-tunggakan"
                  required
                />
                <label
                  id="tunggakan-nomor-tunggakan-label"
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-nomor-tunggakan"
                >
                  NOMOR USULAN
                </label>
                <label
                  id="tunggakan-nomor-tunggakan-garis"
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-nomor-tunggakan"
                ></label>
              </div>
              <div
                className="modal-input-container"
                id="tunggakan-tanggal-tunggakan"
              >
                <input
                  readOnly
                  type="date"
                  min="2021-01-31"
                  max="2023-12-31"
                  className="tunggakan-modal-date"
                  value={tunggakanContainer.TanggalUsulan}
                />
              </div>
              {/* instruksi */}
              <div
                className="modal-input-container"
                id="tunggakan-nomorInstruksi"
              >
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.NomorInstruksiPemeriksaan}
                  type="text"
                  id="tunggakan-nomor-instruksi"
                  required
                />
                <label
                  id="tunggakan-nomor-tunggakan-label"
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-nomor-instruksi"
                >
                  NOMOR INSTRUKSI
                </label>
                <label
                  id="tunggakan-nomor-tunggakan-garis"
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-nomor-instruksi"
                ></label>
              </div>
              <div
                className="modal-input-container"
                id="tunggakan-tanggal-instruksi"
              >
                <input
                  readOnly
                  type="date"
                  min="2021-01-31"
                  max="2023-12-31"
                  className="tunggakan-modal-date"
                  value={tunggakanContainer.TanggalInstruksi}
                />
              </div>
            </div>
            <div className="tunggakan-modal-sub-title">
              <h3>
                <FaEdit />
                {" Audit Plan"}
              </h3>
            </div>
            <div className="tunggakan-input-group-4">
              {/* Penunjukan SPV */}
              <div
                className="modal-input-container"
                id="tunggakan-nomortunggakan"
              >
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.PenunjukanSupervisor}
                  type="text"
                  id="tunggakan-nomor-penunjukanSpv"
                  required
                />
                <label
                  id="tunggakan-nomor-tunggakan-label"
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-nomor-penunjukanSpv"
                >
                  PENUNJUKAN SPV
                </label>
                <label
                  id="tunggakan-nomor-tunggakan-garis"
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-nomor-penunjukanSpv"
                ></label>

                <div className="modal-input-container" id="tunggakan-spv">
                  <p>Supervisor : &nbsp; </p>
                  <label htmlFor="spv-select">
                    <FaEdit color="#cc9b30" /> &nbsp;
                    <select
                      disabled
                      readOnly
                      id="spv-select"
                      name="spv-select"
                      value={
                        tunggakanContainer.NamaSupervisor === null
                          ? "Cahyo"
                          : tunggakanContainer.NamaSupervisor
                      }
                    >
                      <option value="Cahyo">Cahyo Nurseto</option>
                      <option value="Sriyanto">Sriyanto</option>
                    </select>
                  </label>
                </div>
              </div>

              <div
                className="modal-input-container"
                id="tunggakan-tanggal-tunggakan"
              >
                <input
                  readOnly
                  type="date"
                  min="2021-01-31"
                  max="2023-12-31"
                  className="tunggakan-modal-date"
                  value={tunggakanContainer.TanggalPenunjukanSupervisor}
                />
              </div>
              <div
                className="modal-input-container"
                id="tunggakan-nomorInstruksi"
              >
                <input
                  readOnly
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-input-tunggakan"
                  value={tunggakanContainer.AuditPlan}
                  type="text"
                  id="tunggakan-nomor-auditplan"
                  required
                />
                <label
                  id="tunggakan-nomor-tunggakan-label"
                  className="tunggakan-modal-text"
                  htmlFor="tunggakan-nomor-auditplan"
                >
                  AUDIT PLAN
                </label>
                <label
                  id="tunggakan-nomor-tunggakan-garis"
                  className="tunggakan-modal-line"
                  htmlFor="tunggakan-nomor-auditplan"
                ></label>
                <div
                  className="modal-tunggakan-tim-input-container"
                  id="tunggakan-anggota-tim"
                >
                  <p>Tim Pemeriksa : &nbsp; </p>
                  <label htmlFor="tunggakan-anggota-tim">
                    <FaUsers size="20" color="#cc9b30" /> &nbsp;
                    {tunggakanContainer.NamaKetuaTim},{" "}
                    {tunggakanContainer.NamaAnggotaTim1},{" "}
                    {tunggakanContainer.NamaAnggotaTim2}
                  </label>
                </div>
              </div>
              <div
                className="modal-input-container"
                id="tunggakan-tanggal-instruksi"
              >
                <input
                  readOnly
                  type="date"
                  min="2021-01-31"
                  max="2023-12-31"
                  className="tunggakan-modal-date"
                  value={tunggakanContainer.TanggalAuditPlan}
                />
              </div>
            </div>
            <div className="tunggakan-modal-sub-title">
              <h3>
                <FaEdit />
                {" Surat Perintah Pemeriksaan (SP2)"}
              </h3>
            </div>
            <div className="tunggakan-input-group-5">
              <div className="input-group-4x">
                <div
                  className="modal-input-container"
                  id="tunggakan-nomortunggakan"
                >
                  <input
                    readOnly
                    maxLength={50}
                    autoComplete="off"
                    spellCheck="false"
                    className="modal-input-tunggakan"
                    value={tunggakanContainer.NomorSP2}
                    type="text"
                    id="tunggakan-nomor-SP2"
                    required
                  />
                  <label
                    id="tunggakan-nomor-tunggakan-label"
                    className="tunggakan-modal-text"
                    htmlFor="tunggakan-nomor-SP2"
                  >
                    NOMOR SP2
                  </label>
                  <label
                    id="tunggakan-nomor-tunggakan-garis"
                    className="tunggakan-modal-line"
                    htmlFor="tunggakan-nomor-SP2"
                  ></label>
                </div>
                <div
                  className="modal-input-container"
                  id="tunggakan-tanggal-tunggakan"
                >
                  <input
                    readOnly
                    type="date"
                    min="2021-01-31"
                    max="2023-12-31"
                    className="tunggakan-modal-date"
                    value={tunggakanContainer.TanggalSP2}
                  />
                </div>
              </div>
              <div className="tunggakan-inCharge">
                <label
                  id="tunggakan-inCharge-label"
                  htmlFor="tunggakan-inCharge-select"
                >
                  <GiCrossedSwords size={23} style={{ marginRight: "5px" }} />
                  Person-In-Charge
                </label>
                <select
                  className=""
                  id="tunggakan-inCharge-select"
                  onChange={(e) =>
                    setTunggakanContainer({
                      ...tunggakanContainer,
                      PIC: e.target.value,
                    })
                  }
                  value={
                    tunggakanContainer.PIC === null
                      ? "Cahyo"
                      : tunggakanContainer.PIC
                  }
                >
                  <option value="Cahyo">Cahyo Nurseto</option>
                  <option value="Sriyanto">Sriyanto</option>
                  <option value="Ajie">Ajie Bhakti P</option>
                  <option value="Agus">Agus Supriyono</option>
                  <option value="Budi">Budi Herdiman</option>
                  <option value="Dzulfikar">Dzulfikar Hidayatullah</option>
                  <option value="Panggah">Ginanjar Panggah</option>
                  <option value="Prabowo">Harry Prabowo</option>
                  <option value="Rijadi">Harry Rijadi</option>
                  <option value="Agung">M. Agung Wicaksono</option>
                  <option value="Riani">Rina Riani</option>
                  <option value="Surya">Soleh Suryaman</option>
                </select>
              </div>
            </div>

            <div className="tunggakan-modal-sub-title">
              <h3>
                <FaEdit />
                {" Progress Tunggakan Pemeriksaan"}
              </h3>
            </div>
            <div className="tunggakan-input-group-6">
              <div className="tunggakan-modal-tahapan-panel-1">
                <div className="tunggakan-modal-profile-container">
                  <label id="tunggakan-profile-label" htmlFor="">
                    <FaStreetView
                      style={{ marginRight: "7px" }}
                      size={23}
                      color="#fdbc2c"
                    />
                    PROFILE WAJIB PAJAK
                  </label>
                  <textarea
                    value={tunggakanContainer.ProfileWP}
                    onChange={(e) =>
                      setTunggakanContainer({
                        ...tunggakanContainer,
                        ProfileWP: e.target.value,
                      })
                    }
                    placeholder="Deskripsi Usaha Wajib Pajak..."
                    className="tunggakan-modal-profile-WP"
                    spellCheck="false"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  />
                </div>
                <div className="tunggakan-modal-kendala-container">
                  <label id="tunggakan-profile-label" htmlFor="">
                    <FaGrinSquintTears
                      style={{ marginRight: "7px" }}
                      size={23}
                      color="#fdbc2c"
                    />
                    KENDALA PEMERIKSAAN
                  </label>
                  <textarea
                    value={tunggakanContainer.Kendala}
                    onChange={(e) =>
                      setTunggakanContainer({
                        ...tunggakanContainer,
                        Kendala: e.target.value,
                      })
                    }
                    placeholder="Hambatan pelaksanaan pemeriksaan..."
                    className="tunggakan-modal-kendala"
                    spellCheck="false"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  />
                </div>

                {/* Proyeksi LHP */}
                <div className="tunggakan-modal-input-1">
                  <div className="modal-newInput-input-container">
                    <input
                      value={tunggakanContainer.NilaiProyeksiSKP}
                      onClick={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiProyeksiSKP: rupiah(e.target.value),
                        })
                      }
                      onBlur={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiProyeksiSKP: parseOnBlur(digit(e.target.value)),
                        })
                      }
                      onChange={(e) => proyeksiSKPonCh(e)}
                      maxLength={50}
                      autoComplete="off"
                      spellCheck="false"
                      className="modal-newInput-input"
                      type="text"
                      id="modal-newInput-input"
                      required
                    />
                    <label
                      id="modal-newInput-input-label"
                      className="newInput-modal-text"
                      htmlFor="modal-newInput-input"
                    >
                      PROYEKSI NILAI SKPKB/STP
                    </label>
                    <label
                      id="modal-newInput-input-garis"
                      className="newInput-modal-line"
                      htmlFor="modal-newInput-input"
                    ></label>
                  </div>
                  <div
                    className="modal-newInput-date-container"
                    id="tambah-tanggal-instruksi"
                  >
                    <input
                      value={tunggakanContainer.TanggalProyeksiLHP}
                      onChange={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          TanggalProyeksiLHP: e.target.value,
                        })
                      }
                      type="date"
                      min="2021-01-31"
                      max="2023-12-31"
                      className="tambah-modal-date"
                    />
                  </div>
                </div>

                <div className="tunggakan-modal-input-2">
                  <div className="modal-newInput2-input-container">
                    <input
                      maxLength={50}
                      value={tunggakanContainer.NilaiProyeksiPencairan}
                      onClick={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiProyeksiPencairan: rupiah(e.target.value),
                        })
                      }
                      onBlur={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiProyeksiPencairan: parseOnBlur(
                            digit(e.target.value)
                          ),
                        })
                      }
                      onChange={(e) => proyeksiSKPcairCh(e)}
                      autoComplete="off"
                      spellCheck="false"
                      className="modal-newInput2-input"
                      type="text"
                      id="modal-newInput2-input"
                      required
                    />
                    <label
                      id="modal-newInput2-input-label"
                      className="newInput2-modal-text"
                      htmlFor="modal-newInput2-input"
                    >
                      PROYEKSI PENCAIRAN SKP
                    </label>
                    <label
                      id="modal-newInput2-input-garis"
                      className="newInput2-modal-line"
                      htmlFor="modal-newInput2-input"
                    ></label>
                  </div>
                  <div
                    className="modal-newInput2-date-container"
                    id="tambah-tanggal-instruksi"
                  >
                    <input
                      value={tunggakanContainer.TanggalProyeksiPencairan}
                      onChange={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          TanggalProyeksiPencairan: e.target.value,
                        })
                      }
                      type="date"
                      min="2021-01-31"
                      max="2023-12-31"
                      className="tambah-modal-date"
                    />
                  </div>
                </div>
                <div style={{ display: "flex" }} className="x-container">
                  <div className="tunggakan-modal-input-2x">
                    <div className="modal-newInput2x-input-container">
                      <input
                        value={tunggakanContainer.NilaiProyeksiLB}
                        onClick={(e) =>
                          setTunggakanContainer({
                            ...tunggakanContainer,
                            NilaiProyeksiLB: rupiah(e.target.value),
                          })
                        }
                        onBlur={(e) =>
                          setTunggakanContainer({
                            ...tunggakanContainer,
                            NilaiProyeksiLB: parseOnBlur(digit(e.target.value)),
                          })
                        }
                        onChange={(e) => proyeksiLBoc(e)}
                        maxLength={50}
                        autoComplete="off"
                        spellCheck="false"
                        className="modal-newInput2x-input"
                        type="text"
                        id="modal-newInput2x-input"
                        required
                      />
                      <label
                        id="modal-newInput2x-input-label"
                        className="newInput2x-modal-text"
                        htmlFor="modal-newInput2x-input"
                      >
                        PROYEKSI SKPLB
                      </label>
                      <label
                        id="modal-newInput2x-input-garis"
                        className="newInput2x-modal-line"
                        htmlFor="modal-newInput2x-input"
                      ></label>
                    </div>
                  </div>
                  <div className="tunggakan-modal-input-3">
                    <div className="modal-newInput3-input-container">
                      <input
                        value={tunggakanContainer.PotensiDSPP}
                        onClick={(e) =>
                          setTunggakanContainer({
                            ...tunggakanContainer,
                            PotensiDSPP: rupiah(e.target.value),
                          })
                        }
                        onBlur={(e) =>
                          setTunggakanContainer({
                            ...tunggakanContainer,
                            PotensiDSPP: parseOnBlur(digit(e.target.value)),
                          })
                        }
                        onChange={(e) => potensiDSPPoc(e)}
                        maxLength={50}
                        autoComplete="off"
                        spellCheck="false"
                        className="modal-newInput3-input"
                        type="text"
                        id="modal-newInput3-input"
                        required
                      />
                      <label
                        id="modal-newInput3-input-label"
                        className="newInput3-modal-text"
                        htmlFor="modal-newInput3-input"
                      >
                        NILAI POTENSI (DSPP)
                      </label>
                      <label
                        id="modal-newInput3-input-garis"
                        className="newInput3-modal-line"
                        htmlFor="modal-newInput3-input"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tunggakan-modal-tahapan-panel-2">
                <div className="tunggakan-modal-tahapan-container">
                  <label id="tunggakan-profile-label" htmlFor="">
                    <FaStackOverflow
                      style={{ marginRight: "7px" }}
                      size={23}
                      color="#fdbc2c"
                    />
                    TAHAPAN PEMERIKSAAN
                    <FaExclamationCircle
                      color="#fdbc2c"
                      size="15"
                      className="tunggakan-modal-tahapan-info"
                    />
                    <p id="tunggakan-modal-tahapan-notice">
                      tanggal tahapan pertama adalah tanggal mulai pemeriksaan!
                    </p>
                  </label>

                  <div className="tunggakan-modal-tahapan">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="tunggakan-modal-tambahTahapan"
                        onClick={() => settahapanModal(true)}
                      >
                        <FaPlusSquare size={25} color={"#fdbc2c"} />
                      </div>
                    </div>
                    {tunggakanContainer.Tahapan?.length > 0 ? (
                      tunggakanContainer.Tahapan?.map((tahapan, index) => (
                        <div key={index} className="tunggakan-tahapan-bar">
                          <div className="tunggakan-modal-tanggal">
                            <input
                              style={{
                                color:
                                  index === 0
                                    ? "rgb(172, 172, 172)"
                                    : "#747474",
                              }}
                              className="tunggakan-modal-tahapanDate"
                              readOnly
                              disabled
                              type="date"
                              value={tahapan.tanggal}
                            />
                          </div>
                          <div
                            className="tunggakan-modal-namaTahapan"
                            style={{
                              color: index === 0 ? "#dcffff" : "#9f9f9f",
                            }}
                          >
                            {tahapan.namaTahapan}
                          </div>
                          <div
                            className="tunggakan-modal-deskripsiTahapan"
                            style={{ color: index === 0 ? "white" : "#b1b1b1" }}
                          >
                            {tahapan.deskripsiTahapan}
                          </div>
                          <div className="tunggakan-modal-icons">
                            <div
                              id="tunggakan-modal-tahapan-editbutton"
                              onClick={() => tahapanEdit(tahapan, index)}
                              className="tunggakan-modal-tahapanEdit"
                              style={{ marginRight: "10px" }}
                            >
                              <FaRegEdit color="#fdbc2c" />
                            </div>
                            <div
                              id="tunggakan-modal-tahapan-trashbutton"
                              onClick={() => deleteTahapan(tahapan, index)}
                              className="tunggakan-modal-tahapanDelete"
                            >
                              <FaTrashAlt color="#fdbc2c" />
                            </div>
                          </div>
                          {tunggakanContainer.Tahapan.length - 1 !== index && (
                            <div className="tunggakan-modal-tahapan-separator"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p id="noProgress">
                        No progress has been made...
                        <br /> click ' + ' to add a new one!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="tunggakan-input-group-7">
              <div className="input-group-7-panel-1">
                <div className="tunggakan-modal-sub-title">
                  <h3>
                    <FaEdit />
                    {" Penyelesaian Pemeriksaan"}
                  </h3>
                </div>
                <div className="containerInput5-6" style={{ display: "flex" }}>
                  <div className="modal-newInput5-input-container">
                    <input
                      value={tunggakanContainer.NilaiSKPTerbit}
                      onClick={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiSKPTerbit: rupiah(e.target.value),
                        })
                      }
                      onBlur={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          NilaiSKPTerbit: parseOnBlur(digit(e.target.value)),
                        })
                      }
                      onChange={(e) => skpstpTerbitOc(e)}
                      maxLength={50}
                      autoComplete="off"
                      spellCheck="false"
                      className="modal-newInput5-input"
                      type="text"
                      id="modal-newInput5-input"
                      required
                    />
                    <label
                      id="modal-newInput5-input-label"
                      className="newInput5-modal-text"
                      htmlFor="modal-newInput5-input"
                    >
                      NILAI SKPKB/STP
                    </label>
                    <label
                      id="modal-newInput5-input-garis"
                      className="newInput5-modal-line"
                      htmlFor="modal-newInput5-input"
                    ></label>
                  </div>
                  <div className="modal-newInput6-input-container">
                    <input
                      value={tunggakanContainer.Disetujui}
                      onClick={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          Disetujui: rupiah(e.target.value),
                        })
                      }
                      onBlur={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          Disetujui: parseOnBlur(digit(e.target.value)),
                        })
                      }
                      onChange={(e) => skpdisetujuiOc(e)}
                      maxLength={50}
                      autoComplete="off"
                      spellCheck="false"
                      className="modal-newInput6-input"
                      type="text"
                      id="modal-newInput6-input"
                      required
                    />
                    <label
                      id="modal-newInput6-input-label"
                      className="newInput6-modal-text"
                      htmlFor="modal-newInput6-input"
                    >
                      SKPKB Disetujui
                    </label>
                    <label
                      id="modal-newInput6-input-garis"
                      className="newInput6-modal-line"
                      htmlFor="modal-newInput6-input"
                    ></label>
                  </div>
                </div>
                <div className="modal-newInput7-input-container">
                  <input
                    value={tunggakanContainer.NilaiLBterbit}
                    onClick={(e) =>
                      setTunggakanContainer({
                        ...tunggakanContainer,
                        NilaiLBterbit: rupiah(e.target.value),
                      })
                    }
                    onBlur={(e) =>
                      setTunggakanContainer({
                        ...tunggakanContainer,
                        NilaiLBterbit: parseOnBlur(digit(e.target.value)),
                      })
                    }
                    onChange={(e) => nilaiLbTerbitOc(e)}
                    maxLength={50}
                    autoComplete="off"
                    spellCheck="false"
                    className="modal-newInput7-input"
                    type="text"
                    id="modal-newInput7-input"
                    required
                  />
                  <label
                    id="modal-newInput7-input-label"
                    className="newInput7-modal-text"
                    htmlFor="modal-newInput7-input"
                  >
                    NILAI SKPLB
                  </label>
                  <label
                    id="modal-newInput7-input-garis"
                    className="newInput7-modal-line"
                    htmlFor="modal-newInput7-input"
                  ></label>
                </div>
                <div className="tunggakan-modal-input-4">
                  <div className="modal-newInput4-input-container">
                    <input
                      ref={LHPref}
                      value={tunggakanContainer.LHP}
                      onChange={(e) => lhpInput(e)}
                      maxLength={50}
                      autoComplete="off"
                      spellCheck="false"
                      className="modal-newInput4-input"
                      type="text"
                      id="modal-newInput4-input"
                      required
                    />
                    <label
                      id="modal-newInput4-input-label"
                      className="newInput4-modal-text"
                      htmlFor="modal-newInput4-input"
                    >
                      NOMOR LHP
                    </label>
                    <p id="modal-newInput4-notice">
                      Jika nomor dan tanggal LHP diinput maka tunggakan akan pindah ke tab
                      LHP Selesai!
                    </p>
                    <label
                      id="modal-newInput4-input-garis"
                      className="newInput4-modal-line"
                      htmlFor="modal-newInput4-input"
                    ></label>
                  </div>
                  <div
                    className="modal-newInput4-date-container"
                    id="tambah-tanggal-instruksi"
                  >
                    <input
                      disabled={tunggakanContainer.LHP.length < 1 ? true : false} 
                      value={tunggakanContainer.TanggalLHP}
                      onChange={(e) =>
                        setTunggakanContainer({
                          ...tunggakanContainer,
                          TanggalLHP: e.target.value,
                        })
                      }
                      type="date"
                      min="2021-01-31"
                      max="2023-12-31"
                      className="tambah-modal-date"
                    />
                  </div>
                </div>
              </div>
              <div className="input-group-7-panel-2">
                <div className="tunggakan-modal-kendala-container">
                  <label id="tunggakan-profile-label" htmlFor="">
                    <FaTwitch
                      style={{ marginRight: "7px" }}
                      size={23}
                      color="#fdbc2c"
                    />
                    REVIEW ATASAN
                  </label>
                  <textarea
                    value={tunggakanContainer.reviewAtasan}
                    onChange={(e) =>
                      setTunggakanContainer({
                        ...tunggakanContainer,
                        reviewAtasan: e.target.value,
                      })
                    }
                    placeholder="..."
                    className="tunggakan-modal-review"
                    spellCheck="false"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  />
                </div>
              </div>
            </div>
            <div className="tunggakan-modal-buttons">
              <button
                onClick={updateTunggakan}
                className="tambah-modal-button"
                id="tambah-modal-button-submit"
              >
                <FaCheckDouble size={15} style={{ marginRight: "5px" }} />
                Update Tunggakan
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TunggakanModal;
