import styles from './Question2.module.css';
import { useState } from 'react';
import { useUser } from '../UserResponse';
import { useNavigate } from 'react-router';

function GenreExplore() {
  const genres = ['Action', 'Adventure', 'Comedy', 'Crime/Mystery', 'Fantasy', 'History', 'Horror', 'Romance', 'Thriller', 'Non-fiction', 'Others'];
  const { userData, updateData } = useUser();
  const [selectedGenres, setSelectedGenres] = useState(userData.genresToExplore || []);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(prev => prev.filter(g => g !== genre));
    } else {
      setSelectedGenres(prev => [...prev, genre]);
    }
  };

  const handleNext = () => {
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre to explore.");
      return;
    }
    updateData({ genresToExplore: selectedGenres });
    navigate('/q3');
  };

  const handlePrev = () => {
    navigate('/q1');
  };

  return (
    <div className={styles.body}>
      <div className={`container ${styles.display}`}>
        <div className={styles.box}>
          <h1>2. What genres do you want to explore more?</h1>
          <div className={styles.grid}>
            {genres.map(genre => (
              <label key={genre} className={styles.genre}>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          <div className={styles.nav}>
            <a onClick={handlePrev} className='link'>&lt; Prev</a>
            <p> | </p>
            <a onClick={handleNext} className='link'>Next &gt;</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreExplore;
