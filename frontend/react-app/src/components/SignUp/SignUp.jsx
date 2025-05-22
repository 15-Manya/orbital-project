import styles from './SignUp.module.css'
import logo from "../../assets//nextbook_image.png";
import google from "../../assets//google_logo.png";
function Login() {
    return (
        <>
            <div className={styles.body}>

                <div className={styles.white_box}>
                    <img className={styles.logo} src={logo}></img>
                    <p className={styles.login}><b>Create your account</b></p>

                    <div className={styles.username}>
                        <p className={styles.email}><b>Username</b></p>
                        <input type="text" placeholder="Username" className={styles.box1}/>

                        <p className={styles.password}><b>Password</b></p>
                        <input type="password" placeholder="Password" className={styles.box2}/>

                        <p className={styles.re_password}><b>Re-enter password</b></p>
                        <input type="password" placeholder="Re-enter password" className={styles.box3}/>
                    </div>

                    <div className={styles.remember_me}>
                        <input type="checkbox" className={styles.select}/>Remember Me
                    </div>

                    <button className={styles.login_button}>Create an account</button>

                    <p className={styles.or}>or</p>

                    <button className={styles.google}>
                        <img src={google} className={styles.icon}></img>
                        Sign Up with Google
                    </button>

                    <div className={styles.no_account}>
                        Already have an account?
                        <a className={styles.sign_up} href="#">Login</a>
                    </div>


                </div>

                




            </div>
        </>
    );
}

export default Login;