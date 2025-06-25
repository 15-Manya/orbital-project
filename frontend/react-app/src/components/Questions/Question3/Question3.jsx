import styles from './Question3.module.css';
import { useState } from 'react';
import { useUser } from '../UserResponse';
import { useNavigate } from 'react-router';

function Question3() {
  const { userData, updateData } = useUser();
  const navigate = useNavigate();

  const [book1, setBook1] = useState(userData.favBooks[0] || '');
  const [book2, setBook2] = useState(userData.favBooks[1] || '');
  const [book3, setBook3] = useState(userData.favBooks[2] || '');

  const handleNext = () => {
    const books = [book1, book2, book3]
      .map(book => book.trim())
      .filter(book => book !== '');
  
    if (books.length < 3) {
      alert("Please fill all the fields.");
      return;
    }
  
    const uniqueBooks = new Set(books);
    if (uniqueBooks.size !== books.length) {
      alert("Please make sure all entered books are different.");
      return;
    }
  
    updateData({ favBooks: books });
    navigate('/personalizeLibrary');
  };

  const handlePrev = () => {
    navigate('/q2');
  };

  return (
    <div className={styles.body}>
      <div className={`container ${styles.display}`}>
        <div className={styles.box}>
          <h1>3. What are your current favourite books?</h1>
          <ol>
            <li>
              <input
                type="text"
                name="text"
                className={styles.text}
                value={book1}
                onChange={(e) => setBook1(e.target.value)}
              />
            </li>
            <li>
              <input
                type="text"
                name="text"
                className={styles.text}
                value={book2}
                onChange={(e) => setBook2(e.target.value)}
              />
            </li>
            <li>
              <input
                type="text"
                name="text"
                className={styles.text}
                value={book3}
                onChange={(e) => setBook3(e.target.value)}
              />
            </li>
          </ol>
          <div className={styles.nav}>
            <a onClick={handlePrev} className="link">&lt; Prev</a>
            <p> | </p>
            <a onClick={handleNext} className="link">Next &gt;</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question3;
