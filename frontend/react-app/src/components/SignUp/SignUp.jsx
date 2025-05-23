import styles from './SignUp.module.css'
import logo from "../../assets//nextbook_image.png";
import google from "../../assets//google_logo.png";
import { Link } from 'react-router';
import {auth} from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../Firebase";
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState('');  //storing the email user input
    const [password, setPassword] = useState(''); //storing the password the user input
    const [rePassword, setRePassword] = useState(''); //storing the re-entered password
    const [error, setError] = useState(''); //storing the error at the current state

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
            setError('');
        })
        .catch((error) => {
            console.error("Google Sign-Up Unsuccessful : ", error.message)
        });
    }
    return (
        <>
            <div className={styles.body}>

                <div className={styles.white_box}>
                    <img className={styles.logo} src={logo}></img>
                    <p className={styles.login}><b>Create your account</b></p>

                    <div className={styles.username}>
                        {error && <p className={styles.error}>{error}</p>}
                        <p className={styles.email}><b>Email</b></p>
                        <input type="email" placeholder="Email" className={styles.box1} value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <p className={styles.password}><b>Password</b></p>
                        <input type="password" placeholder="Password" className={styles.box2} value={password} onChange={(e) => setPassword(e.target.value)}/>

                        <p className={styles.re_password}><b>Re-enter password</b></p>
                        <input type="password" placeholder="Re-enter password" className={styles.box3} value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                    </div>

                    <div className={styles.remember_me}>
                        <input type="checkbox" className={styles.select}/>Remember Me
                    </div>

                    <button className={styles.login_button} onClick={signup}>Create an account</button>

                    <p className={styles.or}>or</p>

                    <button className={styles.google} onClick={googleSignUp}>
                        <img src={google} className={styles.icon}></img>
                        Sign Up with Google
                    </button>

                    <div className={styles.no_account}>
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;