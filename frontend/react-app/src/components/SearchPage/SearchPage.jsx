import styles from './SearchPage.module.css'
import logo from "../../assets/logo-dark.png";
import { useState } from 'react';
function SearchPage(){
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser?.username || 'User';
    const [searchBooks,setSearchBooks] = useState([]);
    const [bookname,setBookName] = useState('');
    const [inputValue, setInputValue] = useState('');

    async function handleSearch(e){
        //e.preventDefault();
        const book_searched = inputValue
        console.log(book_searched)
        setBookName(book_searched)

        try{
            const response = await fetch('http://localhost:8000/search_data', {
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
    console.log(searchBooks)
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
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
                            <li><a href="#">Profile</a></li>
                        </ul>
                     </div>
                </div>
            </nav>
            <div className="container">
                <div className={styles.discover}>
                <h1 className={styles.heading}>Start exploring 📚</h1>
                <input type="text" placeholder="What would you like to search for today?" value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleSearch(e)}></input>
                    <div>
                    <div className={styles.display_preference}>
                        <h2>Here are some books related to {bookname} </h2>
                        <div className={styles.display}>
                            {searchBooks.map(([title, img, desc], index) => (
                                <div key={index}>
                                    <div className={styles.bookCard}>
                                        <img className={styles.preferences} src={img} alt={title} />
                                            <p className={styles.description}>{desc}</p>
                                    </div>
                                    <p className={styles.title} title={title}>{title}</p>
                                </div>
                            ))}
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default SearchPage;