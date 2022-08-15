import React, { useContext } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import './TambahTim.css'
import { motion } from 'framer-motion'
import { ModalContext } from '../../Context/modalContext/ModalContext'
import { TambahContext } from '../../Context/modalContext/TambahContext'
import { MontungContext } from '../../Context/MontungContext'

const TambahTim = () => {

    const { tamabahTim, settamabahTim } = useContext(ModalContext)
    const { tunggakanContainer, setTunggakanContainer, tambahContainer, setTambahContainer, emptyContainer } = useContext(TambahContext)
    const { montung, setMontung } = useContext(MontungContext)

    


    return (
        <motion.div className="notif-modal-subcontainer" animate={{ scale: 1, transition: { duration: 0.25 } }} initial={{ scale: 0 }}>
            <div className="tambah-tim-modal-inner">
                <div className="tambah-tim-modal-title">
                    <h3>
                        {`Tim Pemeriksa`}
                    </h3>
                </div>
                <div className="tambah-tim-content-container">
                    <div className="tambah-tim-modal-content">
                        <div className="tim-modal-spv">
                            <label htmlFor="">Supervisor</label>
                            <select 
                            value={tambahContainer.NamaSupervisor === null ? 'Cahyo' : tambahContainer.NamaSupervisor} 
                            onChange={e => setTambahContainer({ ...tambahContainer, NamaSupervisor: e.target.value })}>
                                    <option value="">---</option>
                                    <option value="Cahyo">Cahyo Nurseto</option>
                                    <option value="Sriyanto">Sriyanto</option>
                            </select>
                        </div>
                        <div className="tim-modal-ketua">
                            <label htmlFor="">Ketua Tim</label>
                            <select 
                            onChange={e => setTambahContainer({ ...tambahContainer, NamaKetuaTim: e.target.value })}
                            value={tambahContainer.NamaKetuaTim === null ? 'Agus' : tambahContainer.NamaKetuaTim}>
                                <option value="">---</option>
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
                        <div className="tim-modal-anggota-1">
                            <label htmlFor="">Anggota</label>
                            <select 
                            onChange={e => setTambahContainer({ ...tambahContainer, NamaAnggotaTim1: e.target.value })}
                            value={tambahContainer.NamaAnggotaTim1 === null ? 'Agus' : tambahContainer.NamaAnggotaTim1}>
                                <option value="">---</option>
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
                        <div className="tim-modal-anggota-2">
                            <label htmlFor="">Anggota</label>
                            <select 
                            onChange={e => setTambahContainer({ ...tambahContainer, NamaAnggotaTim2: e.target.value })}
                            value={tambahContainer.NamaAnggotaTim2 === null ? 'Agus' : tambahContainer.NamaAnggotaTim2}>
                                <option value="">---</option>
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
                    <div className="tambah-tim-modal-button">
                        <button className='tambah-modal-button' onClick={() => settamabahTim(false)} id='tambah-modal-button-submit'>Update!</button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default TambahTim