import React from 'react'
import './LoaderLogin.css'

const LoaderLogin = () => {
    return (
        <div className="loader-background-2">
            <div className="loader-container-2">
                <div className="lds-ring-2">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderLogin