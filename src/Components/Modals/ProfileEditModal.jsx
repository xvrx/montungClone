import React, { useContext, useState } from 'react'
import { FaPen, FaRegWindowClose, FaCheck, FaSignOutAlt } from 'react-icons/fa'
import './ProfileEditModal.css'
import { motion } from 'framer-motion'
import { ModalContext } from '../../Context/modalContext/ModalContext'
import { ProfileContext } from '../../Context/ProfileContext'
import { MontungContext } from "../../Context/MontungContext";
import axios from "axios";
axios.defaults.withCredentials = true;





const ProfileEdiModal = () => {
    const { setprofileEditModal } = useContext(ModalContext)
    const { userID, setUserID, bioEdit, setbioEdit, picsContainer, setpicsContainer } = useContext(ProfileContext)
    const { serverOrigin } = useContext(MontungContext)



    function logOut() {
        axios.post(serverOrigin + 'user/destroy', { withCredentials: true })
            .then((res) => {
                console.log(res)
                res.data.stat === true && window.location.reload()
            })
            .catch((err) => {
                console.log(err.response)
                window.location.reload()
            })
    }


    function uploadOnChange(event) {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setpicsContainer(reader.result)
            }
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0])
        }
    }

    return (
        <motion.div className="profile-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }}>
            <div className="profile-modal-inner">
                <div className="profile-modal-title">
                    <h3>
                        <FaPen style={{ marginRight: '5px' }} />Edit Profile
                    </h3>
                </div>
                <div className='profile-modal-close' onClick={() => setprofileEditModal(false)}><FaRegWindowClose size={20} color='#fdbc2c' /></div>
                <div className="content-container">
                    <div className="profile-modal-content">
                        <div className="profile-editImage-container">
                            <div className="profile-editImage-inner-container">
                                <label htmlFor="profile-modal-uploadProfilePic">
                                    <div className="profile-editImage">
                                        <img src={picsContainer} alt="Profile Pic not available!" style={{ display: 'flex', alignItems: 'center' }} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <input onChange={(e) => uploadOnChange(e)} id='profile-modal-uploadProfilePic' type="file" accept='image/*' />
                        <div className="profile-desc">
                            <h1>{userID.nama}</h1>
                            <h3>{userID.posisi}, {userID.unit}</h3>
                            <textarea value={bioEdit}
                                onChange={(e) => {
                                    setbioEdit(e.target.value)
                                }}
                                spellCheck='false' name="" id="" cols="30" rows="3" maxLength={200} placeholder='write your bio...'></textarea>
                        </div>
                        <button onClick={() => {
                            const edited = { ...userID }
                            edited.bio = bioEdit
                            edited.pics = picsContainer
                            setUserID(edited)
                            setprofileEditModal(false)
                        }} className='profile-edit-submitButton'><FaCheck size={15} />Update Profile</button>

                        <button onClick={logOut} className='profile-edit-logOut'><FaSignOutAlt size={15} />Log Out</button>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default ProfileEdiModal