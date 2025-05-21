import styles from "./Navbar.module.css";
import logo from "../../assets/nav/logo.png";

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
                    <button className="btn text-sm">Login</button>
                    <button className={`btn ${styles.btndark} text-sm`}>Sign up</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;