import styles from './PersonalizeLibrary.module.css'


function PersonalizeLibrary(){
    return(
        <>
            <div className={styles.body}>
                <div className={styles.flex}>

                    <div className={styles.txtbox}>
                        <div className={styles.txt1}>✨Ready to see your</div>
                        <div className={styles.txt1}>personalized library✨</div>

                        <div className={styles.line}>
                            <input className={styles.text} type='text' placeholder='What should we call you?'></input>

                            <button className={styles.btn}>Enter</button>

                        </div>

                
                    </div>
                    
                </div>
            </div>
        </>
        
    );
}
export default PersonalizeLibrary