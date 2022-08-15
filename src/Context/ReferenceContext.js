import { useState, createContext } from "react"

export const ReferenceContext = createContext()

export const ReferenceProvider = props => {

    const [kodePemeriksaan, setKodePemeriksaan] = useState([
        {
            "0122": {
                "jenis": "badan-cabang",
                "kriteria": "Rutin",
                "usulan": "kantor",
                "ruangLingkup": "alltaxes",
                "deskripsi": "Likuidasi, Penutupan Usaha, atau meninggalkan Indonesia Selama-lamanya"
            }
        },
        {
            "nomorKode": '1121',
            "jenis": "op",
            "kriteria": "Rutin",
            "usulan": "kantor",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Likuidasi, Penutupan Usaha, atau meninggalkan Indonesia Selama-lamanya"
        },
        {
            "nomorKode": '1122',
            "jenis": "badan",
            "kriteria": "Rutin",
            "usulan": "kantor",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Likuidasi, Penutupan Usaha, atau meninggalkan Indonesia Selama-lamanya"
        },
        {
            "nomorKode": '1161',
            "jenis": "op",
            "kriteria": "Rutin",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Tidak Menyampaikan SPT Tahunan PPh"
        },
        {
            "nomorKode": '1162',
            "jenis": "badan",
            "kriteria": "Rutin",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Tidak Menyampaikan SPT Tahunan PPh"
        },
        {
            "nomorKode": '1171',
            "jenis": "op",
            "kriteria": "Rutin",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "SPT Rugi"
        },
        {
            "nomorKode": '1172',
            "jenis": "badan",
            "kriteria": "Rutin",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "SPT Rugi"
        },
        {
            "nomorKode": '1181',
            "jenis": "op",
            "kriteria": "Rutin LB",
            "usulan": "kantor",
            "ruangLingkup": "alltaxes",
            "deskripsi": "SPT Tahunan PPh Lebih Bayar"
        },
        {
            "nomorKode": '1182',
            "jenis": "badan",
            "kriteria": "Rutin LB",
            "usulan": "kantor",
            "ruangLingkup": "alltaxes",
            "deskripsi": "SPT Tahunan PPh Lebih Bayar"
        },
        {
            "nomorKode": '1452',
            "jenis": "badan",
            "kriteria": "Pemsus",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Hasil analisis CTA"
        },
        {
            "nomorKode": '1461',
            "jenis": "op",
            "kriteria": "Pemsus",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Selain Hasil analisis CTA dan IDLP"
        },
        {
            "nomorKode": '1462',
            "jenis": "badan",
            "kriteria": "Pemsus",
            "usulan": "DSPP",
            "ruangLingkup": "alltaxes",
            "deskripsi": "Selain Hasil analisis CTA dan IDLP"
        },
        {
            "nomorKode": '2181',
            "jenis": "OP",
            "kriteria": "Rutin LB",
            "usulan": "kantor",
            "ruangLingkup": "singletax",
            "deskripsi": "SPT LB Masa  PPN Restitusi/Kompensasi"
        },
        {
            "nomorKode": '2182',
            "jenis": "badan",
            "kriteria": "Rutin LB",
            "usulan": "kantor",
            "ruangLingkup": "singletax",
            "deskripsi": "SPT LB Masa  PPN Restitusi/Kompensasi"
        },
        {
            "nomorKode": '6172',
            "jenis": "badan-cabang",
            "kriteria": "WP Lokasi",
            "usulan": "Permintaan WP Lokasi",
            "ruangLingkup": "singletax",
            "deskripsi": "WP Lokasi - SPT Rugi"
        },
        {
            "nomorKode": '6182',
            "jenis": "badan-cabang",
            "kriteria": "WP Lokasi",
            "usulan": "Permintaan WP Lokasi",
            "ruangLingkup": "singletax",
            "deskripsi": "WP Lokasi - SPT Tahunan PPh Lebih Bayar"
        },
        {
            "nomorKode": '6462',
            "jenis": "badan-cabang",
            "kriteria": "WP Lokasi",
            "usulan": "Permintaan WP Lokasi",
            "ruangLingkup": "singletax",
            "deskripsi": "WP Lokasi - Selain Hasil analisis CTA dan IDLP"
        },
        {
            "nomorKode": '5311',
            "jenis": "op",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "Penerbitan NPWP dan/atau pengukuhan PKP secara jabatan"
        },
        {
            "nomorKode": '5312',
            "jenis": "badan",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "Penerbitan NPWP dan/atau pengukuhan PKP secara jabatan"
        },
        {
            "nomorKode": '5321',
            "jenis": "op",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "Penghapusan NPWP dan/atau pencabutan pengukuhan PKP berdasarkan permohonan WP"
        },
        {
            "nomorKode": '5322',
            "jenis": "badan",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "Penghapusan NPWP dan/atau pencabutan pengukuhan PKP berdasarkan permohonan WP"
        },
        {
            "nomorKode": '5341',
            "jenis": "op",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "penentuan Wajib Pajak berlokasi di daerah terpencil"
        },
        {
            "nomorKode": '5342',
            "jenis": "badan",
            "kriteria": "Tujuan Lain",
            "usulan": "kantor",
            "ruangLingkup": "-",
            "deskripsi": "penentuan Wajib Pajak berlokasi di daerah terpencil"
        }
    ])

    return (
        <ReferenceContext.Provider value={{
            kodePemeriksaan,
            setKodePemeriksaan
        }}>
            {props.children}
        </ReferenceContext.Provider>
    )
}