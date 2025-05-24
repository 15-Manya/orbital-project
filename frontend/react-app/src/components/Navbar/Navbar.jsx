import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import {Link} from "react-router";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.flexContainer}`}>
                <div className={styles.logo}>
                    <a href="/">
                    <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className={styles.buttons}>
                    <Link to="/login">
                        <button className="btn text-sm">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className={`btn ${styles.btndark} text-sm`}>Sign up</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;