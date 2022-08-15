import { useState, createContext } from "react"

export const NavContext = createContext()

export const NavProvider = props => {


    const [overviewTable, setoverviewTable] = useState(1)

    function setIncrementTable() {
        if (overviewTable < 3) {
            setoverviewTable(overviewTable + 1)
        } else {
            setoverviewTable(3)
        }
    }
    function setDecrementTable() {
        if (overviewTable > 1) {
            setoverviewTable(overviewTable - 1)
        } else {
            setoverviewTable(1)
        }
    }

    function pussy() {
        console.log(nav,hoveredNav)
    }

    const [nav, setNav] = useState(1)
    const [hoveredNav, sethoveredNav] = useState(1)
    const [previousNav, setpreviousNav] = useState(1)

    function tabActive(activeTab) {
        if (activeTab === nav) { } else {
            setpreviousNav(nav)
            setNav(activeTab)
        }
    }

    return (
        <NavContext.Provider value={{ nav, tabActive, overviewTable, setIncrementTable, setDecrementTable, hoveredNav, sethoveredNav,previousNav, pussy }}>
            {props.children}
        </NavContext.Provider>
    )






}