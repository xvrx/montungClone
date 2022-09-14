import React, { useRef, useState } from 'react'
import { FaRegWindowClose, FaWindowClose, FaEdit, FaCheckDouble, FaFileDownload, FaUserPlus } from 'react-icons/fa'
import './TambahModal.css'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { TambahContext } from '../../Context/modalContext/TambahContext'
import { ModalContext } from '../../Context/modalContext/ModalContext'
import { MontungContext } from '../../Context/MontungContext'
import axios from 'axios'
axios.defaults.withCredentials = true

const TambahModal = () => {
    // ModalContext
    const { settambahModal,
        editActive,
        setNotifStatus,
        setEditActive,
        setnotifModal,
        setnotifModalTitle,
        setnotifModalMessage,
        setnotifModalButton,
        tambahTim,
        settamabahTim
    } = useContext(ModalContext)


    const { tambahContainer, setTambahContainer, emptyContainer } = useContext(TambahContext)
    const { montung, setMontung, serverOrigin, loading,
        loadingStatus } = useContext(MontungContext)

    const auditPlanRef = useRef()
    const penunjukanRef = useRef()
    const SP2ref = useRef()

    function npwpInput(e) {
        if (tambahContainer.NPWP.length === 15) {
            setTambahContainer({ ...tambahContainer, NPWP: e.target.value.slice(0, 15) })
        } else {
            setTambahContainer({ ...tambahContainer, NPWP: e.target.value })
        }
    }

    function usulanInput(e) {
        setTambahContainer({ ...tambahContainer, NomorUsulanPemeriksaan: e.target.value })
    }

    function penunjukanSPVinput(e) {
        if (e.target.value.length === 1) {
            setTambahContainer({ ...tambahContainer, PenunjukanSupervisor: `ND-${e.target.value}/WPJ.29/KP.0404/2022` })
            setTimeout(() => {
                penunjukanRef.current.setSelectionRange(4, 4)
            }, 10);
        } else {
            setTambahContainer({ ...tambahContainer, PenunjukanSupervisor: e.target.value })
        }
    }


    function auditPlanInput(e) {
        if (e.target.value.length === 1) {
            setTambahContainer({ ...tambahContainer, AuditPlan: `ND-${e.target.value}/WPJ.29/KP.0400/2022` })
            setTimeout(() => {
                auditPlanRef.current.setSelectionRange(4, 4)
            }, 1);
        } else {
            setTambahContainer({ ...tambahContainer, AuditPlan: e.target.value })
        }
    }

    function SP2Input(e) {
        if (e.target.value.length === 1) {
            setTambahContainer({ ...tambahContainer, NomorSP2: `PRIN-${e.target.value}/WPJ.29/KP.0404/RIK.SIS/2022` })
            setTimeout(() => {
                SP2ref.current.setSelectionRange(6, 6)
            }, 1);
        } else {
            setTambahContainer({ ...tambahContainer, NomorSP2: e.target.value })
        }
    }

    function instruksiInput(e) {
        setTambahContainer({ ...tambahContainer, NomorInstruksiPemeriksaan: e.target.value })
    }



    const formatMasa = (masa) => {
        const masaformat = masa.replace(/[^0-9\- ]+/g, '')
        if (masaformat.length === 4) { return `${masaformat} - ` }
        if (masaformat.length > 10) return `${masaformat.slice(0, 4)} - ${masaformat.slice(7, 11)}`
        return masaformat
    }

    function masaInput(e) {
        const masa = formatMasa(e.target.value)
        setTambahContainer({ ...tambahContainer, PeriodePajak: masa })
    }

    function discard() {
        if (editActive === true) {
            setnotifModalTitle('Hapus data usulan?')
            setnotifModalMessage(`hapus data usulan atas ${tambahContainer.NamaWP} (${tambahContainer.NPWP})?`)
            setnotifModalButton(true)
            setNotifStatus('delete-usulan')
            setnotifModal(true)
        } else if (editActive === false) {
            setEditActive(false)
            setTambahContainer(emptyContainer);
            settambahModal(false);
        }
    }

    function submit() {
        //! ADD
        if (
            editActive === false &&
            tambahContainer.NomorSP2 === '' &&
            tambahContainer.NPWP.length > 0 &&
            tambahContainer.NamaWP.length > 0 &&
            tambahContainer.NomorUsulanPemeriksaan.length > 0 &&
            tambahContainer.TanggalUsulan.length > 0 &&
            tambahContainer.PeriodePajak.length > 0 &&
            tambahContainer.Kode.length > 0 &&
            tambahContainer.alamatWP.length > 0
        ) {
            // set notif - submit confirm 
            setnotifModalTitle('Tambah data usulan?')
            setnotifModalMessage(`Tambah data usulan atas ${tambahContainer.NamaWP} (${tambahContainer.NPWP})?`)
            setNotifStatus('submit-usulan')
            setnotifModalButton(true)
            setnotifModal(true)
        } else if (
            editActive === false && tambahContainer.NomorSP2 !== '' &&
            tambahContainer.TanggalSP2 !== '' &&
            tambahContainer.NPWP.length > 0 &&
            tambahContainer.NamaWP.length > 0 &&
            tambahContainer.NomorUsulanPemeriksaan.length > 0 &&
            tambahContainer.TanggalUsulan.length > 0 &&
            tambahContainer.PeriodePajak.length > 0 &&
            tambahContainer.Kode.length > 0 &&
            tambahContainer.alamatWP.length > 0
        ) {
            // set notif - submit confirm 
            setnotifModalTitle('Tambah data Tunggakan?')
            setnotifModalMessage(`Submit data Tunggakan atas ${tambahContainer.NamaWP} (${tambahContainer.NPWP})?`)
            setNotifStatus('submit-usulan')
            setnotifModalButton(true)
            setnotifModal(true)
            //! EDIT
        } else if (
            editActive === true && tambahContainer.NomorSP2 === '' &&
            tambahContainer.NPWP.length > 0 &&
            tambahContainer.NamaWP.length > 0 &&
            tambahContainer.NomorUsulanPemeriksaan.length > 0 &&
            tambahContainer.TanggalUsulan.length > 0 &&
            tambahContainer.PeriodePajak.length > 0 &&
            tambahContainer.Kode.length > 0 &&
            tambahContainer.alamatWP.length > 0
        ) {
            loading(true)
            axios.patch(serverOrigin + `pemeriksaan/montung/${tambahContainer._id}`, tambahContainer, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                    let usulanIdx = montung.findIndex(i => i._id == tambahContainer._id)
                    const montungUpdated = [...montung]
                    montungUpdated[usulanIdx] = tambahContainer
                    setMontung(montungUpdated)
                    setTambahContainer(emptyContainer);
                    settambahModal(false);
                }).catch((err) => {
                    const logStatus = err?.response?.data?.login
                    if (logStatus === false) {
                        return window.location.reload()
                    }
                    console.log(err.response)
                })

            loading(false)
        } else if (
            editActive === true && tambahContainer.NomorSP2 !== '' &&
            tambahContainer.TanggalSP2 !== '' &&
            tambahContainer.NPWP.length > 0 &&
            tambahContainer.NamaWP.length > 0 &&
            tambahContainer.NomorUsulanPemeriksaan.length > 0 &&
            tambahContainer.TanggalUsulan.length > 0 &&
            tambahContainer.PeriodePajak.length > 0 &&
            tambahContainer.Kode.length > 0 &&
            tambahContainer.alamatWP.length > 0
        ) {
            setnotifModalTitle('Tambah data Tunggakan?')
            setnotifModalMessage(`Submit data Tunggakan atas ${tambahContainer.NamaWP} (${tambahContainer.NPWP})?`)
            setNotifStatus('update-usulan')
            setnotifModalButton(true)
            setnotifModal(true)
        } else {
            setnotifModalTitle('Data tidak lengkap!')
            setnotifModalMessage(`Mohon lengkapi form pemeriksaan sebelum update data usulan (minimal memuat Nama, NPWP, Alamat, Nomor Usulan, Tanggal Usulan, Masa, dan Kode Pemeriksaan) dan tanggal SP2 jika nomor SP2 diinput.`)
            setnotifModalButton(false)
            setnotifModal(true)
        }
    }

    function closeModal() {
        if (editActive === false) {
            setEditActive(false);
            settambahModal(false);
        } else if (editActive === true) {
            setTambahContainer(emptyContainer);
            setEditActive(false);
            settambahModal(false);
        }
    }


    function printSpv() {
        loading(true)
        axios.post(serverOrigin + 'cetak/auditplan', { tambahContainer }, { withCredentials: true, responseType: 'blob' })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${tambahContainer.NamaWP}.docx`); //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
                loading(false)
            }).catch((err) => {
                console.log(err.response)
                loading(false)
            })
    }

    function autoInputNPWP() {
        if (tambahContainer.NPWP.length == 15) {
            axios.get(serverOrigin + `masterfile/${tambahContainer.NPWP}`)
                .then((res) => {
                    // console.log(res.data.found)
                    const dataWP = res?.data?.found
                    if (dataWP !== null) {
                        setTambahContainer({
                            ...tambahContainer,
                            NPWP: dataWP.NPWP,
                            alamatWP: dataWP.ALAMAT,
                            KLU: dataWP.NAMA_KLU,
                            AR: dataWP.NAMA_AR,
                            Jenis: dataWP.STATUS,
                            NamaWP: dataWP.NAMA_WP,
                        })
                    } else { }
                }).catch((err) => {
                    if (err?.response?.data?.login == false) {
                        window.location.reload()
                    } else {
                        console.log(err.response)
                    }
                })
        } else { }
    }

    function AutoInputKode() {
        if (tambahContainer.Kode.length >= 4) {
            axios.get(serverOrigin + `pemeriksaan/kode/${tambahContainer.Kode}`)
                .then((res) => {
                    // console.log(res)
                    const dataKode = res?.data
                    if (dataKode !== null) {
                        setTambahContainer({
                            ...tambahContainer,
                            DeskripsiKode: dataKode.deskripsiKode,
                            Kriteria: dataKode.kriteria
                        })
                    } else { }
                }).catch((err) => {
                    if (err?.response?.data?.login == false) {
                        window.location.reload()
                    } else {
                        console.log(err.response)
                    }
                })
        } else { }
    }

    return (
        <motion.div className="tambah-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }}>
            <div className="tambah-modal-inner">
                <div className="tambah-modal-title">
                    <h3>
                        {editActive ? `Edit Usulan Pemeriksaan (${tambahContainer.NamaWP})` : 'Tambah Data Pemeriksaan'}
                    </h3>
                </div>
                <div className='tambah-modal-close' onClick={closeModal} ><FaRegWindowClose size={20} color='#fdbc2c' /></div>
                <div className="content-container">
                    <div className="tambah-modal-content">
                        <div className="tambah-modal-sub-title">
                            <h3>
                                <FaEdit /> {'Usulan & Instruksi'}
                            </h3>
                        </div>
                        <div className="input-group-1">
                            <div className='modal-input-container'>
                                <label id='tambah-npwp-logo' htmlFor="tambah-npwp"></label>
                                <input onBlur={autoInputNPWP} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => npwpInput(e)} value={tambahContainer.NPWP} type="number" id='tambah-npwp' required />
                                <label className='tambah-modal-text' htmlFor="tambah-npwp">NPWP</label>
                                <label className='tambah-modal-line' htmlFor="tambah-npwp"></label>
                            </div>
                            <div className='modal-input-container'>
                                <input maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, NamaWP: e.target.value })} value={tambahContainer.NamaWP} type="text" id='tambah-nama' required />
                                <label className='tambah-modal-text' htmlFor="tambah-nama">NAMA</label>
                                <label className='tambah-modal-line' htmlFor="tambah-nama"></label>
                            </div>
                            <div className='modal-input-container'>
                                <input maxLength={150} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, alamatWP: e.target.value })} value={tambahContainer.alamatWP} type="text" id='tambah-alamat' required />
                                <label className='tambah-modal-text' htmlFor="tambah-alamat">ALAMAT</label>
                                <label className='tambah-modal-line' htmlFor="tambah-alamat"></label>
                            </div>
                            <div className='modal-input-container'>
                                <input maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, KLU: e.target.value })} value={tambahContainer.KLU} type="text" id='tambah-klu' required />
                                <label className='tambah-modal-text' htmlFor="tambah-klu">KLU</label>
                                <label className='tambah-modal-line' htmlFor="tambah-klu"></label>
                            </div>
                            <div className='modal-input-container'>
                                <input maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, AR: e.target.value })} value={tambahContainer.AR} type="text" id='tambah-ar' required />
                                <label className='tambah-modal-text' htmlFor="tambah-ar">AR</label>
                                <label className='tambah-modal-line' htmlFor="tambah-ar"></label>
                            </div>
                            <div className='modal-input-container' id='tambah-jenis-wp'>
                                <FaEdit color='#fdbc2c' /> &nbsp;
                                <select onChange={e => setTambahContainer({ ...tambahContainer, Jenis: e.target.value })} value={tambahContainer.Jenis === null ? 'Strategis' : tambahContainer.Jenis}>
                                    <option value="Strategis">WP Strategis</option>
                                    <option value="Kewilayahan">WP Kewilayahan</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group-2">
                            <div className='modal-input-container'>
                                <input autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => masaInput(e)} value={tambahContainer.PeriodePajak} type="text" id='tambah-masa' required />
                                <label className='tambah-modal-text' htmlFor="tambah-masa">MASA</label>
                                <label className='tambah-modal-line' htmlFor="tambah-masa"></label>
                            </div>
                            <div className='modal-input-container'>
                                <input onBlur={AutoInputKode} maxLength={6} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, Kode: e.target.value })} value={tambahContainer.Kode} type="text" id='tambah-kode' required />
                                <label className='tambah-modal-text' htmlFor="tambah-kode">KODE</label>
                                <label className='tambah-modal-line' htmlFor="tambah-kode"></label>
                            </div>
                            <div className='modal-input-container' id='tambah-deskripsiKode'>
                                <input maxLength={150} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => setTambahContainer({ ...tambahContainer, DeskripsiKode: e.target.value })} value={tambahContainer.DeskripsiKode} type="text" id='tambah-deskripsi-kode' required />
                                <label id='tambah-modal-deskripsiKode' className='tambah-modal-text' htmlFor="tambah-deskripsi-kode">DESKRIPSI KODE</label>
                                <label id='tambah-modal-deskripKode-garis' className='tambah-modal-line' htmlFor="tambah-deskripsi-kode"></label>
                            </div>

                        </div>
                        <div className="input-group-3">
                            {/* usulan */}
                            <div className='modal-input-container' id='tambah-nomorUsulan'>
                                <input maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => usulanInput(e)} value={tambahContainer.NomorUsulanPemeriksaan} type="text" id='tambah-nomor-usulan' required />
                                <label id='tambah-nomor-usulan-label' className='tambah-modal-text' htmlFor="tambah-nomor-usulan">NOMOR USULAN</label>
                                <label id='tambah-nomor-usulan-garis' className='tambah-modal-line' htmlFor="tambah-nomor-usulan"></label>
                            </div>
                            <div className='modal-input-container' id='tambah-tanggal-usulan'>
                                <input type="date" min='2021-01-31' max='2023-12-31' className="tambah-modal-date" disabled={tambahContainer.NomorUsulanPemeriksaan.length < 1 ? true : false} onChange={e => setTambahContainer({ ...tambahContainer, TanggalUsulan: e.target.value })} value={tambahContainer.TanggalUsulan} />
                            </div>
                            {/* instruksi */}
                            <div className='modal-input-container' id='tambah-nomorInstruksi'>
                                <input maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => instruksiInput(e)} value={tambahContainer.NomorInstruksiPemeriksaan} type="text" id='tambah-nomor-instruksi' required />
                                <label id='tambah-nomor-usulan-label' className='tambah-modal-text' htmlFor="tambah-nomor-instruksi">NOMOR INSTRUKSI</label>
                                <label id='tambah-nomor-usulan-garis' className='tambah-modal-line' htmlFor="tambah-nomor-instruksi"></label>
                            </div>
                            <div className='modal-input-container' id='tambah-tanggal-instruksi'>
                                <input type="date" min='2021-01-31' max='2023-12-31' className="tambah-modal-date" disabled={tambahContainer.NomorInstruksiPemeriksaan.length < 1 ? true : false} onChange={e => setTambahContainer({ ...tambahContainer, TanggalInstruksi: e.target.value })} value={tambahContainer.TanggalInstruksi} />
                            </div>
                        </div>
                        <div className="tambah-modal-sub-title">
                            <h3>
                                <FaEdit />{' Audit Plan'}
                            </h3>
                        </div>
                        <div className="input-group-4">

                            {/* Penunjukan SPV */}
                            <div className='modal-input-container' id='tambah-nomorUsulan'>
                                <input ref={penunjukanRef} maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => penunjukanSPVinput(e)} value={tambahContainer.PenunjukanSupervisor} type="text" id='tambah-nomor-penunjukanSpv' required />
                                <label id='tambah-nomor-usulan-label' className='tambah-modal-text' htmlFor="tambah-nomor-penunjukanSpv">PENUNJUKAN SPV</label>
                                <label id='tambah-nomor-usulan-garis' className='tambah-modal-line' htmlFor="tambah-nomor-penunjukanSpv"></label>

                                <div className='modal-input-container' id='tambah-spv'>
                                    <p>Supervisor : &nbsp;  </p>
                                    <label htmlFor="spv-select"><FaEdit color='#fdbc2c' /> &nbsp;
                                        <select id="spv-select" name='spv-select' onChange={e => setTambahContainer({ ...tambahContainer, NamaSupervisor: e.target.value })} value={tambahContainer.NamaSupervisor === null ? '' : tambahContainer.NamaSupervisor}>
                                            <option value="---">---</option>
                                            <option value="Cahyo">Cahyo Nurseto</option>
                                            <option value="Sriyanto">Sriyanto</option>
                                        </select>
                                    </label>
                                </div>

                            </div>
                            <div className='modal-input-container' id='tambah-tanggal-usulan'>
                                <input type="date" min='2021-01-31' max='2023-12-31' className="tambah-modal-date" disabled={tambahContainer.PenunjukanSupervisor.length < 1 ? true : false} onChange={e => setTambahContainer({ ...tambahContainer, TanggalPenunjukanSupervisor: e.target.value })} value={tambahContainer.TanggalPenunjukanSupervisor} />
                            </div>
                            {/* Audit Plan */}
                            <div className='modal-input-container' id='tambah-nomorInstruksi'>
                                <input ref={auditPlanRef} maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah'
                                    onChange={e => auditPlanInput(e)} value={tambahContainer.AuditPlan}
                                    type="text" id='tambah-nomor-auditplan' required />
                                <label id='tambah-nomor-usulan-label' className='tambah-modal-text' htmlFor="tambah-nomor-auditplan">AUDIT PLAN</label>
                                <label id='tambah-nomor-usulan-garis' className='tambah-modal-line' htmlFor="tambah-nomor-auditplan"></label>
                                <div className='modal-input-container' id='tambah-tim'>
                                    <p>Tambah Tim Pemeriksa : &nbsp;  </p>
                                    <label onClick={() => settamabahTim(true)} htmlFor="fpp-select"><FaUserPlus id='tambah-modal-tambah-tim' size={18} /> &nbsp;
                                    </label>
                                </div>
                            </div>
                            <div className='modal-input-container' id='tambah-tanggal-instruksi'>
                                <input type="date" min='2021-01-31' max='2023-12-31' className="tambah-modal-date" disabled={tambahContainer.AuditPlan.length < 1 ? true : false}  onChange={e => setTambahContainer({ ...tambahContainer, TanggalAuditPlan: e.target.value })} value={tambahContainer.TanggalAuditPlan} />
                            </div>
                        </div>
                        <div className="tambah-modal-sub-title">
                            <h3>
                                <FaEdit />{' Surat Perintah Pemeriksaan (SP2)'}
                            </h3>
                        </div>
                        <div className="input-group-4">
                            {/* Penunjukan SPV */}
                            <div className="input-group-4x">
                                <div className='modal-input-container' id='tambah-nomorUsulan'>
                                    <input ref={SP2ref} maxLength={50} autoComplete='off' spellCheck='false' className='modal-input-tambah' onChange={e => SP2Input(e)} value={tambahContainer.NomorSP2} type="text" id='tambah-nomor-SP2' required />
                                    <label id='tambah-nomor-usulan-label' className='tambah-modal-text' htmlFor="tambah-nomor-SP2">NOMOR SP2</label>
                                    <label id='tambah-nomor-usulan-garis' className='tambah-modal-line' htmlFor="tambah-nomor-SP2"></label>
                                    <p id='input-group-4x-notice'>Jika nomor & tanggal SP2 diinput maka usulan akan menjadi tunggakan saat submit!</p>
                                </div>
                                <div className='modal-input-container' id='tambah-tanggal-usulan'>
                                    <input type="date" min='2021-01-31' max='2023-12-31' className="tambah-modal-date" disabled={tambahContainer.NomorSP2.length < 1 ? true : false}   onChange={e => setTambahContainer({ ...tambahContainer, TanggalSP2: e.target.value })} value={tambahContainer.TanggalSP2} />
                                </div>
                            </div>
                            <div className="tambah-modal-buttons">
                                <button onClick={printSpv} className='tambah-modal-button' id='tambah-modal-button-cetaktunjukspv'><FaFileDownload size={15} />Penunjukan SPV</button>
                                <button onClick={() => console.log('cetak SP2')} className='tambah-modal-button' id='tambah-modal-button-cetaktunjukspv'><FaFileDownload size={15} />SP2</button>
                                <button onClick={submit} className='tambah-modal-button' id='tambah-modal-button-submit'><FaCheckDouble size={15} />Submit</button>
                                <button onClick={discard} className='tambah-modal-button' id='tambah-modal-button-discard'><FaWindowClose size={15} />Discard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default TambahModal