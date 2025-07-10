import styles from './SearchPage.module.css'
import { useState } from 'react';
function SearchPage(){
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser?.username || 'User';
    const [searchBooks,setSearchBooks] = useState('')
    const [bookname,setBookName] = useState('')

    async function handleSearch(e){
        e.preventDefault();
        const book_searched = e.target[0].value
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
    
    console.log('Successfully sent Post Request')
    // console.log(responseData)
    // console.log(responseData)
    setSearchBooks(responseData.recommendations)
    console.log(searchBooks)
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
}
    return(

        <div className = {styles.body}>
            <p>Hello {username}, wanna search some books? Let's go!</p>
            <br></br>
            <form onSubmit = {(e) => handleSearch(e)}>
                <input type="text" placeholder="What would you like to search for today?"></input>
                <input type="submit" value="Search"></input>
            </form>
            <br></br>
            
            <div>
                <h2>Here are some books related to {bookname}</h2>

                <div className={styles.display_preference}>
                    {searchBooks.map(([title, img], index) => (
                        <div key={index} className = {styles.display}>
                            <img className = {styles.preferences} src={img} alt={title} />
                            <p>{title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    
    );
}

export default SearchPage;