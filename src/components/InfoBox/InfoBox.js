import styles from './Infobox.module.scss'
import { beautifyNumber } from '../../utils'

export default function InfoBox({ title, subValue, value, active, metric, ...props }) {
    const activeInfoBoxClass = () => {
        if (active) {
            return metric === 'cases' ? styles.cases
                : metric === 'recovered' ? styles.recovered
                : styles.deaths
        } else {
            return ''
        }
    }
    return (
        <div className={`${styles.card} ${activeInfoBoxClass()}`} onClick={props.onClick}>
            <div className={styles.cardTitle}>
                {title}
            </div>
            <div className={`${styles.cardValue} ${styles[metric]}`}>
                + {beautifyNumber(value)}
            </div>
            <div className={styles.cardSubvalue}>
                {beautifyNumber(subValue)} Total {title}
            </div>
        </div>
    )
}
