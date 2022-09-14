import { useState, createContext, useEffect } from "react";

export const MontungContext = createContext();

export const MontungProvider = (props) => {
  
  const [sourceID, setsourceID] = useState({
    targetCair: 1500000000,
    targetKonversi: 169,
    current: new Date(),
    year: 2022,
  });

  // const serverOrigin = 'http://10.13.1.63:2000/api/'
  // const serverOrigin = "http://192.168.1.8:2000/api/";
  const serverOrigin = "http://localhost:2000/api/";

  const [loadingStatus, setLoading] = useState(false);

  function loading(status) {
    if (status === true) {
      setLoading(true);
    } else if (status === false) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  function sum(obj, objKey) {
    return obj?.reduce((a, b) => a + (parseInt(b[objKey]) || 0), 0);
  }

  function sumFloat(obj, objKey) {
    return obj?.reduce((a, b) => a + (parseFloat(b[objKey]) || 0), 0);
  }

  function plus(...args) {
    const sum = args.reduce((a, b) => a + b);
    return sum;
  }

  function plusFloat(...args) {
    const sum = args.reduce((a, b) => parseFloat(a) + parseFloat(b));
    return parseFloat(sum).toFixed(2);
  }

  function thousandSeparator(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  function digit(bruh) {
    if (bruh === 0 || bruh === "") return "";
    const formatted = bruh.toString().replace(/\D/g, "");
    return formatted;
  }

  function formatDate(b) {
    if (b === "") return "";
    const a = new Date(b);
    const taun = a.getFullYear();
    const bulan = a.getMonth() + 1;
    const tanggal = a.getDate() + 1;
    const locale = [tanggal, bulan, taun].join("-");
    return locale;
  }

  function getMonth(b) {
    const a = new Date(b);
    const bulan = a.getMonth() + 1;
    return bulan;
  }
  function getYear(b) {
    const a = new Date(b);
    const taun = a.getFullYear();
    return taun;
  }

  function defaultDate(b) {
    return b.toISOString().split("T")[0];
  }

  function percentages(a, b) {
    const parsedA = parseFloat(a);
    const parsedB = parseFloat(b);
    const c = (parsedA / parsedB) * 100 || 0;

    const cstring = c.toFixed(2).toString().split(".");
    const base = Math.floor(cstring[0]);
    const remains = cstring[1]?.slice(0, 2);
    const final = `${base},${remains}%`;
    if (final.split(",")[1] === "00%") return `${base}%`;
    return final;
  }

  function shortenValue(bruh) {
    if (!bruh) return 0;
    const newVal = parseInt(bruh);
    if (newVal === 0) return 0;
    if (newVal.toString()?.length >= 7 && newVal.toString()?.length <= 9)
      return `${Math.floor(newVal / 1000000)} Juta`;
    // 1 000 000 000
    if (newVal.toString()?.length >= 10)
      return `${(newVal / 1000000000).toFixed(2).toString()} Miliar`;
    if (newVal.toString()?.length <= 6 && newVal > 0)
      return `${Math.floor(newVal / 1000)} Rb`;
    return thousandSeparator(bruh);
  }

  function rupiah(amount) {
    const digitzd = thousandSeparator(digit(amount));
    return digitzd;
  }

  function dateRange(date1, date2) {
    let days = Math.ceil((date2 - date1) / 8.64e7);
    let month = days / 30;
    return [days, month];
  }

  // DATA
  const [montung, setMontung] = useState(
    []
    // { "_id": "489fhwe98fnw9f", "alamatWP": "Kebon sari bapak kau", "KLU": "Tukang jagal", "AR": "Boediono Sudjatiningrat", "NPWP": "010029924712000", "NamaWP": "BERKAT BRUH TIMBER (SP2)", "PeriodePajak": "0119 - 1219", "Kode": "1162", "DeskripsiKode": "Pemeriksaan Khusus - DSPP", "Kriteria": "Rutin", "PotensiDSPP": 1280294660, "Jenis": "Strategis", "ProfileWP": "WP suka jual sapi", "NomorUsulanPemeriksaan": "ND-13/WPJ.29/KP.0405/RIK.SIS/2022", "TanggalUsulan": "2021-05-20", "NomorInstruksiPemeriksaan": "ND-13/WPJ.29/KP.0405/RIK.SIS/2022", "TanggalInstruksi": "2021-05-20", "PenunjukanSupervisor": "ND-13/WPJ.29/KP.0404/2022", "TanggalPenunjukanSupervisor": "2021-05-27", "AuditPlan": "ND-13/WPJ.29/KP.0405/2022", "TanggalAuditPlan": "2021-05-20", "NamaSupervisor": "Cahyo", "NamaKetuaTim": "Rijadi", "NamaAnggotaTim1": "Dzulfikar", "NamaAnggotaTim2": "Riani", "PIC": "Riani", "TanggalMulaiPemeriksaan": "", "NomorSP2": "PRIN-00041/WPJ.29/KP.0405/RIK.SIS/2021", "TanggalSP2": "2022-03-20", "NomorSPHP": "SPHP-00041/WPJ.29/KP.0405/RIK.SIS/2021", "TanggalSPHP": "2021-05-20", "LHP": "", "TanggalLHP": "", "NilaiKonversi": 1.2, "NilaiSKPTerbit": "", "NilaiLBterbit": 20000, "TanggalProyeksiLHP": "2022-07-20", "NilaiProyeksiSKP": 1280294660, "NilaiProyeksiLB": 45645156, "TanggalProyeksiPencairan": "2021-05-20", "NilaiProyeksiPencairan": 2000000, "Disetujui": 240000000, "Tahapan": [{ "tanggal": "2021-10-20", "namaTahapan": "Menghadiri pengadilan PBB", "deskripsiTahapan": "melakukan visit ke wilayah usaha wajib pajak" }, { "tanggal": "2021-09-20", "namaTahapan": "Perang dunia III", "deskripsiTahapan": "surat peringatan dikirim pada tanggal 20 mei 2022" }, { "tanggal": "2021-08-20", "namaTahapan": "Duel dengan WP", "deskripsiTahapan": "melakukan visit ke wilayah usaha wajib pajak" }, { "tanggal": "2021-07-20", "namaTahapan": "Surat Peringatan III", "deskripsiTahapan": "surat peringatan dikirim pada tanggal 20 mei 2022" }, { "tanggal": "2021-06-20", "namaTahapan": "Pertemuan dengan WP", "deskripsiTahapan": "melakukan visit ke wilayah usaha wajib pajak" }, { "tanggal": "2021-05-20", "namaTahapan": "Surat Peringatan II", "deskripsiTahapan": "surat peringatan dikirim pada tanggal 20 mei 2022" }], "Kendala": "banyak orang tolol di pasar malam", "reviewAtasan": "tolong yang ulang tahun segera dilaksanakan" }
  );

  const [montuang, setmontuang] = useState([]);

  // ! Usulan
  const [usulanFiltered, setusulanFiltered] = useState();

  // ! tunggakan
  const [tunggakanFiltered, settunggakanFiltered] = useState();

  // ! Selesai
  const [selesaiFiltered, setselesaiFiltered] = useState();

  useEffect(() => {
    setusulanFiltered(
      montung.filter((elem) => {
        return (elem?.NomorSP2 === undefined ||
        elem?.NomorSP2.length < 1 || 
        elem?.TanggalSP2.length < 1)  &&
        (elem?.LHP === undefined || elem?.LHP?.length < 1);
      })
    );
    settunggakanFiltered(
      montung.filter((elem) => {
        return (
          elem?.hasOwnProperty("NomorSP2") &&
          elem?.NomorSP2?.length > 0 &&
          elem?.TanggalSP2?.length > 0 &&
          elem?.NomorSP2?.length !== undefined &&
          (elem?.LHP === undefined ||
            elem?.LHP.length < 1)
        );
      })
    );
    setselesaiFiltered(
      montung.filter((elem) => {
        return (
          elem?.hasOwnProperty("LHP") &&
          elem?.NomorSP2?.length > 0 &&
          elem?.TanggalSP2?.length > 0 &&
          elem?.LHP?.length > 0 &&
          elem?.TanggalLHP?.length > 0 
        );
      })
    );
  }, [montung]);

  return (
    <MontungContext.Provider
      value={{
        montung,
        setMontung,
        usulanFiltered,
        setusulanFiltered,
        tunggakanFiltered,
        settunggakanFiltered,
        selesaiFiltered,
        setselesaiFiltered,
        thousandSeparator,
        sum,
        sumFloat,
        rupiah,
        digit,
        dateRange,
        shortenValue,
        plus,
        plusFloat,
        percentages,
        formatDate,
        defaultDate,
        getMonth,
        getYear,
        sourceID,
        setsourceID,
        montuang,
        setmontuang,
        serverOrigin,
        loading,
        setLoading,
        loadingStatus,
      }}
    >
      {props.children}
    </MontungContext.Provider>
  );
};
