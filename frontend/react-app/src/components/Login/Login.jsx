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
                fetch(`https://orbital-project-8fn9.onrender.com/get-user?uid=${user.uid}`)
                .then((res) => res.json())
                .then((userData) => {
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log('Login successful!');
                    console.log(userData)
                    if (userData.profile_complete) {
                        navigate("/home");
                    } else {
                        navigate("/personalizeExperience");
                    }
                    setError('');
                })
                .catch((error) => {
                    console.error("Failed to fetch user data from backend", error);
                    setError('Login failed, please try again!');
                });
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
            fetch(`https://orbital-project-8fn9.onrender.com/get-user?uid=${user.uid}`)
                .then((res) => res.json())
                .then((userData) => {
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log("User signed in using Google Sign-In");
                    if (userData.profile_complete) {
                        navigate("/home");
                    } else {
                        navigate("/personalizeExperience");
                    }
                    setError('');
                })
                .catch((error) => {
                    console.error("Failed to fetch user data from backend", error);
                    setError('Login failed, please try again!');
                });
        })
        .catch((error) => {
            // console.error("Google Sign-Up Unsuccessful : ", error.message)
            console.log(error.code);    // e.g., "auth/unauthorized-domain"
            console.log(error.message); // Human-readable error
            setError('Login failed,please try again!')
        });
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
  
    
    return (
        <>
            <div className={styles.body}>
                <div className={`container ${styles.display}`}>
                    <div className={styles.white_box}>
                        <Link to="/"><img className={styles.logo} src={logo}></img></Link>

                        <p className={styles.login}><b>Login to your account</b></p>
                        <div className={styles.credentials}>
                            <div className={styles.username}>
                                {error && <p className={styles.error}>{error}</p>}
                                <p className={styles.email}><b>Email</b></p>
                                <input type="text" placeholder="Email" className={styles.box1} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown}/>

                                <p className={styles.password}><b>Password</b></p>
                                <input type="password" placeholder="Password" className={styles.box2} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                            </div>
                        </div>

                        <Link to="/forgot-password" className={styles.forgot_password}>forgot password?</Link>

                        <div className={styles.remember_me}>
                            <input type="checkbox" className={styles.select}/>Remember Me
                        </div>

                        <button className={`btn ${styles.btndark}`} onClick={handleLogin}>Login</button>

                        <p className={styles.or}>or</p>

                        <button className={`btn ${styles.google}`} onClick={signInWithGoogle}>
                            <img src={google} className={styles.icon}></img>
                            Continue with Google
                        </button>
                        <div className={styles.sign_up}>
                            <p>
                                Don't have an account?
                                <Link to="/signup"> Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;