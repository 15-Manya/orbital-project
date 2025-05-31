import styles from './ForgotPassWord.module.css';
import logo from "../../assets/logo-dark.png";
import { Link } from 'react-router';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase";
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
            setError("Please enter your email address");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage("If an account with that email exists, a password reset link has been sent to your email.");
                setLoading(false);
                // Optional: Navigate back to login after a delay
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                console.log(error.code);
                setError("Failed to send reset email. Please try again.");
                setLoading(false);
            });
    };

    return (
        <div className={styles.body}>
            <div className={styles.white_box}>
                <Link to="/login">
                    <img className={styles.logo} src={logo} alt="Logo" />
                </Link>

                <p className={styles.title}><b>Reset your password</b></p>

                <div className={styles.form_container}>
                    {error && <p className={styles.error}>{error}</p>}
                    {message && <p className={styles.success}>{message}</p>}

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
                        className={styles.reset_button} 
                        onClick={handlePasswordReset}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Email"}
                    </button>

                    <div className={styles.back_to_login}>
                        Remember your password? 
                        <Link to='/login'> Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
