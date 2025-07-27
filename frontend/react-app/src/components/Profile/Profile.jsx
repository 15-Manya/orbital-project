import styles from './Profile.module.css';
import profile_pic from '../../assets/profile_picture.png';
import arrow from '../../assets/arrow_icon.png'
import { useEffect, useState } from 'react';

function Profile() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser?.username || 'User';
    const email = storedUser?.email || '';
    const age = storedUser?.age || '';
    const readBooks = storedUser?.readBooks || [];
    const [description, setDescription] = useState('Loading user description...');
    useEffect(() => {
        async function getDescription() {
          try {
            const response = await fetch('https://orbital-project-1-5ux7.onrender.com/generate_description', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: username }),
            });
            console.log(username)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const responseData = await response.json();
            console.log('Successfully sent Post Request');
            console.log(responseData);
            setDescription(responseData.response);
          } catch (error) {
            console.error('Error occurred during the POST request:', error);
            return { error: error.message };
          }
        }
        getDescription();
      }, [username]);

    return (
        <>
            <div className={styles.body}>
                <nav className={styles.navbar}>
                    <div className='container'>
                        <a href="/home"><img className={styles.arrow} src={arrow} alt="arrow" /></a>
                        <p>Profile</p>
                    </div>
                </nav>
                <div className={styles.profile_picture}>
                    <div className={styles.color}></div>
                    <div className={styles.no_color}></div>
                    <img src={profile_pic} alt="profile_pic" />
                </div>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.description}>
                            <h3>About user</h3>
                            <p>{description}</p>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.card}>
                                <h3>Username</h3>
                                <p>{username}</p>
                            </div>
                            <div className={styles.card}>
                                <h3>Email address</h3>
                                <p>{email}</p>
                            </div>
                            <div className={styles.card}>
                                <h3>User age</h3>
                                <p>{age}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.read}>
                        <h3>Books read by the user</h3>
                        <div className={styles.display}>
                                {readBooks.map((title, index) => (
                                    <div key={index}>
                                        <p className={styles.title} title={title}>{index + 1}. {title}</p>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile
