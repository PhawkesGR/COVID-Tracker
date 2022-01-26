import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

function Navbar() {

    const classes = state => `material-icons ${state.isActive ? styles.active : styles.inactive}` 
    return (
        <div className={styles.navbar}>
            <NavLink className={state => classes(state)} to="/">home</NavLink>
            <NavLink className={state => classes(state)} to="/graphs">bar_chart</NavLink>
            <NavLink className={state => classes(state)} to="/vaccines">vaccines</NavLink>
        </div>
    )
}

export default Navbar
