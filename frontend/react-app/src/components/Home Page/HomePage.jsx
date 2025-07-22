import {useEffect,useState} from "react";
import styles from './HomePage.module.css';
import logo from "../../assets/logo-dark.png";
import ai_icon from "../../assets/ai-icon.png"
import { useNavigate} from 'react-router';
import bookmark from '../../assets/bookmark.png';
import bookmark_marked from '../../assets/bookmark-marked.png';

function HomePage() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser?.username || 'User';
    const [info, setInfo] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [read, setRead] = useState(storedUser?.readBooks || []);
    const navigate = useNavigate();
    useEffect(() => {
    getBooks();
    },[]);

    console.log(read.includes(selectedBook[0]) ? 'Marked as read' : 'Mark as read')
    console.log(selectedBook[0])

    async function getBooks(){
        try{
            const response = await fetch('https://orbital-project-1-5ux7.onrender.com/get_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username
        })});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    // Parse the JSON response
    const responseData = await response.json();
    
    // Return the response data (could be something from the server like a success message or object)
    console.log('Successfully sent Post Request')
    console.log(responseData)
    setInfo(responseData)
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
}

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/chat')
    }
};

const handleClick = (book) => {
    setSelectedBook(book);
}

const handleClose = () => {
    setSelectedBook('');
}

const handleMark = async() => {
    const title = selectedBook[0];
    let updatedRead;

    //to add or remove the books
    if(read.includes(title)) 
        updatedRead = read.filter(book => book !== title)
    else
        updatedRead = [...read, title]

    //to update the useState
    setRead(updatedRead);

    //to update the local storage
    storedUser.readBooks = updatedRead;
    localStorage.setItem('user', JSON.stringify(storedUser));

    //update the read books in the backend
    try {
        const response = await fetch('https://orbital-project-1-5ux7.onrender.com/update-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storedUser),
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('Error updating user:', error.detail || 'Unknown error');
          } else {
            console.log('ReadBooks updated in backend');
          }
        } catch (error) {
          console.error('Network or fetch error:', error);
        }
      };

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
                                    <li><a href="/search">Discover</a></li>
                                    <li><a href="/chat">Chatbot</a></li>
                                    <li><a href="/profile">Profile</a></li>
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
                            <input type="text" placeholder='Tell me what you are looking for...' onKeyDown={handleKeyDown}/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className={styles.recommendation}>
                            {(!storedUser?.favBooks || storedUser.favBooks.length < 2 || !info.set1 || !info.set2 || !info.set3)
                ? <p>Loading your recommendations...</p>
                : (
                    <>
                        <div className={styles.display_preference}>
                            <h2>Recommended for you -</h2>
                            <div className = {styles.display}>
                                {info.general.map(([title, img, desc], index) => (
                                    <div key={index}>
                                        <div className={styles.bookCard} onClick={() => handleClick([title, img, desc])}>
                                            <img className={styles.preferences} src={img} alt={title} />
                                            <p className={styles.description}>{desc}</p>
                                        </div>
                                        <p className={styles.title} title={title}>{title}</p>
                                    </div>
                                ))}
                            </div>


                            <h2>Because you like {storedUser.favBooks[0]} - </h2>
                            <div className={styles.display}>
                                {info.set1.map(([title, img, desc], index) => (
                                    <div key={index}>
                                        <div className={styles.bookCard} onClick={() => handleClick([title, img, desc])}>
                                            <img className={styles.preferences} src={img} alt={title} />
                                            <p className={styles.description}>{desc}</p>
                                        </div>
                                        <p className={styles.title} title={title}>{title}</p>
                                    </div>
                                ))}
                            </div>
                        
                            <h2>Because you like {storedUser.favBooks[1]} - </h2>
                            <div className={styles.display}>
                                {info.set2.map(([title, img, desc], index) => (
                                    <div key={index}>
                                        <div className={styles.bookCard} onClick={() => handleClick([title, img, desc])}>
                                            <img className={styles.preferences} src={img} alt={title} />
                                            <p className={styles.description}>{desc}</p>
                                        </div>
                                        <p className={styles.title} title={title}>{title}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <h2>Because you like {storedUser.favBooks[2]} - </h2>
                            <div className={styles.display}>
                            {info.set3.map(([title, img, desc], index) => (
                                <div key={index}>
                                    <div className={styles.bookCard} onClick={() => handleClick([title, img, desc])}>
                                        <img className={styles.preferences} src={img} alt={title} />
                                        <p className={styles.description}>{desc}</p>
                                    </div>
                                    <p className={styles.title} title={title}>{title}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        </>
                )}
                        </div>
                            {selectedBook && (
                                <>
                                <div className={styles.popup}>
                                    <div className={styles.card}>
                                            <button className={styles.close} onClick={() => handleClose()}> ✕ </button>
                                        <h3>{selectedBook[0]}</h3>
                                        <div className={styles.content}>
                                            <img src={selectedBook[1]} alt="book image" />
                                            <p>{selectedBook[2]}</p>
                                        </div>
                                        <div className={styles.read} onClick={handleMark}>
                                            <img className={styles.bookmark} src = {read.includes(selectedBook[0]) ? bookmark_marked : bookmark} alt="bookmark"/>
                                            <p>{read.includes(selectedBook[0]) ? 'Marked as read' : 'Mark as read'}</p>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default HomePage
