import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

function Navbar() {
    return (
        <div className={styles.navbar}>
            <NavLink className={state => state.isActive ? styles.active : styles.inactive} to="/">Home</NavLink>
            <NavLink className={state => state.isActive ? styles.active : styles.inactive} to="/graphs">Graphs</NavLink>
            <NavLink className={state => state.isActive ? styles.active : styles.inactive} to="/vaccines">Vaccines</NavLink>
        </div>
    )
}

export default Navbar
