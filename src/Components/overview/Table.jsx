import React, { useContext } from 'react'
import { FaChevronLeft, FaChevronRight, FaChartPie } from 'react-icons/fa'
import TableAll from './TableAll'
import { NavContext } from '../../Context/NavContext'
import TablePemsus from './TablePemsus'
import TableRutin from './TableRutin'

const Table = () => {

    const { overviewTable, setIncrementTable, setDecrementTable } = useContext(NavContext)

    return (
        <div className='Table'>
            <div className='overview-table-setting'>
                <div className="stats-container">
                    <div >
                        <p style={{ display: 'flex', alignItems: 'center' }}> <FaChartPie size={20} style={{ marginRight: '10px' }} />   Monitoring Pemeriksaan</p>
                    </div>
                    <div className='set-stats-container'>
                        {/* <div id='set-stats' onClick={setDecrementTable}>
                            <FaChevronLeft color='FDBC2C' />
                        </div>
                        <div id='set-stats' onClick={setIncrementTable}>
                            <FaChevronRight color='FDBC2C' />
                        </div> */}
                    </div>

                </div>

            </div>
            {overviewTable === 1 ? <TableAll />
                : overviewTable === 2 ? <TablePemsus />
                    : <TableRutin />
            }
        </div>
    )
}

export default Table