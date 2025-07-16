import styles from './Age.module.css';
import { useNavigate } from 'react-router'; 
import { useUser } from '../UserResponse';
import { useState } from 'react';

function Age() {
  const { userData, updateData } = useUser(); 
  const [ageInput, setAgeInput] = useState(userData.age || '');
  const navigate = useNavigate();

  const handleNextEnter = (e) => {
    const age = parseInt(ageInput, 10);
    if(e.key === 'Enter') {
    if (!isNaN(age) && age > 8 && age < 100) {
        updateData({ age }); 
      navigate('/q1'); 
    } else {
      alert('Please enter a valid age between 9 and 99');
    }}
  };

  const handleNext = () => {
    const age = parseInt(ageInput, 10);
    if (!isNaN(age) && age > 8 && age < 100) {
        updateData({ age }); 
      navigate('/q1'); 
    } else {
      alert('Please enter a valid age between 9 and 99');
    }
  };

  return (
    <div className={styles.body} tabIndex={0} onKeyDown={e => handleNextEnter(e)}>
      <div className={styles.flex}>
        <div className={styles.txtbox}>
          <div className={styles.txt1}>✨Please enter your age✨</div>
          <div className={styles.line}>
            <input
              className={styles.text}
              type="number"
              placeholder="What is your age?"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
            />
            <button className={styles.btn} onClick={handleNext}>
              Let's go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Age;
