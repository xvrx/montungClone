import React, { useContext } from 'react'
import { MontungContext } from '../../Context/MontungContext'







const Remaining = ({ amount, background, desc }) => {
    return (
        <div className='deadline-remainings'>
            <p style={{ marginBottom: '10px', color: '#bdbfc0', fontSize: '14px' }}>{desc}</p>
            <h3 style={{ color: 'white', backgroundColor: background, width: '35px', height: '35px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{amount}</h3>

        </div>
    )
}

const ProfileDeadline = () => {

    const {tunggakanFiltered, dateRange} = useContext(MontungContext)


    const isBetween = (num1,num2,value) => value >= num1 && value <= num2 


    function findDeadlines(filtered) {
        let lewatWaktu = []
        let tigaBulan = []
        let enamBulan = []
        const currentDate = new Date()

        for (const i in filtered) {
            if (6 - dateRange(new Date(filtered[i]?.TanggalSP2), currentDate )[1] < 1) {
                lewatWaktu.push(filtered[i])
            } else if (6 - dateRange(new Date(filtered[i]?.TanggalSP2), currentDate )[1] < 4 &&
            6 - dateRange(new Date(filtered[i]?.TanggalSP2), currentDate )[1] > 1
            ){
                tigaBulan.push(filtered[i])
            } else if (6 - dateRange(new Date(filtered[i]?.TanggalSP2), currentDate )[1] > 3) {
                enamBulan.push(filtered[i])
            }
        }
        // return [filtered[3], dateRange( new Date(filtered[3]?.TanggalSP2), currentDate )[1]]
        return [lewatWaktu, tigaBulan,enamBulan]
    }
    // function countDeadline() {
    //     for(const a in montung) {
    //         const currentDate = new Date()
            
    //         if(a)
    //     }
    // }

    return (
        <div className='profile-deadline-container'>
            <p >Tunggakan SP2 :</p>
            <div className='deadline-container'>
                <Remaining amount={findDeadlines(tunggakanFiltered)[0].length} background={'rgba(255, 91, 91, 0.6)'} desc={`< 1 Bulan`} />
                <Remaining amount={findDeadlines(tunggakanFiltered)[1].length} background={'rgba(255, 244, 91, 0.6)'} desc='< 3 Bulan' />
                <Remaining amount={findDeadlines(tunggakanFiltered)[2].length} background={'rgba(60, 216, 68, 0.6)'} desc='< 6 Bulan' />
            </div>

        </div>
    )
}

export default ProfileDeadline