import { useLocation } from "react-router-dom"
import { Aside } from "../components/Aside"
import { PublicarVacante } from "../components/PublicarVacante"
import Content from "../components/Content"
import EmpresaPerfil from "../components/empresaPerfil"

import { Button } from "../components/Button"
import styles from '../assets/dash_layout.module.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Postulaciones from "../components/Postulaciones"




export default function EmpresaDashboard({children}){
    const location = useLocation()
    const info = location.state?.empresa 
    console.log("Informacion de la empresa" , info)
    const [activeTab , setActiveTab] = useState(localStorage.getItem('lastSection') || 'publicarVacante' )
    const navigate = useNavigate()

    const cambiarTab = (tabNombre) => {
        setActiveTab(tabNombre)
        localStorage.setItem('lastSection', tabNombre)
    }

    const components = {
        publicarVacante : <PublicarVacante/>,
        perfil : <EmpresaPerfil/>,

        postulaciones : <Postulaciones/>
    }
    return(
        <>
            <main className={styles.main} >
                <Aside>
                    <h2 style={{ color: 'var(--main-color)' }}>Nexxus Job </h2>
                    <p className={styles.p}>Navegación</p>

                
                    <Button 
                    onClick={() => cambiarTab('publicarVacante')} 
                    className={`${styles.button} ${activeTab === 'publicarVacante' ? styles.active : ''}`} 
                    text={"Publicar Vacantes"}/> 

                    <Button 
                    onClick={() => cambiarTab('postulaciones')} 
                    className={`${styles.button} ${activeTab === 'postulaciones' ? styles.active : ''}`} 
                    text={"Postulaciones"}/> 

     


                    <p className={styles.p}>Cuenta</p>
                    <Button 
                    onClick={() => cambiarTab('perfil')} 
                    className={`${styles.button} ${activeTab === 'perfil' ? styles.active : ''}`} 
                    text={"Perfil"}/> 
                    
                </Aside>

                <Content>
                    {components[activeTab]}
                    {children}
                </Content>

            </main>
        </>
    )
}