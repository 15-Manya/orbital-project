import styles from './Chat.module.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import logo from "../../assets/logo.png";

function Chat() {
        const [userInput, setUserInput] = useState('');
        const [chatHistory, setChatHistory] = useState([]);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const username = storedUser?.username || 'User';

        const handleSubmit = async () => {
            if(!userInput.trim())
                return;
            const userMessage = { sender: 'user', text: userInput}
            setUserInput('');
            setChatHistory((prev => [...prev, userMessage]))

            try {
                const response = await fetch(`http://localhost:8000/chat?username=${username}&user_input=${encodeURIComponent(userInput)}`, {
                method: 'POST',
                }
                );

                const data = await response.json();
                const bot_response = {sender: 'bot', text: data.response};

                setChatHistory(prev => [...prev, bot_response]);
            }catch(e) {
                setChatHistory(prev => [prev, 
                    {sender: 'bot', text: 'Error getting response. Please try again later.'}
                ]);
            }
            setUserInput('');
        }
    
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
        };

        return (
            <div className={styles.body}>
                <nav className={styles.navbar}>
                    <div className={`container ${styles.flexContainer}`}>
                        <div className={styles.logo}>
                            <a href="/home">
                            <img src={logo} alt="logo" />
                            </a>
                        </div>
                        <div className={styles.main_menu}>
                            <ul>
                                <li><a href="/home">Home</a></li>
                                <li><a href="#">Discover</a></li>
                                <li><a href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                 </nav>
                 <div className={styles.chat}>
                    <div className="container">
                        <div className={styles.chat_box}>
                        {chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                            >
                                <p>{msg.sender === 'user' ? username : 'Bot'}</p>
                                {msg.text}
                            </div>
                            ))} 
                        </div>
                    </div>
                    <div className={styles.input_box}>
                        <input type="text" placeholder='Ask me anything' value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown}/>
                        <button className={`btn ${styles.btn_light}`} onClick={handleSubmit}>Enter</button>
                    </div>
                 </div>
            </div>
        );
}

export default Chat;