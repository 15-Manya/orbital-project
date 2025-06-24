import { useUser } from '../Questions/UserResponse';
import {useEffect,useState} from "react";
import styles from './HomePage.module.css';


function HomePage(){
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
    
    return(
        <>
            <br></br><br></br>
            <p>Hello {userData.username}, how are you?</p>
            <br></br>
            <p> Here are some book recommendations customised just for you</p>
            <br></br>
            <br></br>

            <div className = {styles.preference1}>

                <h2>Because you like {userData.favBooks[0]}: </h2>
                <p>{info.set1[0][0]}</p>
                <img className = {styles.preferences} src = {info.set1[0][1]}></img>

                <p>{info.set1[1][0]}</p>
                <img className = {styles.preferences} src = {info.set1[1][1]}></img>

                <p>{info.set1[2][0]}</p>
                <img className = {styles.preferences} src = {info.set1[2][1]}></img>

                <p>{info.set1[3][0]}</p>
                <img className = {styles.preferences} src = {info.set1[3][1]}></img>

                <p>{info.set1[4][0]}</p>
                <img className = {styles.preferences} src = {info.set1[4][1]}></img>

            </div>

            <div className = {styles.preference2}>

                <h2>Because you like {userData.favBooks[1]}: </h2>
                <p>{info.set2[0][0]}</p>
                <img className = {styles.preferences} src = {info.set2[0][1]}></img>

                <p>{info.set2[1][0]}</p>
                <img className = {styles.preferences} src = {info.set2[1][1]}></img>

                <p>{info.set2[2][0]}</p>
                <img className = {styles.preferences} src = {info.set2[2][1]}></img>

                <p>{info.set2[3][0]}</p>
                <img className = {styles.preferences} src = {info.set2[3][1]}></img>

                <p>{info.set2[4][0]}</p>
                <img className = {styles.preferences} src = {info.set2[4][1]}></img>

            </div>

            <div className = {styles.preference3}>

                <h2>Because you like {userData.favBooks[1]}: </h2>
                <p>{info.set3[0][0]}</p>
                <img className = {styles.preferences} src = {info.set3[0][1]}></img>

                <p>{info.set3[1][0]}</p>
                <img className = {styles.preferences} src = {info.set3[1][1]}></img>

                <p>{info.set3[2][0]}</p>
                <img className = {styles.preferences} src = {info.set3[2][1]}></img>

                <p>{info.set3[3][0]}</p>
                <img className = {styles.preferences} src = {info.set3[3][1]}></img>

                <p>{info.set3[4][0]}</p>
                <img className = {styles.preferences} src = {info.set3[4][1]}></img>

            </div>
            
        </>
        

    );
}

export default HomePage