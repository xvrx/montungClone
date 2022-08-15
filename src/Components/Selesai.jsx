import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { NavContext } from '../Context/NavContext'
import FragmentSelesai from './Fragments/Selesai/FragmentSelesai'

const Selesai = () => {
    const { nav } = useContext(NavContext)
    return (
        <motion.div style={{ width: '100%', height: '100%' }} initial={{ x: nav > 4 ? -600 : 600, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}>
            <FragmentSelesai />
        </motion.div>
    )
}

export default Selesai