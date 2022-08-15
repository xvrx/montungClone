import React from 'react'
import { Radar } from 'react-chartjs-3'

const ProfileSpiderChart = () => {

  const data = {
    labels: ['Ketepatan LHP', 'Penyelesaian LHP', 'Penerbitan SKP', 'Realisasi SKP'],
    datasets: [
      {
        label: 'Capaian',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='profile-spider-container'>
      <Radar
        data={data}
        height={400}
        width={600}
      />
    </div>
  )
}

export default ProfileSpiderChart