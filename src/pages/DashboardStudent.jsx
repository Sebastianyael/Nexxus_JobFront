import { useState } from "react"; 
import { Aside } from "../components/Aside";
import Content from "../components/Content";
import { Button } from "../components/Button";
import StudentPostulaciones from "../components/StudentPostulaciones";
import StudentPanel from "../components/StudentPanel";
import styles from '../assets/dash_layout.module.css';

const PanelPrincipal = () => <div>Mi Perfil / Cuenta</div>;

export default function DashboardStudent({ children }) {
    // 1. Inicializamos el estado directamente desde localStorage
    const [activeTab, setActiveTab] = useState(localStorage.getItem('lastSection') || 'panelPrincipal');

    // 2. Función para cambiar de pestaña y guardar en el navegador
    const cambiarTab = (tabNombre) => {
        setActiveTab(tabNombre);
        localStorage.setItem('lastSection', tabNombre);
    };

    const components = {
        perfil: <PanelPrincipal />,
        postulaciones: <StudentPostulaciones />,
        panelPrincipal: <StudentPanel />
    };

    return (
        <main className={styles.main}>
            <Aside>
                <h2 style={{ color: 'var(--main-color)' }}>Nexxus Job</h2>
                <p className={styles.p}>Navegación</p>
                
                {/* 3. Usamos cambiarTab en lugar de setActiveTab directamente */}
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
            </Aside>

            <Content>
                {/* 4. Renderizamos basado en el estado persistente */}
                {components[activeTab]}
                {children}
            </Content>
        </main>
    );
}