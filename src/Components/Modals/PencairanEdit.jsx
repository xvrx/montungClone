import React, { useEffect, useContext } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import "./PencairanEdit.css";
import { motion } from "framer-motion";
import { ModalContext } from "../../Context/modalContext/ModalContext";
import { TambahContext } from "../../Context/modalContext/TambahContext";
import { MontungContext } from "../../Context/MontungContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const TambahTahapan = () => {
  const {
    tahapanModal,
    setModalLHP,
    settahapanModal,
    editTahapan,
    seteditTahapan,
    settahapanIdx,
    tahapanIdx,
  } = useContext(ModalContext);
  const {
    settahapanContainer,
    optionLHP,
    setoptionLHP,
    tambahContainer,
    setTambahContainer,
    emptyContainer,
  } = useContext(TambahContext);

  const {
    montung,
    loading,
    serverOrigin,
    setMontung,
    rupiah,
    digit,
    defaultDate,
  } = useContext(MontungContext);

  function parseOnBlur(amount) {
    if (!amount || amount === 0 || amount === "0") return "";
    const parsed = parseInt(amount);
    return parsed;
  }

  function updatePencairan() {
    loading(true);
    const objUpdated = [...montung];
    const pencairanIdx = montung.findIndex((i) => i._id === optionLHP._id);
    objUpdated[pencairanIdx].NilaiPencairan = optionLHP.NilaiPencairan;
    objUpdated[pencairanIdx].tanggalPencairan = optionLHP.tanggalPencairan;
    objUpdated[pencairanIdx].sisaPencairan = optionLHP.sisaPencairan;
    objUpdated[pencairanIdx].TanggalProyeksiPencairan =
      optionLHP.TanggalProyeksiPencairan;

    axios
      .patch(
        serverOrigin + `pemeriksaan/montung/${optionLHP?._id}`,
        objUpdated[pencairanIdx],
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setMontung(objUpdated);
        setModalLHP(false);
        setoptionLHP({
          _id: "",
          NilaiPencairan: 0,
          tanggalPencairan: "",
          sisaPencairan: 0,
          TanggalProyeksiPencairan: "",
          NilaiSKPTerbit: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });

    console.log(optionLHP);

    loading(false);
  }

  function proyeksiSKPonCh(e) {
    const formatted = rupiah(e.target.value);
    setoptionLHP({ ...optionLHP, NilaiPencairan: formatted });
    return formatted;
  }

  useEffect(() => {
    const sisaFormatted =
      optionLHP?.NilaiSKPTerbit - digit(optionLHP.NilaiPencairan) || 0;

    setoptionLHP({ ...optionLHP, sisaPencairan: sisaFormatted });
  }, [optionLHP.NilaiPencairan]);

  function closeTahapanModal() {
    setModalLHP(false);
    setoptionLHP({
      _id: "",
      NilaiPencairan: 0,
      tanggalPencairan: "",
      sisaPencairan: 0,
      TanggalProyeksiPencairan: "",
      NilaiSKPTerbit: "",
    });
  }

  return (
    <motion.div
      className="notif-modal-subcontainer"
      animate={{ scale: 1, transition: { duration: 0.25 } }}
      initial={{ scale: 0 }}
    >
      <div className="pencairan-edit-modal-inner">
        <div className="pencairan-modal-title">
          <h3>Update Data Pencairan</h3>
        </div>
        <div className="pencairan-edit-content-container">
          <div className="pencairan-edit-modal-content">
            <div className="modal-pencairanEdit-input-container">
              <input
                value={optionLHP.NilaiPencairan}
                onClick={(e) =>
                  setoptionLHP({
                    ...optionLHP,
                    NilaiPencairan: rupiah(e.target.value),
                  })
                }
                onBlur={(e) =>
                  setoptionLHP({
                    ...optionLHP,
                    NilaiPencairan: parseOnBlur(digit(e.target.value)),
                  })
                }
                onChange={(e) => proyeksiSKPonCh(e)}
                maxLength={50}
                autoComplete="off"
                spellCheck="false"
                className="modal-pencairanEdit-input"
                type="text"
                id="modal-pencairanEdit-input"
                required
              />
              <label
                id="modal-pencairanEdit-input-label"
                className="pencairanEdit-modal-text"
                htmlFor="modal-pencairanEdit-input"
              >
                SKP TELAH DIBAYAR
              </label>
              <label
                id="modal-pencairanEdit-input-garis"
                className="pencairanEdit-modal-line"
                htmlFor="modal-pencairanEdit-input"
              ></label>
            </div>
            <input
              value={optionLHP?.tanggalPencairan}
              onChange={(e) =>
                setoptionLHP({ ...optionLHP, tanggalPencairan: e.target.value })
              }
              type="date"
              min="2021-12-31"
              id="pencairan-tanggal-proyeksi"
            />
          </div>

          <div className="pencairan-tanggal-outer-container">
            <div className="pencairan-tanggal-container">
              <div className="modal-pencairanEdit-input-container">
                <span style={{ fontSize: "0.70rem", color: "#fdbc2c" }}>
                  SISA TUNGGAKAN: <br />{" "}
                  <p style={{ fontSize: "0.90rem", color: "white" }}>
                    {optionLHP?.sisaPencairan >= 0
                      ? `Rp${rupiah(optionLHP.sisaPencairan) || 0}`
                      : `(lebih bayar?) \n Rp${rupiah(
                          optionLHP.sisaPencairan
                        )}`}
                  </p>
                </span>
              </div>
              <div className="sisa-proyeksi">
                <input
                  value={optionLHP?.TanggalProyeksiPencairan}
                  onChange={(e) =>
                    setoptionLHP({
                      ...optionLHP,
                      TanggalProyeksiPencairan: e.target.value,
                    })
                  }
                  type="date"
                  min={defaultDate(new Date())}
                  id="pencairan-tanggal-proyeksi"
                />
              </div>
            </div>
          </div>
          <div className="pencairan-modal-warning">
            <p>
              catatan: <br /> harap mengisi tanggal pembayaran (SKP dibayar) dan
              tanggal proyeksi pencairan (sisa tunggakan)
            </p>
          </div>
          <div className="pencairan-button">
            <button
              onClick={closeTahapanModal}
              className="tambah-modal-button"
              id="tambah-modal-button-discard"
            >
              Cancel
            </button>
            <button
              className="tambah-modal-button"
              onClick={updatePencairan}
              id="tambah-modal-button-submit"
            >
              Update!
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TambahTahapan;
