import { useState } from "react"; 
import { Aside } from "../components/Aside"
import Content from "../components/Content"
import { Button } from "../components/Button"
import StudentPostulaciones from "../components/StudentPostulaciones";
import styles from '../assets/dash_layout.module.css'

import StudentPanel from "../components/StudentPanel";



const PanelPrincipal =  () => <div>PanelPrincipal</div>



export default function DashboardStudent({children}){
    const [activeTab , setActiveTab] = useState('panelPrincipal')
    
    const components = {
        perfil : <PanelPrincipal/>,
        postulaciones : <StudentPostulaciones/>,
        panelPrincipal : <StudentPanel/>
    }
    

    return (
        <main className={styles.main}>
            <Aside>
                <h2 style={{color: 'var(--main-color)'}}>Nexxus Job</h2>
                <p className={styles.p}>Navegacion</p>
                <Button onClick={() => setActiveTab('panelPrincipal')}  className={styles.button} text={"Panel General"} />
                <Button onClick={() => setActiveTab('postulaciones')} className={styles.button} text={"Postulaciones"} />
                <p className={styles.p}>Cuenta</p>
                <Button onClick={() => setActiveTab('perfil')} className={styles.button} text={"Mi cuenta"} />
            </Aside>

            <Content>
                {components[activeTab]}
                {children}
            </Content>
        </main>
    );
}   