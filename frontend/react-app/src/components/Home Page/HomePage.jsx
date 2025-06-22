import { useUser } from '../Questions/UserResponse';
import {useEffect,useState} from "react";


function HomePage(){
    const [count,setCount] = useState(0)
    const { userData, updateData } = useUser();
    useEffect(() => {
    getBooks();
    });


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
  } catch (error) {
    // If an error occurs, log it and return an error message
    console.error('Error occurred during the POST request:', error);
    return { error: error.message }; // Return error message for further handling
  }
}
    

    function addCount(){
        setCount(c => c+1)
    }
    
    return(
        <>
            <p>Hello {userData.username}, how are you?</p>
            <p> Count = {count}</p>
            <button onClick = {addCount}>Add</button>
        </>
        

    );
}

export default HomePage