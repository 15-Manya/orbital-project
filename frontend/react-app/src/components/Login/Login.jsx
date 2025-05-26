import styles from './Login.module.css'
import logo from "../../assets/logo-dark.png";
import google from "../../assets//google_logo.png";
import { Link } from 'react-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { provider } from "../../Firebase";
import { signInWithPopup } from 'firebase/auth';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () =>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Sign in successful!')
                navigate("/");
                // ...
            })
            .catch((error) => {
                setError('Login failed, please try again!')
  });
    }

        const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up using Google Sign-Up");
            navigate("/");
            setError('');
        })
        .catch((error) => {
            // console.error("Google Sign-Up Unsuccessful : ", error.message)
            console.log(error.code);    // e.g., "auth/unauthorized-domain"
            console.log(error.message); // Human-readable error
            setError('Login failed,please try again!')
        });
        }

  
    
    return (
        <>
            <div className={styles.body}>

                <div className={styles.white_box}>
                    <Link to="/experience"><img className={styles.logo} src={logo}></img></Link>

                    <p className={styles.login}><b>Login to your account</b></p>

                    <div className={styles.username}>
                        {error && <p className={styles.error}>{error}</p>}
                        <p className={styles.email}><b>Email or Username</b></p>
                        <input type="text" placeholder="Email or Username" className={styles.box1} onChange={e => setEmail(e.target.value)}/>

                        <p className={styles.password}><b>Password</b></p>
                        <input type="password" placeholder="Password" className={styles.box2} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <a className={styles.forgot_password} href="#">forgot password?</a>

                    <div className={styles.remember_me}>
                        <input type="checkbox" className={styles.select}/>Remember Me
                    </div>

                    <button className={styles.login_button} onClick={handleLogin}>Login</button>

                    <p className={styles.or}>or</p>

                    <button className={styles.google} onClick={signInWithGoogle}>
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