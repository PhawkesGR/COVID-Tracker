import styles from './Selector.module.scss'
import { useState } from 'react'
import { nanoid } from 'nanoid'

function Selector (props) {
    const [options, setOptions] = useState(props.options)

    const selectionChanged = selection => {
        setOptions(options.map(o => {
            if (o.displayText === selection.displayText) {
                o.selected = true
            } else {
                o.selected = false
            }
            return o
        }))
        props.onClick(selection)
    }

    return (
    <div className={styles.container}>
        {
            options.length > 0 ?
                options.map(o => {
                    return (
                        <div 
                            key={nanoid()}
                            onClick={() => selectionChanged(o)}
                            className={`${styles.option} ${o.selected ? styles.selected : ''}`}
                        >
                            {o.displayText}
                        </div>
                    )
                })
                : null
        }
    </div>
    )
}

export default Selector;
