import { React } from 'react'
import { nanoid } from 'nanoid'
import { formatNumber } from '../../utils.js'
import styles from './Table.module.scss'
import { useState, useEffect } from 'react'

function Table ({data}) {
    const [currentTable, setCurrentTable] = useState({})

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            const { defaultTable } = data
            setCurrentTable(data.tables[defaultTable])
        }
    }, [data])
    
    const changeStatistics = (action) => {
        const totalTables = Object.keys(data.tables).length
        const tables = Object.values(data.tables)
        if (action === 'next') {
            // get back to the first stat, if the current is the last one
            if (currentTable.index === totalTables - 1) return setCurrentTable(tables.find(t => t.index === 0))
            return setCurrentTable(tables.find(t => t.index === currentTable.index + 1))
        } else {
            // go to the last stat, if the current is the first one
            if (currentTable.index === 0) return setCurrentTable(tables.find(t => t.index === totalTables - 1))
            return setCurrentTable(tables.find(t => t.index === currentTable.index + - 1))
        }
    }

    const renderMultipleTables = () => {
        return (
            <div className={styles.title}>
                <i
                    className='material-icons'
                    onClick={() => changeStatistics('previous')}
                >
                    arrow_back_ios
                </i>
                <h1>{currentTable.title}</h1>
                <i
                    className='material-icons'
                    onClick={() => changeStatistics('next')}
                >
                    arrow_forward_ios
                </i>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {
                data.tables && Object.keys(data.tables).length > 1 ? renderMultipleTables() : <h1>{currentTable.title}</h1>
            }
            <div className={styles.table}>
                {
                    Object.keys(data).length > 1 &&
                    <table>
                        <tbody>
                            {Object.keys(currentTable).length > 0 && currentTable.data.map((d) => (
                                <tr key={nanoid()}>
                                    <td>{d.key}</td>
                                    <td>
                                        <strong>{formatNumber(d.value)}</strong>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Table
