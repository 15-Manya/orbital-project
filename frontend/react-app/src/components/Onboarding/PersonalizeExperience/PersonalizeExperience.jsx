import styles from './PersonalizeExperience.module.css'
import { useNavigate } from 'react-router';


function PersonalizeExperience() {
    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        if(e.key === 'Enter')
            navigate('/age')
    }

    return(
        <>
            <div className={styles.body} tabIndex={0} onKeyDown={e => handleKeyDown(e)}>
                <div className={styles.flex}>

                    <div className={styles.txtbox}>
                        <div className={styles.txt1}>✨Let's personalize your</div>
                        <div className={styles.txt1}>experience✨</div>

                        <div className={styles.txt2}>We'll ask a few questions to tailor your book</div>
                        <div className={styles.txt3}>recommendations</div>

                        <button className={styles.btn} onClick={() => navigate('/age')}>Let's go</button>
                    </div>           
                </div>
            </div>
        </>
        
    );
}
export default PersonalizeExperience