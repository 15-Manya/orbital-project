import styles from './Questions.module.css';
import GenreEnjoy from './GenreEnjoy/GenreEnjoy';
import GenreExplore from './GenreExplore/GenreExplore';

function Questions() {
    return (
        <div className={styles.body}>
            <GenreEnjoy />
            <GenreExplore />
        </div>
    );
}

export default Questions;