import { useState, createContext } from "react"

export const ProfileContext = createContext()

export const ProfileProvider = props => {
    const [bioEdit, setbioEdit] = useState('')
    const [picsContainer, setpicsContainer] = useState('')
    // const [userID, setUserID] = useState({
    //     nama: 'Azrael Situmorang',
    //     pics: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    //     notif: 0,
    //     nip: '123456',
    //     NIP: '200011215 156 485',
    //     jabatan: 'pelaksana abadi',
    //     posisi: 'Tukang Lempar Balok',
    //     role: 'admin',
    //     pangkat: 'II/a',
    //     unit: 'Seksi P3',
    //     bio: 'life is suffering, death is deliverance',
    // })
    const [userID, setUserID] = useState({
        nama: 'UserNotFound',
        pics: 'http://10.13.1.63:2000/static/profile/default.jpg',
        notif: 0,
        nip: '000000',
        NIP: '0000000 000 000',
        jabatan: 'UserNotFound',
        posisi: 'UserNotFound',
        role: 'UserNotFound',
        pangkat: 'UserNotFound',
        unit: 'UserNotFound',
        bio: 'UserNotFound',
    })

    return (
        <ProfileContext.Provider value={{
            userID, setUserID,
            bioEdit, setbioEdit,
            picsContainer, setpicsContainer
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}