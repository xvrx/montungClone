import React, { useContext } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import './NotifModal.css'
import { motion } from 'framer-motion'
import { ModalContext } from '../../Context/modalContext/ModalContext'
import { TambahContext } from '../../Context/modalContext/TambahContext'
import { MontungContext } from '../../Context/MontungContext'
import axios from 'axios'
axios.defaults.withCredentials = true

const NotifModal = () => {

    const { setTunggakanModal, notifStatus, setnotifModalTitle, setnotifModalMessage, setnotifModalButton, setnotifModal, notifModalMessage, notifModalTitle, notifModalButton, settambahModal, setEditActive
    } = useContext(ModalContext)

    const { tahapanContainer, settahapanContainer, tunggakanContainer, setTunggakanContainer, tambahContainer, setTambahContainer, emptyContainer } = useContext(TambahContext)

    const { loading, montung, setMontung, serverOrigin } = useContext(MontungContext)

    function usulanDelete() {
        loading(true)

        axios.delete(serverOrigin + `pemeriksaan/montung/${tambahContainer._id}`, { withCredentials: true })
            .then(res => {
                console.log(res)
                const filteredMontung = montung.filter((el) => {
                    return el._id != tambahContainer._id
                })
                setMontung(filteredMontung)
                setEditActive(false)
                setTambahContainer(emptyContainer);
                setnotifModal(false)
                settambahModal(false)
            }).catch((err) => {
                console.log(err.response)
                setnotifModal(false)
                if (err.response.data.login === false) {
                    setTimeout(() => { window.location.reload() }, 1000);
                }
            })
        loading(false)
    }

    function usulanSubmit() {
        loading(true)
        axios.post(serverOrigin + 'pemeriksaan/montung', tambahContainer, { withCredentials: true })
            .then((res) => {
                const a = res?.data?.data
                console.log(res)
                if (a !== null) {
                    setMontung([...montung, a])
                    setTambahContainer(emptyContainer);
                    settambahModal(false)
                    setnotifModal(false)
                    setnotifModalButton(false)
                    setnotifModalTitle('')
                    setnotifModalMessage('')
                } else { }
            }).catch((err) => {
                if (err.response.data.login === false) {
                    setTimeout(() => { window.location.reload() }, 1000);
                }
                console.log(err.response)
                setnotifModal(false)
                setnotifModalButton(false)
                setnotifModalTitle('')
                setnotifModalMessage('')
            })

        loading(false)
    }

    function usulanCancelDelete() {
        setnotifModal(false)
        setnotifModalButton(false)
        setnotifModalTitle('')
        setnotifModalMessage('')
    }

    function usulanUpdate() {
        axios.patch(serverOrigin + `pemeriksaan/montung/${tambahContainer._id}`, tambahContainer, { withCredentials: true })
            .then((res) => {
                console.log(res)
                let usulanIdx = montung.findIndex(i => i._id == tambahContainer._id)
                const montungUpdated = [...montung]
                montungUpdated[usulanIdx] = tambahContainer
                setMontung(montungUpdated)
            }).catch((err) => {
                console.log(err.response)
                if (err.response.data.login === false) {
                    setTimeout(() => { window.location.reload() }, 1000);
                }
            })
        setTambahContainer(emptyContainer);
        settambahModal(false);
        setnotifModal(false)
        setnotifModalButton(false)
        setnotifModalTitle('')
        setnotifModalMessage('')
    }

    function tunggakanLHPupdate() {
        loading(true)

        let tunggakanIdx = montung.findIndex(i => i._id === tunggakanContainer._id)

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

          const montungUpdated = [...montung]
          montungUpdated[tunggakanIdx] = tunggakanContainer
          setMontung(montungUpdated)
          setTunggakanContainer(emptyContainer);
          setnotifModal(false)
          setTunggakanModal(false);
          setnotifModalButton(false)
          setnotifModalTitle('')
          setnotifModalMessage('')
          

          setTunggakanModal(false);
          setTunggakanContainer(emptyContainer);
        })
        .catch((err) => {
          if (err?.response?.data?.login === false) {
            window.location.reload()
          }
          console.log(err.response);
        });

        loading(false)
    }

    function tahapanDeleteConfirm() {
        const containerIdx = tahapanContainer.namaTahapan
        const filteredTahapan = tunggakanContainer.Tahapan.filter((a, b) => {
            return b !== containerIdx
        })
        const newTanggalMulai = filteredTahapan[filteredTahapan.length - 1]?.tanggal
        setTunggakanContainer({ ...tunggakanContainer, TanggalMulaiPemeriksaan: newTanggalMulai === undefined ? '' : newTanggalMulai, Tahapan: filteredTahapan })
        settahapanContainer({
            tanggal: '',
            namaTahapan: '',
            deskripsiTahapan: ''
        })
        setnotifModal(false)
        setnotifModalButton(false)
        setnotifModalTitle('')
        setnotifModalMessage('')
    }

    return (
        <motion.div className="notif-modal-subcontainer" animate={{ scale: 1, transition: { duration: 0.25 } }} initial={{ scale: 0 }}>
            <div className="notif-modal-inner">
                <div className="notif-modal-title">
                    <h3>
                        {notifModalTitle}
                    </h3>
                </div>
                <div className='notif-modal-close' onClick={() => setnotifModal(false)}><FaRegWindowClose size={20} color='#fdbc2c' /></div>
                <div className="notif-content-container">
                    <div className="notif-modal-content">
                        <p>
                            {notifModalMessage}
                        </p>
                    </div>
                    {notifModalButton && <div className="notif-modal-button">
                        <button
                            onClick={
                                notifStatus === 'delete-usulan' ? usulanDelete :
                                    notifStatus === 'submit-usulan' ? usulanSubmit :
                                        notifStatus === 'update-usulan' ? usulanUpdate :
                                            notifStatus === 'submit-lhp' ? tunggakanLHPupdate :
                                                notifStatus === 'delete-tahapan' ? tahapanDeleteConfirm :
                                                    null
                            }
                            className='tambah-modal-button' id='tambah-modal-button-submit'>Ya!</button>
                        <button
                            onClick={usulanCancelDelete}
                            className='tambah-modal-button' id='tambah-modal-button-discard'>No!</button>
                    </div>}
                </div>
            </div>
        </motion.div>
    )
}

export default NotifModal