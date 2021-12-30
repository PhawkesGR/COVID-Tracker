import styles from './Infobox.module.scss'

export default function InfoBox(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                {props.title}
            </div>
            <div className={styles.cardValue}>
                + {props.value}
            </div>
            <div className={styles.cardSubvalue}>
                {props.subValue} Total {props.title}
            </div>
        </div>
    )
}
