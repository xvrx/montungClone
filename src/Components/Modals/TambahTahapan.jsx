import React, { useState, useContext } from "react";
import "./TambahTahapan.css";
import { motion } from "framer-motion";
import { ModalContext } from "../../Context/modalContext/ModalContext";
import { TambahContext } from "../../Context/modalContext/TambahContext";
import { MontungContext } from "../../Context/MontungContext";

const TambahTahapan = () => {
  const {
    tahapanModal,
    settahapanModal,
    editTahapan,
    seteditTahapan,
    settahapanIdx,
    tahapanIdx,
  } = useContext(ModalContext);

  const {
    tahapanContainer,
    settahapanContainer,
    tunggakanContainer,
    setTunggakanContainer,
    tambahContainer,
    setTambahContainer,
    emptyContainer,
  } = useContext(TambahContext);
  const { montung, setMontung } = useContext(MontungContext);

  function updateTahapan() {
    if (editTahapan === false) {
      setTunggakanContainer({
        ...tunggakanContainer,
        Tahapan: [tahapanContainer, ...tunggakanContainer.Tahapan],
      });
      settahapanContainer({
        tanggal: "",
        namaTahapan: "",
        deskripsiTahapan: "",
      });
      settahapanModal(false);
    } else {
      const tahapanUpdated = [...tunggakanContainer.Tahapan];
      tahapanUpdated[tahapanIdx] = tahapanContainer;
      setTunggakanContainer({ ...tunggakanContainer, Tahapan: tahapanUpdated });
      seteditTahapan(false);
      settahapanModal(false);
      settahapanContainer({
        tanggal: "",
        namaTahapan: "",
        deskripsiTahapan: "",
      });
    }
  }

  function closeTahapanModal() {
    settahapanModal(false);
    settahapanContainer({
      tanggal: "",
      namaTahapan: "",
      deskripsiTahapan: "",
    });
    seteditTahapan(false);
    settahapanIdx(0);
  }

  return (
    <motion.div
      className="notif-modal-subcontainer"
      animate={{ scale: 1, transition: { duration: 0.25 } }}
      initial={{ scale: 0 }}
    >
      <div className="tambah-tahapan-modal-inner">
        <div className="tambah-tahapan-modal-title">
          <h3>
            {editTahapan
              ? "Edit Tahapan Pemeriksaan"
              : `Tambah Tahapan Pemeriksaan`}
          </h3>
        </div>
        <div className="tambah-tahapan-content-container">
          <div className="tambah-tahapan-modal-content">
            <div className="tahapan-modal-container">
              <input
                value={tahapanContainer.tanggal}
                onChange={(e) =>
                  settahapanContainer({
                    ...tahapanContainer,
                    tanggal: e.target.value,
                  })
                }
                type="date"
                min={editTahapan ? tunggakanContainer.Tahapan[0]?.tanggal : ""}
                id="tambah-tahapan-input-tanggal"
              />
              <div className="modal-tahapan-input-container">
                <input
                  value={tahapanContainer.namaTahapan}
                  onChange={(e) => {
                    settahapanContainer({
                      ...tahapanContainer,
                      namaTahapan: e.target.value,
                    });
                    const tanggalMulai =
                      tunggakanContainer.Tahapan[
                        tunggakanContainer.Tahapan.length - 1
                      ]?.tanggal;
                    setTunggakanContainer({
                      ...tunggakanContainer,
                      TanggalMulaiPemeriksaan: tanggalMulai,
                    });
                  }}
                  autoComplete="off"
                  spellCheck="false"
                  className="modal-tahapan-input"
                  type="text"
                  id="modal-tahapan-input"
                  required
                />
                <label
                  id="modal-tahapan-input-label"
                  className="tahapan-modal-text"
                  htmlFor="modal-tahapan-input"
                >
                  NAMA TAHAPAN
                </label>
                <label
                  id="modal-tahapan-input-garis"
                  className="tahapan-modal-line"
                  htmlFor="modal-tahapan-input"
                ></label>
              </div>
              <textarea
                value={tahapanContainer.deskripsiTahapan}
                onChange={(e) =>
                  settahapanContainer({
                    ...tahapanContainer,
                    deskripsiTahapan: e.target.value,
                  })
                }
                spellCheck="false"
                type="text"
                id="tambah-tahapan-input-deskripsi"
                placeholder="deskripsi tahapan pemeriksaan..."
              />
            </div>
          </div>
          <div className="tambah-tahapan-modal-button">
            <button
              className="tambah-modal-button"
              onClick={updateTahapan}
              id="tambah-modal-button-submit"
            >
              Update!
            </button>
            <button
              onClick={closeTahapanModal}
              className="tambah-modal-button"
              id="tambah-modal-button-discard"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TambahTahapan;
