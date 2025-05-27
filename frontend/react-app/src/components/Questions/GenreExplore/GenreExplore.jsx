import styles from './GenreExplore.module.css';

function GenreExplore() {
    const genres = ['Action', 'Adventure', 'Comedy', 'Crime/Mystery', 'Fantasy', 'History', 'Horror', 'Romance', 'Thriller', 'Non-fiction', 'Others'];
    return (
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
                    <p> &lt; Prev</p>
                    <p> | </p>
                    <p> Next &gt;</p>
                </div>
            </div>
        </div>
    );
}

export default GenreExplore;