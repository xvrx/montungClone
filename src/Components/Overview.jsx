import React from 'react'
import '../styles/overview.css'
import Table from './overview/Table'
import TargetGraph from './overview/TargetGraph'
import { FaChartLine, FaHubspot } from 'react-icons/fa'
import Aktivitas from './overview/Aktivitas'
import { motion } from 'framer-motion'


const Overview = () => {



    return (
        <motion.div className='overview-container' style={{ width: '100%', height: '100%' }} initial={{ x: -600, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}>
            <div className="overview-stats">
                <Table />
            </div>
            <div className="line-stats-container">
                <div className="overview-target">
                    <div>
                        <p style={{ display: 'flex', alignItems: 'center' }}><FaChartLine size={20} style={{ margin: '10px' }} />Realisasi dan Prognosa</p>
                    </div>
                    <div className='overview-target-graph'>
                        <TargetGraph />
                    </div>
                </div>
                <div className='overvew-target-aktivitas'>
                    <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}><FaHubspot size={20} style={{ marginRight: '10px' }} />Penyelesaian LHP</p>
                    <Aktivitas />
                </div>
            </div>
        </motion.div>
    )
}

export default Overview