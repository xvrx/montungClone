import React, { useContext } from 'react'
import '../styles/dashboard.css'
import { NavContext } from '../Context/NavContext'
import { motion } from 'framer-motion'


const DashboardNav = () => {
    //    1 overview
    //    2 usulan
    //   3 tunggakan
    //    4 selesai

    const navContext = useContext(NavContext)
    const { tabActive, sethoveredNav } = useContext(NavContext)

    const anima = {
        initial: {
            // y: -10,
            opacity: 1
        },
        onShow: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        },
    }

    const animaChild = {
        initial: {
            y: -10,
            opacity: 0
        },
        onShow: {
            y: 0,
            opacity: 1,

        }
    }


    return (
        <div className='dashboard-main-container'>
            <h2>Dashboard Pemeriksaan</h2>
            <motion.ul variants={anima} animate='onShow' initial='initial' className='dashboard-main-menu'>
                <motion.li variants={animaChild} className={navContext.nav === 1 ? 'menu active' : 'menu inactive'} 
                onClick={() => tabActive(1)}
                onMouseOver={() => sethoveredNav(1)
                }>Overview</motion.li>

                <motion.li variants={animaChild} className={navContext.nav === 2 ? 'menu active' : 'menu inactive'} 
                onClick={() => tabActive(2)}
                onMouseOver={() => sethoveredNav(2)
                }>Usulan Pemeriksaan</motion.li>

                <motion.li variants={animaChild} className={navContext.nav === 3 ? 'menu active' : 'menu inactive'} 
                onClick={() => tabActive(3)}
                onMouseOver={() => sethoveredNav(3)}
                >Tunggakan</motion.li>

                <motion.li variants={animaChild} className={navContext.nav === 4 ? 'menu active' : 'menu inactive'} 
                onClick={() => tabActive(4)}
                onMouseOver={() => sethoveredNav(4)
                }>Pemeriksaan Selesai</motion.li>

                <motion.div
                    animate={{
                        x: navContext.nav === 1 ? 0
                            : navContext.nav === 2 ? 130
                                : navContext.nav === 3 ? 280
                                    : 420
                    }}

                    className='menu-active-indicator'></motion.div>
            </motion.ul>

        </div>
    )
}

export default DashboardNav