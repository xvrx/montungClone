import { useState, createContext } from "react"

export const UsulanContext = createContext()

export const UsulanProvider = props => {

    const [pemsusFilter, setpemsusFilter] = useState(true)
    const [rutinFilter, setrutinFilter] = useState(true)
    const [rutinLBFilter, setrutinLBFilter] = useState(true)
    const [tujuanLainFilter, settujuanLainFilter] = useState(true)






    return (
        <UsulanContext.Provider value={{
            pemsusFilter,
            setpemsusFilter,
            rutinFilter,
            setrutinFilter,
            rutinLBFilter,
            setrutinLBFilter,
            tujuanLainFilter,
            settujuanLainFilter
        }}>
            {props.children}
        </UsulanContext.Provider>
    )

}