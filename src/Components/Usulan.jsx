import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { NavContext } from '../Context/NavContext'
import FragmentUsulan from './Fragments/Usulan/FragmentUsulan'

const Usulan = () => {
    const { nav,hoveredNav, previousNav } = useContext(NavContext)
    return (
        <motion.div style={{ width: '100%', height: '100%' }} initial={
            { x: previousNav > 2 || nav > 2 ? -600 : 600
        , opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}>
            <FragmentUsulan />
        </motion.div>
    )
}

export default Usulan