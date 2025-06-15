import styles from './Question1.module.css';
import { Link } from 'react-router';

function Question1() {
    const genres = ['Action', 'Adventure', 'Comedy', 'Crime/Mystery', 'Fantasy', 'History', 'Horror', 'Romance', 'Thriller', 'Non-fiction', 'Others'];
    return (
        <div className={styles.body}>
            <div className={`container ${styles.display}`}>
            <div className={styles.box}>
                <h1>1. What genres do you enjoy reading?</h1>
                <div className={styles.grid}>
                    {genres.map(genre => (
                        <label key={genre} className={styles.genre}>
                            <input type="checkbox" />{genre} 
                        </label>
                    ))}
                </div>
                <div className={styles.nav}>
                    <Link to='/personalizeExperience' className='link'><p> &lt; Prev</p></Link>
                    <p> | </p>
                    <Link to="/q2" className='link'><p> Next &gt;</p></Link>
                </div>
            </div>
         </div>
        </div>
    );
}

export default Question1;