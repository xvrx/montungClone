import { useState, createContext } from 'react'

export const TambahContext = createContext()

export const TambahProvider = props => {
    const emptyContainer = {
        NPWP: '',
        NamaWP: '',
        alamatWP: '',
        KLU: '',
        AR: '',
        PeriodePajak: '',
        Kode: '',
        DeskripsiKode: '',
        Kriteria: '',
        PotensiDSPP: 0,
        Jenis: 'Strategis',
        ProfileWP: '',
        NomorUsulanPemeriksaan: '',
        TanggalUsulan: '',
        NomorInstruksiPemeriksaan: '',
        TanggalInstruksi: '',
        PenunjukanSupervisor: '',
        TanggalPenunjukanSupervisor: '',
        AuditPlan: '',
        TanggalAuditPlan: '',
        NamaSupervisor: 'Cahyo',
        NamaKetuaTim: '',
        NamaAnggotaTim1: '',
        NamaAnggotaTim2: '',
        PIC: 'Cahyo',
        TanggalMulaiPemeriksaan: '',
        NomorSP2: '',
        TanggalSP2: '',
        NomorSPHP: '',
        TanggalSPHP: '',
        LHP: '',
        TanggalLHP: '',
        NilaiKonversi: 0,
        NilaiSKPTerbit: 0,
        NilaiLBterbit: 0,
        TanggalProyeksiLHP: '',
        NilaiProyeksiSKP: 0,
        NilaiProyeksiLB: 0,
        NilaiProyeksiPencairan: 0,
        TanggalProyeksiPencairan: '',
        NilaiPencairan: 0,
        Disetujui: 0,
        Tahapan: [],
        Kendala: '',
        reviewAtasan: ''
    }



    const [tambahContainer, setTambahContainer] = useState({
        NPWP: '',
        NamaWP: '',
        alamatWP: '',
        KLU: '',
        AR: '',
        PeriodePajak: '',
        Kode: '',
        DeskripsiKode: '',
        Kriteria: '',
        PotensiDSPP: 0,
        Jenis: 'Strategis',
        ProfileWP: '',
        NomorUsulanPemeriksaan: '',
        TanggalUsulan: '',
        NomorInstruksiPemeriksaan: '',
        TanggalInstruksi: '',
        PenunjukanSupervisor: '',
        TanggalPenunjukanSupervisor: '',
        AuditPlan: '',
        TanggalAuditPlan: '',
        NamaSupervisor: 'Cahyo',
        NamaKetuaTim: '',
        NamaAnggotaTim1: '',
        NamaAnggotaTim2: '',
        PIC: 'Cahyo',
        TanggalMulaiPemeriksaan: '',
        NomorSP2: '',
        TanggalSP2: '',
        NomorSPHP: '',
        TanggalSPHP: '',
        LHP: '',
        TanggalLHP: '',
        NilaiKonversi: 0,
        NilaiSKPTerbit: 0,
        NilaiLBterbit: 0,
        TanggalProyeksiLHP: '',
        NilaiProyeksiSKP: 0,
        NilaiProyeksiLB: 0,
        NilaiProyeksiPencairan: 0,
        TanggalProyeksiPencairan: '',
        NilaiPencairan: 0,
        Disetujui: 0,
        Tahapan: [],
        Kendala: '',
        reviewAtasan: ''
    })

    const [tunggakanContainer, setTunggakanContainer] = useState({
        NPWP: '',
        NamaWP: '',
        alamatWP: '',
        KLU: '',
        AR: '',
        PeriodePajak: '',
        Kode: '',
        DeskripsiKode: '',
        Kriteria: '',
        PotensiDSPP: 0,
        Jenis: 'Strategis',
        ProfileWP: '',
        NomorUsulanPemeriksaan: '',
        TanggalUsulan: '',
        NomorInstruksiPemeriksaan: '',
        TanggalInstruksi: '',
        PenunjukanSupervisor: '',
        TanggalPenunjukanSupervisor: '',
        AuditPlan: '',
        TanggalAuditPlan: '',
        NamaSupervisor: 'Cahyo',
        NamaKetuaTim: '',
        NamaAnggotaTim1: '',
        NamaAnggotaTim2: '',
        PIC: 'Cahyo',
        TanggalMulaiPemeriksaan: '',
        NomorSP2: '',
        TanggalSP2: '',
        NomorSPHP: '',
        TanggalSPHP: '',
        LHP: '',
        TanggalLHP: '',
        NilaiKonversi: 0,
        NilaiSKPTerbit: 0,
        NilaiLBterbit: 0,
        TanggalProyeksiLHP: '',
        NilaiProyeksiSKP: 0,
        NilaiProyeksiLB: 0,
        NilaiProyeksiPencairan: 0,
        TanggalProyeksiPencairan: '',
        NilaiPencairan: 0,
        Disetujui: 0,
        Tahapan: [],
        Kendala: '',
        reviewAtasan: ''
    })

    const [tahapanContainer, settahapanContainer] = useState({
        tanggal: '',
        namaTahapan: '',
        deskripsiTahapan: ''
    })

    const [optionLHP, setoptionLHP] = useState({
        _id: '',
        NilaiPencairan: 0,
        tanggalPencairan: '',
        sisaPencairan: 0,
        TanggalProyeksiPencairan: '',
        NilaiSKPTerbit: 0
    })


    return (
        <TambahContext.Provider value={{
            tambahContainer,
            setTambahContainer,
            emptyContainer,
            tunggakanContainer,
            setTunggakanContainer,
            tahapanContainer,
            settahapanContainer,
            optionLHP, setoptionLHP
        }}>
            {props.children}
        </TambahContext.Provider>
    )
}