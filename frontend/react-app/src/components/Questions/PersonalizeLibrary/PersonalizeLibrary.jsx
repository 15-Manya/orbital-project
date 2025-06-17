import styles from './PersonalizeLibrary.module.css';
import { useState } from 'react';
import { useUser } from '../UserResponse';
import { useNavigate } from 'react-router-dom';

function PersonalizeLibrary() {
  const { userData, updateData } = useUser();
  const [usernameInput, setUsernameInput] = useState(userData.username || '');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (usernameInput.trim() === '') {
      alert('Please enter your name');
      return;
    }

    updateData({ username: usernameInput });

    console.log("📦 Final JSON:", JSON.stringify({
        ...userData,
        username: usernameInput,
        profile_complete: true
      }, null, 2));

    try {
        const response = await fetch('http://localhost:8000/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...userData,
              username: usernameInput,
              profile_complete: true
            }),
        });

      if (!response.ok) throw new Error('Failed to save user data');

      const result = await response.json();
      console.log('✅ Data saved:', result);

      navigate('/home');
    } catch (error) {
      console.error('❌ Error saving data:', error);
      alert('There was an error saving your data. Please try again.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.flex}>
        <div className={styles.txtbox}>
          <div className={styles.txt1}>✨Ready to see your</div>
          <div className={styles.txt1}>personalized library✨</div>

          <div className={styles.line}>
            <input
              className={styles.text}
              type='text'
              placeholder='What should we call you?'
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <button className={styles.btn} onClick={handleSubmit}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizeLibrary;
