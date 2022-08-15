import { useState, createContext } from "react"

export const NotifContext = createContext()

export const NotifProvider = props => {
    const [notifLoader, setNotifLoader] = useState(true)

    return (
        <NotifContext.Provider value={{
            notifLoader,
            setNotifLoader
        }}>
            {props.children}
        </NotifContext.Provider>
    )
}