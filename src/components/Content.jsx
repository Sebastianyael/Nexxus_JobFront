import styles from '../assets/content.module.css'

export default function Content({ children}){
    return (
        <>
            <div className={styles.content}>

                {children}
            </div>
        </>
    )
}
