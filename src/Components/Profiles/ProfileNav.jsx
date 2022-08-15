import React, { useContext } from 'react';
import ProfilePic from '../../Img/profile.png'
import { FaRegBell } from 'react-icons/fa'
import '../../styles/profile.css'
import { ProfileContext } from '../../Context/ProfileContext';
import { ModalContext } from '../../Context/modalContext/ModalContext';

const ProfileNav = () => {
  const {userID, setbioEdit, setpicsContainer} = useContext(ProfileContext)
  const {setprofileEditModal} = useContext(ModalContext)


  return (
    <div className='profile-nav-container'>
      <div style={{ zIndex: '1' }} className="profile-layout-line"></div>
      <div className="profile-nav-bell">
        <div className="profile-nav-bell-backgr"></div>
        <div id='nav-bell-icon' style={{ zIndex: '1' }}><FaRegBell size={20} /></div>

      </div>
      <div className="profile-nav-bio" onClick={() => {setbioEdit(userID.bio); setpicsContainer(userID.pics); setprofileEditModal(true)}}>
        <div style={{ zIndex: '1' }} className="profile-identity">
          <h3>{userID.nama}</h3>
          <p>{userID.posisi}</p>
        </div>
        <img src={userID.pics} alt="Profiles" />
        <div className="profile-nav-bio-backgr"></div>
      </div>
    </div>
  )
}

export default ProfileNav