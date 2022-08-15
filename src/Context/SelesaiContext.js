import { useState, createContext } from "react"

export const SelesaiContext = createContext()

export const SelesaiProvider = props => {

    const [pemsusFilter, setpemsusFilter] = useState(true)
    const [rutinFilter, setrutinFilter] = useState(true)
    const [rutinLBFilter, setrutinLBFilter] = useState(true)
    const [tujuanLainFilter, settujuanLainFilter] = useState(true)






    return (
        <SelesaiContext.Provider value={{
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
        </SelesaiContext.Provider>
    )

}