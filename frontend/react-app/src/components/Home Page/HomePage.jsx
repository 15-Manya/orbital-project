import { useUser } from '../Questions/UserResponse';
import {useEffect,useState} from "react";
import styles from './HomePage.module.css';
import Navbar from '../Navbar/Navbar';
import logo from "../../assets/logo-dark.png";
import {Link} from "react-router";
import ai_icon from "../../assets/ai-icon.png"

function HomePage() {
    const {userData} = useUser();
    const username = userData.username;
    const [count,setCount] = useState(0)
    const [info, setInfo] = useState('')
    useEffect(() => {
    getBooks();
    },[]);


    async function getBooks(){
        try{
            const response = await fetch('http://localhost:8000/get_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userData.username
        })});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    // Parse the JSON response
    const responseData = await response.json();
    
    // Return the response data (could be something from the server like a success message or object)
    console.log('Successfully sent Post Request')
    console.log(responseData)
    console.log(userData.favBooks)
    setInfo(responseData)
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
}
    

    function addCount(){
        setCount(c => c+1)
    }
    return (
        <>
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
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Discover</a></li>
                                    <li><a href="#">Chatbot</a></li>
                                    <li><a href="#">Profile</a></li>
                                </ul>
                        </div>
                    </div>
                </nav>
                <div className={styles.home_page}>
                    <div className='container-sm'>
                        <h1 className={styles.heading}>Hello {username} 👋</h1>
                        <p className={styles.sub_heading}>Find your next favorite read — handpicked just for you.</p>
                        <div className={styles.chatbot}>
                            <img src={ai_icon} alt="ai-icon" className={styles.ai_icon}/>
                            <input type="text" placeholder='Tell me what you are looking for...'/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className={styles.recommendation}>
                            {(!userData?.favBooks || userData.favBooks.length < 2 || !info.set1 || !info.set2 || !info.set3)
                ? <p>Loading your recommendations...</p>
                : (
                    <>
                        <div className={styles.display_preference}>
                            <h2>Because you like {userData.favBooks[0]}: </h2>
                            <div className={styles.display}>
                                {info.set1.map(([title, img], index) => (
                                    <div key={index}>
                                        <img className={styles.preferences} src={img} alt={title} />
                                        <p>{title}</p>
                                    </div>
                                ))}
                            </div>
                        
                            <h2>Because you like {userData.favBooks[1]}: </h2>
                            <div className={styles.display}>
                                {info.set2.map(([title, img], index) => (
                                    <div key={index}>
                                        <img className={styles.preferences} src={img} alt={title} />
                                        <p>{title}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <h2>Because you like {userData.favBooks[2]}: </h2>
                            <div className={styles.display}>
                            {info.set3.map(([title, img], index) => (
                                <div key={index}>
                                    <img className={styles.preferences} src={img} alt={title} />
                                    <p>{title}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        </>
                )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

/*function HomePage(){
    const [count,setCount] = useState(0)
    const [info, setInfo] = useState('')
    const { userData, updateData } = useUser();
    useEffect(() => {
    getBooks();
    },[]);


    async function getBooks(){
        try{
            const response = await fetch('http://localhost:8000/get_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userData.username
        })});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    // Parse the JSON response
    const responseData = await response.json();
    
    // Return the response data (could be something from the server like a success message or object)
    console.log('Successfully sent Post Request')
    console.log(responseData)
    console.log(userData.favBooks)
    setInfo(responseData)
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
}
    

    function addCount(){
        setCount(c => c+1)
    }
    
    return (
        <>
            <br /><br />
            <p>Hello {userData.username}, how are you?</p>
            <br />
            <p>Here are some book recommendations customised just for you</p>
            <br /><br />
    
            {(!userData?.favBooks || userData.favBooks.length < 2 || !info.set1 || !info.set2 || !info.set3)
                ? <p>Loading your recommendations...</p>
                : (
                    <>
                        <div className={styles.preference1}>
                            <h2>Because you like {userData.favBooks[0]}: </h2>
                            {info.set1.map(([title, img], index) => (
                                <div key={index}>
                                    <p>{title}</p>
                                    <img className={styles.preferences} src={img} alt={title} />
                                </div>
                            ))}
                        </div>
    
                        <div className={styles.preference2}>
                            <h2>Because you like {userData.favBooks[1]}: </h2>
                            {info.set2.map(([title, img], index) => (
                                <div key={index}>
                                    <p>{title}</p>
                                    <img className={styles.preferences} src={img} alt={title} />
                                </div>
                            ))}
                        </div>
    
                        <div className={styles.preference3}>
                            <h2>Because you like {userData.favBooks[1]}: </h2>
                            {info.set3.map(([title, img], index) => (
                                <div key={index}>
                                    <p>{title}</p>
                                    <img className={styles.preferences} src={img} alt={title} />
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    );
}*/

export default HomePage
