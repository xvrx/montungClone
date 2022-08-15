import React, { useContext } from 'react'
import EvaluationNav from './Components/EvaluationNav'
import DashboardNav from './Components/DashboardNav'
import Overview from './Components/Overview'
import ProfileNav from './Components/Profiles/ProfileNav'
import ProfileDeadline from './Components/Profiles/ProfileDeadline'
import ProfileSpiderChart from './Components/Profiles/ProfileSpiderChart'
import { SpvPieChart, FppPieChart } from './Components/Profiles/ProfilePieChart'
import { NavContext } from './Context/NavContext'
import Usulan from './Components/Usulan'
import Tunggakan from './Components/Tunggakan'
import Selesai from './Components/Selesai'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from './Context/modalContext/ModalContext';

import './styles/evaluation.css'



function Eval() {

    const { nav, hoveredNav } = useContext(NavContext)
    const { profileAdjust, setprofileAdjust } = useContext(ModalContext)
    // FRAMER
    // initial and show up cannot work by embedding it in objects but it work with variants
    // exit can work by embedding it as objects and should not be added in variants

    return (
        <div className='evaluation-sub-container'>

            <div className='evaluation-tab-evaluation'>
                <EvaluationNav />
                <DashboardNav />

                <motion.div className="eval-container">
                    <AnimatePresence >
                        {nav === 1 && <motion.div style={{ position: 'absolute', width: '100%', height: '100%' }} key='overview' exit={{
                            x: -600,
                            opacity: 0,
                            transition: {
                                duration: 0.5
                            }
                        }}><Overview /></motion.div>}
                        {nav === 2 && <motion.div style={{ position: 'absolute', width: '100%', height: '100%' }} key='usulan' exit={{
                            x: hoveredNav > 2 ? -600 : 600,
                            opacity: 0,
                            transition: {
                                duration: 0.5
                            }
                        }}><Usulan /></motion.div>}
                        {nav === 3 && <motion.div style={{ position: 'absolute', width: '100%', height: '100%' }} key='tunggakan' exit={{
                            x: hoveredNav < 3 ? 600 : -600,
                            opacity: 0,
                            transition: {
                                duration: 0.5
                            }
                        }}><Tunggakan /></motion.div>}
                        {nav === 4 && <motion.div style={{ position: 'absolute', width: '100%', height: '100%' }} key='selesai' exit={{
                            x: 600,
                            opacity: 0,
                            transition: {
                                duration: 0.5
                            }
                        }}><Selesai /></motion.div>}

                    </AnimatePresence>

                </motion.div>
                <AnimatePresence>
                    {profileAdjust &&

                        <motion.div
                            key='bruh'
                            className="profile-adjust-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }}
                            onClick={() => setprofileAdjust(false)}
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        >
                        </motion.div>

                    }
                </AnimatePresence>
            </div>


            <div className='evalation-tab-profile'>
                <div className='profile-container'>
                    <ProfileNav />
                </div>
                <div className='profile-content-container'>
                    <ProfileDeadline />
                    <ProfileSpiderChart />
                    <FppPieChart />
                </div>
            </div>
            <AnimatePresence>
                {profileAdjust &&
                    <motion.div exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }} animate={{ x: 0, opacity: 1, transition: { duration: 0.25 } }} initial={{ x: 60, opacity: 0 }} className='evalation-tab-adjustProfile'>
                        <div className="profile-adjustContainer">
                            <ProfileNav />
                        </div>
                        <div className='profile-content-adjustContainer'>
                            <ProfileDeadline />
                            <ProfileSpiderChart />
                            <FppPieChart />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default Eval