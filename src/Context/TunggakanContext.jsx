import { useState, createContext } from "react"

export const TunggakanContext = createContext()

export const TunggakanProvider = props => {

    const [pemsusFilter, setpemsusFilter] = useState(true)
    const [rutinFilter, setrutinFilter] = useState(true)
    const [rutinLBFilter, setrutinLBFilter] = useState(true)
    const [tujuanLainFilter, settujuanLainFilter] = useState(true)






    return (
        <TunggakanContext.Provider value={{
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
        </TunggakanContext.Provider>
    )

}