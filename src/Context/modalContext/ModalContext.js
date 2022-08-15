import { useState, createContext } from "react"

export const ModalContext = createContext()

export const ModalProvider = props => {

    //! Nav Modal
    const [aboutModal, setAboutModal] = useState(false)
    const [whatthis, setwhatThisModal] = useState(false)

    //! Usulan Modal
    const [tambahModal, settambahModal] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [notifStatus, setNotifStatus] = useState('')
    const [tambahTim, settamabahTim] = useState(false)

    //! Tunggakan
    const [tunggakanModal, setTunggakanModal] = useState(false)
    const [tahapanModal, settahapanModal] = useState(false)
    const [editTahapan, seteditTahapan] = useState(false)
    const [tahapanIdx, settahapanIdx] = useState(0)

    //! Profile
    const [profileEditModal, setprofileEditModal] = useState(false)
    const [profileModal, setprofileModal] = useState(false)
    const [profileAdjust, setprofileAdjust] = useState(false)


    //! NOTIF
    const [notifModal, setnotifModal] = useState(false)
    const [notifModalTitle, setnotifModalTitle] = useState('')
    const [notifModalMessage, setnotifModalMessage] = useState('')
    const [notifModalButton, setnotifModalButton] = useState(false)

    //! LHP Options

    const [modalLHP, setModalLHP] = useState(false)


    return (
        <ModalContext.Provider value={{
            aboutModal,
            setAboutModal,
            whatthis,
            setwhatThisModal,
            tambahModal,
            settambahModal,
            profileModal,
            setprofileModal,
            profileAdjust,
            setprofileAdjust,
            editActive,
            setEditActive,
            tunggakanModal,
            setTunggakanModal,
            notifModal,
            setnotifModal,
            notifModalMessage,
            setnotifModalMessage,
            notifModalTitle,
            setnotifModalTitle,
            notifModalButton,
            setnotifModalButton,
            notifStatus,
            setNotifStatus,
            tambahTim,
            settamabahTim,
            tahapanModal,
            settahapanModal,
            editTahapan, 
            seteditTahapan,
            tahapanIdx, 
            settahapanIdx,
            profileEditModal, 
            setprofileEditModal,
            modalLHP, setModalLHP
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}