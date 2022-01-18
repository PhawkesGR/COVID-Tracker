import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

function Navbar() {
    return (
        <div className={styles.navbar}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/graphs">Graphs</NavLink>
            <NavLink to="/vaccines">Vaccinations</NavLink>
        </div>
    )
}

export default Navbar
