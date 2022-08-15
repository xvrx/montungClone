import React from 'react'
import { Doughnut } from 'react-chartjs-3'

export const SpvPieChart = () => {

    const data = {
        labels: ['SKP Cair', 'Belum Cair'],
        datasets: [
          {
            label: 'LHP selesai',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }

    return (
        <div className='profile-doughnut-container'>
            <Doughnut
                data={data}
                height={400}
                width={600}
            />
        </div>
    )
}

export const FppPieChart = () => {

    const dataReal = {
        labels: ['Tepat Waktu', 'Lewat Waktu'],
        datasets: [
          {
            label: 'LHP selesai',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }

    const dataKonversi = {
        labels: ['Tepat Waktu', 'Lewat Waktu'],
        datasets: [
          {
            label: 'LHP selesai',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }

    return (
        <div className='profile-doughnut-container'>
            <Doughnut
                data={dataKonversi}
                height={400}
                width={600}
            />
        </div>
    )
}
