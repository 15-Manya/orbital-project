import styles from './Question2.module.css';
import { Link } from 'react-router';

function GenreExplore() {
    const genres = ['Action', 'Adventure', 'Comedy', 'Crime/Mystery', 'Fantasy', 'History', 'Horror', 'Romance', 'Thriller', 'Non-fiction', 'Others'];
    return (
        <div className={styles.body}>
                <div className={`container ${styles.display}`}>
                <div className={styles.box}>
                    <h1>2. What genres do you want to explore more?</h1>
                    <div className={styles.grid}>
                        {genres.map(genre => (
                            <label key={genre} className={styles.genre}>
                                <input type="checkbox" />{genre}
                            </label>
                        ))}
                    </div>
                    <div className={styles.nav}>
                        <Link to='/q1'className='link'><p> &lt; Prev</p></Link>
                        <p> | </p>
                        <Link to='/q3' className='link'><p> Next &gt;</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenreExplore;