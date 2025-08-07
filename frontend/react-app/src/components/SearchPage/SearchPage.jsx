import styles from './SearchPage.module.css'
import logo from "../../assets/logo-dark.png";
import { useState } from 'react';
import bookmark from '../../assets/bookmark.png';
import bookmark_marked from '../../assets/bookmark-marked.png';

function SearchPage(){
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser?.username || 'User';
    const [read, setRead] = useState(storedUser?.readBooks || []);
    const [searchBooks,setSearchBooks] = useState([]);
    const [bookname,setBookName] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [loading, setLoading] = useState(false);

    //console.log(read.includes(selectedBook[0]) ? 'Marked as read' : 'Mark as read')
    //console.log(selectedBook[0])

    async function handleSearch(e){
        if(e.key === 'Enter') {
            e.preventDefault();
            const book_searched = inputValue
            console.log(book_searched)
            setBookName(book_searched)
            setLoading(true); // Start loading
    
            try{
                const response = await fetch('https://orbital-project-8fn9.onrender.com/search_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  book: book_searched
            })});
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
        const responseData = await response.json();
        console.log(responseData)
        console.log('Successfully sent Post Request')
        // console.log(responseData)
        // console.log(responseData)
        const recommendations = responseData.recommendations
        //console.log(recommendations)
        setSearchBooks(recommendations)
      } catch (error) {
        // If an error occurs, log it and return an error message
        console.error('Error occurred during the POST request:', error);
        return { error: error.message }; // Return error message for further handling
      } finally {
        setLoading(false); // End loading
    }}}

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
        const response = await fetch('https://orbital-project-8fn9.onrender.com/update-user', {
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

const handleClick = (book) => {
    setSelectedBook(book);
}

const handleClose = () => {
    setSelectedBook('');
}
    return(

        <div className = {styles.body}>
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
                           <li><a href="/chat">Chatbot</a></li>
                            <li><a href="/profile">Profile</a></li>
                        </ul>
                     </div>
                </div>
            </nav>
            <div className="container">
                <div className={styles.discover}>
                <h1 className={styles.heading}>Start exploring 📚</h1>
                <input type="text" placeholder="What would you like to search for today?" value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleSearch}></input>
                    <div>
                    <div className={styles.display_preference}>
                        <h2></h2>
                        {loading ? (
                        <p className={styles.loading}>Loading your books...</p>
                    ) : (
                        <div className={styles.display}>
                            {searchBooks.map(([title, img, desc], index) => (
                                <div key={index}>
                                    <div className={styles.bookCard} onClick={() => handleClick([title, img, desc])}>
                                        <img className={styles.preferences} src={img} alt={title} />
                                            <p className={styles.description}>{desc}</p>
                                    </div>
                                    <p className={styles.title} title={title}>{title}</p>
                                </div>
                            ))}
                        </div> 
                        )}
                        </div>
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
    
    );
}

export default SearchPage;