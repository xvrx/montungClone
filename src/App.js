import './App.css';
import Eval from './Eval';
import { MontungContext } from './Context/MontungContext';

import {
  useContext,
  useEffect
}
  from 'react'

import { ModalContext } from './Context/modalContext/ModalContext';
import AboutModal from './Components/Modals/AboutModal';
import { AnimatePresence, motion } from 'framer-motion'
import TambahModal from './Components/Modals/TambahModal';
import TunggakanModal from './Components/Modals/TunggakanModal';
import NotifModal from './Components/Modals/NotifModal';
import TambahTim from './Components/Modals/TambahTim';
import { ProfileContext } from './Context/ProfileContext';
import TambahTahapan from './Components/Modals/TambahTahapan';
import ProfileEditModal from './Components/Modals/ProfileEditModal';
import PencairanEdit from './Components/Modals/PencairanEdit'
import LoaderLogin from './Components/Loader/LoaderLogin';

import axios from 'axios';
axios.defaults.withCredentials = true


function App() {


  const { serverOrigin, montung, setMontung, setmontuang, loadingStatus } = useContext(MontungContext)
  const { setUserID } = useContext(ProfileContext)

  useEffect(() => {
    const setProfile = () => {
      axios.get(serverOrigin + 'user/verify', { withCredentials: true })
        .then((res) => {
          const a = res?.data?.data
          setUserID(a)
        }).catch((err) => {
          console.log(err?.response)
        })
    }


    const initialFetch = async () => {
      axios.get(serverOrigin + 'pemeriksaan', { withCredentials: true })
        .then(response => {
          const a = response?.data?.data
          console.log('a adalah ', a)
          setMontung(a)
        })
        .catch((error) => {
          // navigate('/')
          console.log(error?.response, 'failed to fetch');
        })
    }
    initialFetch()
    setProfile()

  }, [setMontung])


  const { tahapanModal,
    settahapanModal, tambahTim, tunggakanModal, tambahModal, aboutModal, whatthis, setAboutModal, setwhatThisModal, notifModal, profileEditModal,
    setprofileEditModal, modalLHP, setModalLHP } = useContext(ModalContext)








  return (


    <div className='app-container'>
      <Eval />
      {loadingStatus ? <LoaderLogin /> : null}
      {/* MODAL */}
      <AnimatePresence>

        {aboutModal &&
          <motion.div style={{ zIndex: '1' }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='about-modal-container' animate={{ opacity: 1, transition: { duration: 0.5 } }} initial={{ opacity: 0 }}>
            <motion.div className="about-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }} exit={{ y: 1200, transition: { duration: 0.3 } }}>
              <AboutModal closeModal={() => setAboutModal(false)} title='About' content='This app is developed by بَشَّارُ ٱلْأَسَدِ .' />
            </motion.div>
          </motion.div>}

        {profileEditModal &&
          <motion.div style={{ zIndex: '1' }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='about-modal-container' animate={{ opacity: 1, transition: { duration: 0.5 } }} initial={{ opacity: 0 }}>
            <motion.div className="about-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }} exit={{ y: 1200, transition: { duration: 0.3 } }}>
              <ProfileEditModal closeModal={() => setAboutModal(false)} title='About' content='This app is developed by بَشَّارُ ٱلْأَسَدِ .' />
            </motion.div>
          </motion.div>}

        {whatthis &&
          <motion.div style={{ zIndex: '1' }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='about-modal-container' animate={{ opacity: 1, transition: { duration: 0.5 } }} initial={{ opacity: 0 }}>
            <motion.div className="about-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }} exit={{ y: 1200, transition: { duration: 0.3 } }}>
              <AboutModal closeModal={() => setwhatThisModal(false)} title="What is this?" content={`مشكلة الغرب أنهم بدأوا بالإصلاح السياسي يتجه نحو الديمقراطية. إذا كنت تريد أن تتجه نحو الديمقراطية ، فإن أول شيء هو إشراك الناس في صنع القرار ، وليس صنعه`} />
            </motion.div>
          </motion.div>}

        {tambahModal &&
          <motion.div style={{ zIndex: '1' }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='tambah-modal-container' animate={{ opacity: 1, transition: { duration: 0.5 } }} initial={{ opacity: 0 }}>
            <motion.div className="tambah-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }} exit={{ y: 1200, transition: { duration: 0.3 } }}>
              <TambahModal />
            </motion.div>
          </motion.div>}

        {tunggakanModal &&
          <motion.div style={{ zIndex: '1' }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='tambah-modal-container' animate={{ opacity: 1, transition: { duration: 0.5 } }} initial={{ opacity: 0 }}>
            <motion.div className="tambah-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }} exit={{ y: 1200, transition: { duration: 0.3 } }}>
              <TunggakanModal />
            </motion.div>
          </motion.div>}

        {notifModal &&
          <motion.div style={{ zIndex: '2' }} key='notifModal' exit={{ opacity: 0, transition: { duration: 0.3 } }} className='notif-modal-container' animate={{ opacity: 1, transition: { duration: 0.25 } }} initial={{ opacity: 0 }}>
            <motion.div className="notif-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: 0 }} exit={{ scale: 0, transition: { duration: 0.3 } }}>
              <NotifModal />
            </motion.div>
          </motion.div>
        }

        {tambahTim &&
          <motion.div style={{ zIndex: '2' }} key='tambahTim' exit={{ opacity: 0, transition: { duration: 0.3 } }} className='notif-modal-container' animate={{ opacity: 1, transition: { duration: 0.25 } }} initial={{ opacity: 0 }}>
            <motion.div className="notif-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: 0 }} exit={{ scale: 0, transition: { duration: 0.3 } }}>
              <TambahTim />
            </motion.div>
          </motion.div>
        }

        {tahapanModal &&
          <motion.div style={{ zIndex: '2' }} key='tahapanModal' exit={{ opacity: 0, transition: { duration: 0.3 } }} className='notif-modal-container' animate={{ opacity: 1, transition: { duration: 0.25 } }} initial={{ opacity: 0 }}>
            <motion.div className="notif-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: 0 }} exit={{ scale: 0, transition: { duration: 0.3 } }}>
              <TambahTahapan />
            </motion.div>
          </motion.div>
        }

        {modalLHP &&
          <motion.div style={{ zIndex: '2' }} key='tahapanModal' exit={{ opacity: 0, transition: { duration: 0.3 } }} className='notif-modal-container' animate={{ opacity: 1, transition: { duration: 0.25 } }} initial={{ opacity: 0 }}>
            <motion.div className="notif-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: 0 }} exit={{ scale: 0, transition: { duration: 0.3 } }}>
              <PencairanEdit />
            </motion.div>
          </motion.div>
        }




      </AnimatePresence>

    </div>
  );
}

export default App;
