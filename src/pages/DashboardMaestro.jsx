import { useLocation } from "react-router-dom"
import { Aside } from "../components/Aside"
import styles from '../assets/dash_layout.module.css';
import Content from "../components/Content";
import AlumnoSearch from "../components/AlumnoSearch";
import ProfesorCuenta from "../components/ProfesorCuenta";
import {Button} from '../components/Button'
import { useState } from "react";

export default function  DashboardMestro(){
    const location = useLocation()
    const maestroInfo = location.state?.maestro
    const [activeTab, setActiveTab] = useState(localStorage.getItem('lastSection') || 'panelPrincipal');
    const components = {
        perfil : <ProfesorCuenta/>,
        search : <AlumnoSearch/>

    }

    const cambiarTab = (tabNombre) => {
        setActiveTab(tabNombre);
        localStorage.setItem('lastSection', tabNombre);
    };

    return(
        <>
            <main className={styles.main}>
                <Aside>
                <h2 style={{ color: 'var(--main-color)' }}>Nexxus Job </h2>
                <p className={styles.p}>Navegación</p>
                
                <Button 
                    onClick={() => cambiarTab('search')} 
                    className={`${styles.button} ${activeTab === 'search' ? styles.active : ''}`} 
                    text={"Asignar Insignia"} 
                />

                <Button 
                    onClick={() => cambiarTab('perfil')} 
                    className={`${styles.button} ${activeTab === 'perfil' ? styles.active : ''}`} 
                    text={"Mis Datos"} 
                />

                </Aside>

                <Content>
                    {components[activeTab]}
                </Content>
            </main>
        </>
    )
}