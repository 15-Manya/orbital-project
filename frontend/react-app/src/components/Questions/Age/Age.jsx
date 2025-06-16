import styles from './Age.module.css';
import { Link } from 'react-router';

function Age(){
    return(
        <>
            <div className={styles.body}>
                <div className={styles.flex}>

                    <div className={styles.txtbox}>
                        <div className={styles.txt1}>✨Please enter your age✨</div>

                        <div className={styles.line}>
                            <input className={styles.text} type='text' placeholder='What is your age?'></input>

                            <Link to="/q1"><button className={styles.btn}>Let's go</button></Link>

                        </div>

                
                    </div>
                    
                </div>
            </div>
        </>
        
    );
}
export default Age