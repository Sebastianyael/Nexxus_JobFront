import { useState } from "react"; 
import { Aside } from "../components/Aside";
import Content from "../components/Content";
import { Button } from "../components/Button";
import StudentPostulaciones from "../components/StudentPostulaciones";
import StudentPanel from "../components/StudentPanel";
import styles from '../assets/dash_layout.module.css';
import StudenCuenta from "../components/StudentCuenta";
import {  useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLocation } from "react-router-dom";

export default function DashboardStudent({ children }) {
    const [activeTab, setActiveTab] = useState(localStorage.getItem('lastSection') || 'panelPrincipal');
    const navigate = useNavigate();

    const location = useLocation();

    const userId = location.state?.user?.usuarioId; 



    const [eliminando, setEliminando] = useState(false);

    const deleteCount = async (id) => {
      
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        
        if (!confirmar) return;

        setEliminando(true);
        
        try {
            const response = await api.delete(`/usuarios/alumnos/${id}`);
            
            if (response.status === 200 || response.status === 204) {
                alert("Cuenta eliminada correctamente.");
                
                
                localStorage.removeItem('token'); 
                
              
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.error('Hubo un error al eliminar la cuenta', error);
            alert("No se pudo eliminar la cuenta. Inténtalo de nuevo.");
        } finally {
            setEliminando(false);
        }
    };

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
                <h2 style={{ color: 'var(--main-color)' }}>Nexxus Job </h2>
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
                <Button onClick={() => deleteCount(userId)} className={styles.eliminarButton} text={eliminando ? 'Eliminando...' : 'Eliminar Cuenta'} disabled={eliminando} />
                </div>

            </Aside>

            <Content>
                {components[activeTab]}
                {children}
            </Content>
        </main>
    );
}