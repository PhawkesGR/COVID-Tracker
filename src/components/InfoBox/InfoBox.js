import styles from './Infobox.module.scss'
import { beautifyNumber } from '../../utils'
import Loader from '../Loader/Loader'

export default function InfoBox({ title, subValue, value, active, prefix, ...props }) {
    return (
        <div className={`${styles.card}`} style={props.topBorderColor && active ? {borderTop: `10px solid ${props.topBorderColor}`} : null} onClick={props.onClick}>
            {
                Number.isInteger(value) ? 
                <>
                    <div className={styles.cardTitle}>
                        {title}
                    </div>
                    <div style={props.topBorderColor ? { color: props.topBorderColor } : null} className={styles.cardValue}>
                        {prefix ? prefix : ''}{beautifyNumber(value)}
                    </div>
                    <div className={styles.cardSubvalue}>
                        {subValue ? subValue : ''}
                    </div>
                </> : <Loader />
            }
        </div>
    )
}
