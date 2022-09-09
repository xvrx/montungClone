import React, { useContext } from "react";
import { Radar } from 'react-chartjs-3'
import { MontungContext } from '../../Context/MontungContext';

const ProfileSpiderChart = () => {
  // realisasi lhp => target konversi
  // lhp tepat waktu => lhp selesai
  // skp cair => skp terbit
  // skp disetujui => skp terbit
  const data = {
    labels: ['Konversi LHP', 'LHP Tepat Waktu', 'Pencairan SKP', 'SKP Disetujui'],
    datasets: [
      {
        
        label: "Capaian",
        data: [2, 9, 1, 5 ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBackgroundColor:'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Target',
        data: [10, 10, 10, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
      },
      
    ],
  };

  const RadarOptions = {
    responsive: true,
    scale: {
      ticks: {
        display: false,
        showLabelBackdrop: false,
        min: 0,
        max: 10,
        stepSize: 2,
        fontColor: "rgba(203, 197, 11, .6)",
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, .6)"
      },
      angleLines: {
        color: "rgba(255, 255, 255, .3)",
        lineWidth: 1
      },
      gridLines: {
        color: "rgba(255, 255, 255, .3)",
        // circular: true
      },
      pointLabels: {
        fontColor: "rgba(255, 255, 255, .6)"
      }
      
    }
  };

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


  

  return (
    <div className='profile-spider-container'>
      <Radar
        options={RadarOptions}
        data={data}
        height={400}
        width={600}
      />
    </div>
  )
}

export default ProfileSpiderChart
  