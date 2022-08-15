import React from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import './AboutModal.css'
import { motion } from 'framer-motion'

const AboutModal = ({ title, content, closeModal }) => {

    return (
        <motion.div className="about-modal-subcontainer" animate={{ y: 0, transition: { duration: 0.5 } }} initial={{ y: -500 }}>
            <div className="about-modal-inner">
                <div className="about-modal-title">
                    <h3>
                        {title}
                    </h3>
                </div>
                <div className='about-modal-close' onClick={closeModal}><FaRegWindowClose size={20} color='#fdbc2c' /></div>
                <div className="content-container">
                    <div className="about-modal-content">
                        <p>
                            {content}
                        </p>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default AboutModal