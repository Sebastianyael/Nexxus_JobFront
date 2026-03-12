import { useState } from "react"; 
import { Aside } from "../components/Aside";
import Content from "../components/Content";
import { Button } from "../components/Button";
import StudentPostulaciones from "../components/StudentPostulaciones";
import StudentPanel from "../components/StudentPanel";
import styles from '../assets/dash_layout.module.css';
import StudenCuenta from "../components/StudentCuenta";
import {  useNavigate } from "react-router-dom";


export default function DashboardStudent({ children }) {
    const [activeTab, setActiveTab] = useState(localStorage.getItem('lastSection') || 'panelPrincipal');
    const navigate = useNavigate();

    function goToLogin(){
        navigate('/' , {replace:true})
    }

    
    const cambiarTab = (tabNombre) => {
        setActiveTab(tabNombre);
        localStorage.setItem('lastSection', tabNombre);
    };

    const components = {
        perfil: <StudenCuenta/>,
        postulaciones: <StudentPostulaciones />,
        panelPrincipal: <StudentPanel />
    };

    return (
        <main className={styles.main}>
            <Aside>
                <h2 style={{ color: 'var(--main-color)' }}>Nexxus Job</h2>
                <p className={styles.p}>Navegación</p>
                
                <Button 
                    onClick={() => cambiarTab('panelPrincipal')} 
                    className={`${styles.button} ${activeTab === 'panelPrincipal' ? styles.active : ''}`} 
                    text={"Panel General"} 
                />
                <Button 
                    onClick={() => cambiarTab('postulaciones')} 
                    className={`${styles.button} ${activeTab === 'postulaciones' ? styles.active : ''}`} 
                    text={"Postulaciones"} 
                />
                
                <p className={styles.p}>Cuenta</p>
                <Button 
                    onClick={() => cambiarTab('perfil')} 
                    className={`${styles.button} ${activeTab === 'perfil' ? styles.active : ''}`} 
                    text={"Mi cuenta"} 
                />

                <div style={{width: 'auto' , display:'flex', flexDirection:'column' , gap:'20px' , marginTop:'370px'}}>
                <Button onClick={() => goToLogin()} className={styles.eliminarButton} text={'Cerrar Sesion'}/>
                <Button className={styles.eliminarButton} text={'Eliminar Cuenta'}/>
                </div>

            </Aside>

            <Content>
                {components[activeTab]}
                {children}
            </Content>
        </main>
    );
}