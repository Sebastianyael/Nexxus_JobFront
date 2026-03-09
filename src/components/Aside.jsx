import styles from '../assets/aside.module.css'

export function Aside({ children}){

    return (
        <>
            <aside className={styles.aside}>

            {children}
            </aside>

        </>
    )
}