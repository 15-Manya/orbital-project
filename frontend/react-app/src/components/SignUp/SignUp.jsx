import styles from './SignUp.module.css'
import logo from "../../assets/logo-dark.png";
import google from "../../assets//google_logo.png";
import { Link } from 'react-router';
import {auth} from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../Firebase";
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUp() {
    const [email, setEmail] = useState('');  //storing the email user input
    const [password, setPassword] = useState(''); //storing the password the user input
    const [rePassword, setRePassword] = useState(''); //storing the re-entered password
    const [error, setError] = useState(''); //storing the error at the current state
    const navigate = useNavigate();

    const signup = () => {
        if(password != rePassword) {
            setError("Passwords don't match")
            return;
        }
        //using the firebase code for sign up
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up : ', user);
            navigate('/personalizeExperience');
            setError('');
        })
        .catch((error) => {
            setError('Sign up failed. Please check your details and try again.')
        });
    }

    const googleSignUp = () => {
        signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up using Google Sign-Up");
            navigate('/personalizeExperience');
            setError('');
        })
        .catch((error) => {
            console.error("Google Sign-Up Unsuccessful : ", error.message)
        });
    }
    return (
        <>
            <div className={styles.body}>
                <div className={`container ${styles.display}`}>
                    <div className={styles.white_box}>
                        <Link to="/"><img className={styles.logo} src={logo}></img></Link>
                        <p className={styles.sign_up}><b>Create your account</b></p>

                        <div className={styles.credentials}>
                            {error && <p className={styles.error}>{error}</p>}
                            <p className={styles.email}><b>Email</b></p>
                            <input type="email" placeholder="Email" className={styles.box1} value={email} onChange={(e) => setEmail(e.target.value)}/>

                            <p className={styles.password}><b>Password</b></p>
                            <input type="password" placeholder="Password" className={styles.box2} value={password} onChange={(e) => setPassword(e.target.value)}/>

                            <p className={styles.re_password}><b>Re-enter password</b></p>
                            <input type="password" placeholder="Re-enter password" className={styles.box3} value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                        </div>
                        <div className={styles.remember_me}>
                            <input type="checkbox" id="remember" className={styles.select} />
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        

                        <button className={`btn ${styles.btndark}`} onClick={signup}>Create an account</button>

                        <p className={styles.or}>or</p>

                        <button className={`btn ${styles.google}`} onClick={googleSignUp}>
                            <img src={google} className={styles.icon}></img>
                            Sign Up with Google
                        </button>

                        <div className={styles.login}>
                            <p>
                                Already have an account? 
                                <Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;