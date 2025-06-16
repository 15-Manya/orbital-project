import styles from './PersonalizeExperience.module.css'
import { Link } from 'react-router';


function PersonalizeExperience(){
    return(
        <>
            <div className={styles.body}>
                <div className={styles.flex}>

                    <div className={styles.txtbox}>
                        <div className={styles.txt1}>✨Let's personalize your</div>
                        <div className={styles.txt1}>experience✨</div>

                        <div className={styles.txt2}>We'll ask a few questions to tailor your book</div>
                        <div className={styles.txt3}>recommendations</div>

                        <Link to="/age"><button className={styles.btn}>Let's go</button></Link>

                
                    </div>
                    
                </div>
            </div>
        </>
        
    );
}
export default PersonalizeExperience