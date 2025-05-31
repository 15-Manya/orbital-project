import styles from './ForgotPassWord.module.css';
import logo from "../../../assets/logo-dark.png";
import { Link } from 'react-router';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase";
import { useState } from 'react';
import { useNavigate } from "react-router";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = () => {
        if (!email) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage("A password reset link has been sent to your email.");
                setLoading(false);
                // Optional: Navigate back to login after a delay
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                console.log(error.code);
                setError("Failed to send reset email. Please enter a valid email address.");
                setLoading(false);
            });
    };

    return (
        <div className={styles.body}>
            <div className={`container ${styles.display}`}>
                <div className={styles.white_box}>
                    <Link to="/login">
                        <img className={styles.logo} src={logo} alt="Logo" />
                    </Link>
                    {error && <p className={styles.error}>{error}</p>}
                    {message && <p className={styles.success}>{message}</p>}

                    <h1 className={styles.title}>Password Reset</h1>
                    <p className={styles.reset_info}>Please enter the email address associated with your account to reset the password</p>

                    <div className={styles.credentials}>
                        <p className={styles.email_label}><b>Email</b></p>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className={styles.email_input}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br></br>

                        <button 
                            className={`btn ${styles.btndark}`}
                            onClick={handlePasswordReset}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Email"}
                        </button>

                        <div className={styles.login}>
                            <p>
                                Remember your password?
                                <Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
