import styles from './Infobox.module.scss'
import { beautifyNumber } from '../../utils'

export default function InfoBox({ title, subValue, value, active, metric, prefix, ...props }) {
    // const activeInfoBoxClass = () => {
    //     if (active) {
    //         return metric === 'cases' ? styles.cases
    //             : metric === 'recovered' ? styles.recovered
    //             : styles.deaths
    //     } else {
    //         return ''
    //     }
    // }
    return (
        <div className={`${styles.card}`} style={props.topBorderColor && active ? {borderTop: `10px solid ${props.topBorderColor}`} : null} onClick={props.onClick}>
            <div className={styles.cardTitle}>
                {title}
            </div>
            <div className={`${styles.cardValue} ${styles[metric]}`}>
                {prefix ? prefix : ''}{beautifyNumber(value)}
            </div>
            <div className={styles.cardSubvalue}>
                {
                    subValue ? subValue: ''
                }
            </div>
        </div>
    )
}
