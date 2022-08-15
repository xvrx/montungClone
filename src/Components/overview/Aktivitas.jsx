import React, {useContext} from 'react'
import { Line } from "react-chartjs-3";
import { MontungContext } from "../../Context/MontungContext";

const Aktivitas = () => {
  const { selesaiFiltered, 
    // shortenValue, 
    // rupiah, 
    sum, sumFloat,getMonth, defaultDate, tunggakanFiltered, getYear, 
    sourceID, plusFloat
    } = useContext(MontungContext);

    function shortenValue(a) {
        return a
    }
    function rupiah(a) {
        return a
    }

const a = sourceID.targetKonversi
  const target = [
    a, a, a, a, a,
    a, a, a, a, a,
    a, a,
  ];





//! realisasi konversi
  function realisasiKonversi (targetMonth) {
    const konversiBulan = selesaiFiltered?.filter((each) => {
      return getMonth(each.TanggalLHP) === targetMonth && getYear(each.TanggalLHP) === sourceID?.year
    })

    const total = sumFloat(konversiBulan, 'NilaiKonversi')
    return total?.toFixed(2)
  }

  function konversiPrev (targetMonth) {
    let prevMonths = []

    for (let i = 1; i < targetMonth; i++) {
     prevMonths.push(i) }

    const total = (arr) => {
      let final = 0
      for(const a in arr) {
        final += parseFloat(realisasiKonversi(arr[a]))
        }
      return final
    }
    
    
    return  total(prevMonths)
  }

  function totalKonversi (targetMonth) {
    if (targetMonth > getMonth(sourceID?.current) ) return null
    return plusFloat(konversiPrev(targetMonth), realisasiKonversi(targetMonth))
  }

//! realisasi- end
  





function proyeksiKonversi (targetMonth) {
  const konversiBulan = tunggakanFiltered?.filter((each) => {
    return getMonth(each.TanggalProyeksiLHP) === targetMonth && getYear(each.TanggalProyeksiLHP) === sourceID?.year
  })

  const total = sumFloat(konversiBulan, 'NilaiKonversi')?.toFixed(2)
  return total
}


function proyeksiPrev (targetMonth) {
  let prevMonths = []

  for (let i = 1; i < targetMonth; i++) {
   prevMonths.push(i) }

  const total = (arr) => {
    let final = 0
    for(const a in arr) {
      final += parseFloat(proyeksiKonversi(arr[a]))
      }
    return final
  }
  
  
  return  total(prevMonths)
}

function totalProyeksi (targetMonth) {
  if (targetMonth < getMonth(sourceID?.current) ) return null
  return plusFloat(proyeksiPrev(targetMonth), proyeksiKonversi(targetMonth), konversiPrev(targetMonth), realisasiKonversi(targetMonth))
}

  

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

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const realisasiGrad = ctx.createLinearGradient(0, 100, 40, 300);
    realisasiGrad.addColorStop(0, "rgb(255,240,113,0.5)");
    realisasiGrad.addColorStop(1, "rgba(255,240,113,0.14)");

    const prognosaGrad = ctx.createLinearGradient(0, 100, 40, 300);
    prognosaGrad.addColorStop(0, "rgb(53, 162, 235)");
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
            totalKonversi(1),
            totalKonversi(2),
            totalKonversi(3),
            totalKonversi(4),
            totalKonversi(5),
            totalKonversi(6),
            totalKonversi(7),
            totalKonversi(8),
            totalKonversi(9),
            totalKonversi(10),
            totalKonversi(11),
            totalKonversi(12),
          ],
          borderColor: "rgb(255,240,113)",
          backgroundColor: realisasiGrad,
          // backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointRadius: 2,
          hitRadius: 30,
          hoverRadius: 10,
          fill: true,
          pointColor: "#19283F",
        //   pointStyle: "rect",

          tension:0.2,
        },
        {
          label: "Prognosa",
          data: [
            totalProyeksi(1),
            totalProyeksi(2),
            totalProyeksi(3),
            totalProyeksi(4),
            totalProyeksi(5),
            totalProyeksi(6),
            totalProyeksi(7),
            totalProyeksi(8),
            totalProyeksi(9),
            totalProyeksi(10),
            totalProyeksi(11),
            totalProyeksi(12),
          ],
          borderColor: "rgb(53, 162, 235, 0.5)",
          backgroundColor: prognosaGrad,
          pointColor: "#19283F",
          fill: true,
          pointRadius: 2,
          hitRadius: 30,
          hoverRadius: 10,
          borderDash: [0, 0],
          tension:0.15,
        },
        {
          label: `Target: ${sourceID.targetKonversi} Konversi`,
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
            suggestedMax : (sourceID.targetKonversi/3),
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
          return rupiah(value)+ " Konversi";
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

  return (
    <div 
    // onClick={() => console.log(totalProyeksi(7))} style={{marginTop:'32px', marginLeft: '10px'}}
    >
      <Line      
        options={options}
        data={data}
        height={400}
        width={600}
      />
    </div>
  );
};

export default Aktivitas;