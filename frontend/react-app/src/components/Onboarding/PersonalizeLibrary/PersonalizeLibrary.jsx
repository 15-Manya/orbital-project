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

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const uid = storedUser?.uid;
    console.log(uid);
    const email = storedUser?.email;
    console.log(email)
    const updatedUser = {
      uid,
      email,
      username: usernameInput,
      age: userData.age ?? null,
      preferredGenres: userData.preferredGenres ?? [],
      genresToExplore: userData.genresToExplore ?? [],
      favBooks: userData.favBooks ?? [],
      readBooks: userData.favBooks ?? [],
      profile_complete: true,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    updateData(updatedUser);

    console.log("📦 Final JSON:", JSON.stringify(updatedUser));

    try {
        const response = await fetch('https://orbital-project-1-5ux7.onrender.com/update-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
          const error = await response.json();
          console.log('error message from backend', error.detail)
          if(error.detail === "Username already exists.") {
            alert(error.detail)
          }
          else {
            alert('There was an error saving your data. Please try again.');
          }
          return;
        }
        
        const result = await response.json();
        console.log('✅ Data saved:', result);
        navigate('/home');

    } catch (error) {
      console.error('❌ Error saving data:', error);
      alert('There was an error saving your data. Please try again.');
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
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
              onKeyDown={handleKeyDown}
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
