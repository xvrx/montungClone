const route = require('express').Router()
const xlsx = require('xlsx')
const express = require('express')
const verify = require('../auth/verify')



route.post('/usulan', verify, async (req, res) => {
    const attached = req.body
    
    if (attached.length === 0) {
        res.status(400).json(
            {message:"No records found!"}
        )
    } else {
        try {
            const file = req.body
            // console.log(file)
            if (!file) return res.status(404).json({ message: 'request body is not available!' })
            const stripped = []
            await file.forEach((obj, idx) => stripped.push(
                {
                    NO: idx + 1,
                    NAMA: obj?.NamaWP,
                    NPWP: obj?.NPWP,
                    MASA: obj?.PeriodePajak,
                    KODE: obj?.PeriodePajak,
                    KETERANGAN_KODE: obj?.DeskripsiKode,
                    KRITERIA: obj?.Kriteria,
                    POTENSI_DSPP: obj?.PotensiDSPP,
                    JENIS_WP: obj?.Jenis,
                    NOMOR_USULAN: obj?.NomorUsulanPemeriksaan,
                    TANGGAL_USULAN: obj?.TanggalUsulan,
                    NOMOR_INSTRUKSI: obj?.NomorInstruksiPemeriksaan,
                    TANGGAL_INSTRUKSI: obj?.TanggalInstruksi,
                    NOMOR_NDSUPERVISOR: obj?.PenunjukanSupervisor,
                    TANGGAL_NDSUPERVISOR: obj?.TanggalPenunjukanSupervisor,
                    NOMOR_AUDITPLAN: obj?.AuditPlan,
                    TANGGAL_AUDITPLAN: obj?.TanggalAuditPlan,
                    SUPERVISOR: obj?.NamaSupervisor
                }
            ))
    
            // console.log(stripped)
            // res.send('file accessed!')
            let stringify = JSON.stringify(stripped)
            stringify = JSON.parse(stringify)
            const newBook = xlsx.utils.book_new()
            const newSheet = xlsx.utils.json_to_sheet(stringify)
            const downloadXls = './download/usulan.xlsx'
            xlsx.utils.book_append_sheet(newBook, newSheet, 'usulan')
            xlsx.writeFile(newBook, downloadXls)
            res.set({
                'content-type': 'application/octet-stream',
                'content-disposition': 'attachment;filename=' + encodeURI(downloadXls)
            })
            res.download('./download/usulan.xlsx')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})


route.post('/tunggakan', verify, async (req, res) => {
    // console.log(req.sessionID)
    if (req?.body?.length === 0) {
        res.status(400).json(
            {message:"No records found!"}
        ) 
    } else {
        try {
            const file = req.body
            // console.log(file)
            if (!file) return res.status(404).json({ message: 'request body is not available!' })
            // res.send('you"re acccessing tunggakan!')
            const stripped = []
            await file.forEach((obj, idx) => stripped.push(
                {
                    NO: idx + 1,
                    NAMA: obj?.NamaWP,
                    NPWP: obj?.NPWP,
                    MASA: obj?.PeriodePajak,
                    KODE: obj?.PeriodePajak,
                    KETERANGAN_KODE: obj?.DeskripsiKode,
                    KRITERIA: obj?.Kriteria,
                    POTENSI_DSPP: obj?.PotensiDSPP,
                    JENIS_WP: obj?.Jenis,
                    NOMOR_USULAN: obj?.NomorUsulanPemeriksaan,
                    TANGGAL_USULAN: obj?.TanggalUsulan,
                    NOMOR_INSTRUKSI: obj?.NomorInstruksiPemeriksaan,
                    TANGGAL_INSTRUKSI: obj?.TanggalInstruksi,
                    NOMOR_NDSUPERVISOR: obj?.PenunjukanSupervisor,
                    TANGGAL_NDSUPERVISOR: obj?.TanggalPenunjukanSupervisor,
                    NOMOR_AUDITPLAN: obj?.AuditPlan,
                    TANGGAL_AUDITPLAN: obj?.TanggalAuditPlan,
                    SUPERVISOR: obj?.NamaSupervisor,
                    NOMOR_SP2: obj?.NomorSP2,
                    TANGGAL_SP2: obj?.TanggalSP2,
                    PROYEKSI_KONVERSI: obj?.NilaiKonversi,
                    PROFILE: obj?.ProfileWP,
                    PROYEKSI_SELESAI: obj?.TanggalProyeksiLHP,
                    POTENSI_DSPP: obj?.PotensiDSPP,
                    PROYEKSI_SKP: obj?.NilaiProyeksiSKP,
                    PROYEKSI_LB: obj?.NilaiProyeksiLB,
                    TAHAPAN: obj?.Tahapan[0]?.deskripsiTahapan || '',
                    KENDALA: obj?.Kendala,
                    REVIEW: obj?.reviewAtasan,
                    PIC: obj?.PIC
                }
            ))
    
            // console.log(stripped)
            // res.send('file accessed!')
            let stringify = JSON.stringify(stripped)
            stringify = JSON.parse(stringify)
            const newBook = xlsx.utils.book_new()
            const newSheet = xlsx.utils.json_to_sheet(stringify)
            const downloadXls = './download/tunggakan.xlsx'
            xlsx.utils.book_append_sheet(newBook, newSheet, 'Tunggakan')
            xlsx.writeFile(newBook, downloadXls)
            res.set({
                'content-type': 'application/octet-stream',
                'content-disposition': 'attachment;filename=' + encodeURI(downloadXls)
            })
            res.download('./download/tunggakan.xlsx')
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }


    
})


route.post('/selesai', verify, async (req, res) => {
    if (req?.body?.length === 0) {
        res.status(400).json(
            {message:"No records found!"}
        ) 
    } else {
    try {
        const file = req.body
        // console.log(file)
        if (!file) return res.status(404).json({ message: 'request body is not available!' })
        // res.send('you"re acccessing tunggakan!')
        const stripped = []
        await file.forEach((obj, idx) => stripped.push(
            {
                NO: idx + 1,
                NAMA: obj?.NamaWP,
                NPWP: obj?.NPWP,
                MASA: obj?.PeriodePajak,
                KODE: obj?.PeriodePajak,
                KETERANGAN_KODE: obj?.DeskripsiKode,
                KRITERIA: obj?.Kriteria,
                POTENSI_DSPP: obj?.PotensiDSPP,
                JENIS_WP: obj?.Jenis,
                NOMOR_USULAN: obj?.NomorUsulanPemeriksaan,
                TANGGAL_USULAN: obj?.TanggalUsulan,
                NOMOR_INSTRUKSI: obj?.NomorInstruksiPemeriksaan,
                TANGGAL_INSTRUKSI: obj?.TanggalInstruksi,
                NOMOR_NDSUPERVISOR: obj?.PenunjukanSupervisor,
                TANGGAL_NDSUPERVISOR: obj?.TanggalPenunjukanSupervisor,
                NOMOR_AUDITPLAN: obj?.AuditPlan,
                TANGGAL_AUDITPLAN: obj?.TanggalAuditPlan,
                NOMOR_SP2: obj?.NomorSP2,
                TANGGAL_SP2: obj?.TanggalSP2,
                SUPERVISOR: obj?.NamaSupervisor,
                KETUA_TIM: obj?.NamaKetuaTim,
                ANGGOTA_1: obj?.NamaAnggotaTim1,
                ANGGOTA_2: obj?.NamaAnggotaTim2,
                NOMOR_SP2: obj?.NomorSP2,
                TANGGAL_SP2: obj?.TanggalSP2,
                NOMOR_LHP: obj?.LHP,
                TANGGAL_LHP: obj?.TanggalLHP,
                SKP_TERBIT: obj?.NilaiSKPTerbit,
                SKP_DISETUJUI: obj?.Disetujui,
                PENCAIRAN: obj?.NilaiPencairan,
                KONVERSI: obj?.NilaiKonversi,
                POTENSI_DSPP: obj?.PotensiDSPP,
                PIC: obj?.PIC
            }
        ))

        // console.log(stripped)
        // res.send('file accessed!')
        let stringify = JSON.stringify(stripped)
        stringify = JSON.parse(stringify)
        const newBook = xlsx.utils.book_new()
        const newSheet = xlsx.utils.json_to_sheet(stringify)
        const downloadXls = './download/selesai.xlsx'
        xlsx.utils.book_append_sheet(newBook, newSheet, 'LHP selesai')
        xlsx.writeFile(newBook, downloadXls)
        res.set({
            'content-type': 'application/octet-stream',
            'content-disposition': 'attachment;filename=' + encodeURI(downloadXls)
        })
        res.download('./download/selesai.xlsx')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }}
})

module.exports = route