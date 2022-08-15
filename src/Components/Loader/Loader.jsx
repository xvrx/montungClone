import React from 'react'
import './loader.css'

const Loader = () => {
    return (
        <div className="loader-background">
            <div className="loader-container">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Loader