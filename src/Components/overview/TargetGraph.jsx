import React, { useContext } from "react";
import { Line } from "react-chartjs-3";
import { MontungContext } from "../../Context/MontungContext";

const TargetGraph = () => {
  const {
    selesaiFiltered,
    shortenValue,
    rupiah,
    sum,
    getMonth,
    defaultDate,
    tunggakanFiltered,
    getYear,
    sourceID,
    plus,
  } = useContext(MontungContext);

  // realisasi

  function realisasiSKP(targetMonth) {
    const realisasiBulan = selesaiFiltered?.filter((each) => {
      return (
        getMonth(each.tanggalPencairan) === targetMonth &&
        getYear(each.tanggalPencairan) === sourceID?.year
      );
    });

    const total = sum(realisasiBulan, "NilaiPencairan");
    return total;
  }

  function realisasiPrev(targetMonth) {
    let prevMonths = [];

    for (let i = 1; i < targetMonth; i++) {
      prevMonths.push(i);
    }

    const total = (arr) => {
      let final = 0;
      for (const a in arr) {
        final += parseInt(realisasiSKP(arr[a]));
      }
      return final;
    };

    return total(prevMonths);
  }

  function totalRealisasi(targetMonth) {
    if (targetMonth > getMonth(sourceID?.current)) return null;
    return realisasiPrev(targetMonth) + realisasiSKP(targetMonth);
  }

  //! proyeksi

  function proyeksiSKP(targetMonth) {
    const SKPTerbit = selesaiFiltered?.filter((each) => {
      return (
        getMonth(each.TanggalProyeksiPencairan) === targetMonth &&
        getYear(each.TanggalProyeksiPencairan) === sourceID?.year
      );
    });

    const proyeksiSP2 = tunggakanFiltered?.filter((each) => {
      return (
        getMonth(each.TanggalProyeksiPencairan) === targetMonth &&
        getYear(each.TanggalProyeksiPencairan) === sourceID?.year
      );
    });

    const total = plus(
      sum(SKPTerbit, "sisaPencairan"),
      sum(proyeksiSP2, "NilaiProyeksiPencairan")
    );
    return total
  }

  function proyeksiPrev(targetMonth) {
    let prevMonths = [];

    for (let i = 1; i < targetMonth; i++) {
      prevMonths.push(i);
    }

    const total = (arr) => {
      let final = 0;
      for (const a in arr) {
        final += parseInt(proyeksiSKP(arr[a]));
      }
      return final;
    };

    return total(prevMonths);
  }

  function totalproyeksi(targetMonth) {
    if (targetMonth < getMonth(sourceID?.current)) return null;
    return plus(
      proyeksiPrev(targetMonth),
      proyeksiSKP(targetMonth),
      realisasiSKP(targetMonth),
      realisasiPrev(targetMonth)
    );
  }

  // data Chart

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const realisasiGrad = ctx.createLinearGradient(0, 100, 40, 300);
    realisasiGrad.addColorStop(0, "rgb(255, 99, 132,0.5)");
    realisasiGrad.addColorStop(1, "rgba(255, 99, 132,0.25)");

    const prognosaGrad = ctx.createLinearGradient(0, 100, 40, 300);
    prognosaGrad.addColorStop(0, "rgb(53, 162, 235, 0.75)");
    prognosaGrad.addColorStop(1, "rgb(45,110,154,0)");

    const targetGrad = ctx.createLinearGradient(0, 0, 0, 100);
    targetGrad.addColorStop(0, "rgb(147, 230, 53,1)");
    targetGrad.addColorStop(1, "rgb(45,110,154,0)");

    return {
      labels,
      datasets: [
        {
          label: "Realisasi",
          data: [
            totalRealisasi(1),
            totalRealisasi(2),
            totalRealisasi(3),
            totalRealisasi(4),
            totalRealisasi(5),
            totalRealisasi(6),
            totalRealisasi(7),
            totalRealisasi(8),
            totalRealisasi(9),
            totalRealisasi(10),
            totalRealisasi(11),
            totalRealisasi(12),
          ],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: realisasiGrad,
          // backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointRadius: 2,
          hitRadius: 30,
          fill: true,
          pointColor: "#19283F",
          pointStyle: "rect",
          tension: 0,
        },
        {
          label: "Prognosa",
          data: [
            totalproyeksi(1),
            totalproyeksi(2),
            totalproyeksi(3),
            totalproyeksi(4),
            totalproyeksi(5),
            totalproyeksi(6),
            totalproyeksi(7),
            totalproyeksi(8),
            totalproyeksi(9),
            totalproyeksi(10),
            totalproyeksi(11),
            totalproyeksi(12),
          ],
          borderColor: "rgb(53, 162, 235, 0.5)",
          backgroundColor: prognosaGrad,
          pointColor: "#19283F",
          fill: true,
          pointRadius: 2,
          hitRadius: 30,
          hoverRadius: 10,
          borderDash: [0, 0],
          tension: 0.15,
        },
        {
          label: `Target: ${shortenValue(sourceID?.targetCair)}`,
          hidden: true,
          data: target,
          borderColor: "rgb(147, 230, 53,0)",
          backgroundColor: targetGrad,
          fill: true,
          hitRadius: 0,
          pointRadius: 0,
          borderDash: [0, 0],
        },
      ],
    };
  };

  const a = sourceID?.targetCair;

  const target = [a, a, a, a, a, a, a, a, a, a, a, a];

  const options = {
    responsive: true,
    gridLines: {
      display: false,
      color: "#FFFFFF",
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "#3e3e3e",
          },
          ticks: {
            suggestedMax: sourceID?.targetCair / 4,
            fontColor: "#A5A7AB",
            beginAtZero: true,
            callback: function (value) {
              return shortenValue(parseInt(value));
            },
          },
        },
      ],
      xAxes: [
        {
          //     gridLines: {
          //         color: "#3e3e3e",
          //    },
          ticks: {
            fontColor: "#A5A7AB",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          const label = data["labels"][tooltipItem[0]["index"]];
          var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return months[label - 1];
        },
        label: function (tooltipItem, data) {
          //   return item, shortenValue(parseInt(data));
          //   let label = data.labels[tooltipItem.index];
          let value =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return "Rp " + rupiah(value);
        },
      },
    },
    legend: {
      labels: {
        fontColor: "#A5A7AB",
        // fontSize: 18
        boxWidth: 10,
      },

      display: true,
      position: "top",
      // position: 'bottom',
    },
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  return (
    <div
    // onClick={() => console.log(proyeksiPrev(8))}
    >
      <Line options={options} data={data} height={400} width={600} />
    </div>
  );
};

export default TargetGraph;
