import Navbar from '../Navbar/Navbar';
import styles from './LandingPage.module.css';
import { useState } from 'react';
import { Link } from 'react-router';

function LandingPage() {
    const [email, setEmail] = useState('');

    return (
        <div className={styles.body}>
            <Navbar />
            <div className={styles.landingPage}>
                <div className='container-sm'>
                    <div className="heading">
                        <h1 className={styles.main_heading}>Your next favorite book and podcast — recommended just for you.</h1>
                        <p className={styles.sub_heading}>Discover personalized reads and listens. One click away.</p>
                    </div>
                    <div className={styles.enter}>
                        <input id = "email" type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Link to="/signup">
                            <button className={`btn ${styles.btndark}`}>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;