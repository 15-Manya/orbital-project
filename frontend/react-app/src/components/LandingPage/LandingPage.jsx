import Navbar from '../Navbar/Navbar';
import styles from './LandingPage.module.css';
function LandingPage() {
    return (
        <div className={styles.body}>
            <Navbar />
            <div className={styles.landingPage}>
                <div className='container-sm'>
                    <div className="heading">
                        <h1 className={styles.main_heading}>Your next favorite book and podcast — recommended just for you.</h1>
                        <p className={styles.sub_heading}>Discover personalized reads and listens. One click away.</p>
                    </div>
                    <div className="enter-email">
                        <input id = "email" type="email" placeholder='Enter your email'/>
                        <button className={`btn ${styles.btndark}`}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;