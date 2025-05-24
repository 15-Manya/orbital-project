import styles from './Login.module.css'
import logo from "../../assets/logo-dark.png";
import google from "../../assets//google_logo.png";
import { Link } from 'react-router';
function Login() {
    return (
        <>
            <div className={styles.body}>

                <div className={styles.white_box}>
                    <Link to="/"><img className={styles.logo} src={logo}></img></Link>
                    <p className={styles.login}><b>Login to your account</b></p>

                    <div className={styles.username}>
                        <p className={styles.email}><b>Email or Username</b></p>
                        <input type="text" placeholder="Email or Username" className={styles.box1}/>

                        <p className={styles.password}><b>Password</b></p>
                        <input type="password" placeholder="Password" className={styles.box2}/>
                    </div>

                    <a className={styles.forgot_password} href="#">forgot password?</a>

                    <div className={styles.remember_me}>
                        <input type="checkbox" className={styles.select}/>Remember Me
                    </div>

                    <button className={styles.login_button}>Login</button>

                    <p className={styles.or}>or</p>

                    <button className={styles.google}>
                        <img src={google} className={styles.icon}></img>
                        Continue with Google
                    </button>

                    <div className={styles.no_account}>
                        Don't have an account?
                        <Link to='/signup'>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;