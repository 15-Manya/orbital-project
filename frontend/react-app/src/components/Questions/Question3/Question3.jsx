import styles from './Question3.module.css';
import { Link } from 'react-router';

function GenreExplore() {
    const genres = ['Action', 'Adventure', 'Comedy', 'Crime/Mystery', 'Fantasy', 'History', 'Horror', 'Romance', 'Thriller', 'Non-fiction', 'Others'];
    return (
        <div className={styles.body}>
                <div className={`container ${styles.display}`}>
                <div className={styles.box}>
                    <h1>3. What are your current favourite books?</h1>
                    <ol>
                        <li><input type="text" name="text" className={styles.text}/></li>
                        <li><input type="text" name="text" className={styles.text}/></li>
                        <li><input type="text" name="text" className={styles.text}/></li>
                    </ol>
                    <div className={styles.nav}>
                        <Link to='/q2'className='link'><p> &lt; Prev</p></Link>
                        <p> | </p>
                        <Link to='/personalizeLibrary' className='link'><p> Next &gt;</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenreExplore;