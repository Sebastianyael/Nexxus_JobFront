import { useLocation } from "react-router-dom"
import { Aside } from "../components/Aside"
import styles from '../assets/dash_layout.module.css';
import Content from "../components/Content";
import AlumnoSearch from "../components/AlumnoSearch";
import ProfesorCuenta from "../components/ProfesorCuenta";
import {Button} from '../components/Button'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
export default function  DashboardMestro(){
    const location = useLocation()
    const navigate = useNavigate()
    const maestroInfo = location.state?.maestro
    const [activeTab, setActiveTab] = useState(localStorage.getItem('lastSection') || 'panelPrincipal');
    const components = {
        perfil : <ProfesorCuenta/>,
        search : <AlumnoSearch/>

    }
    function goToLogin(){
        navigate('/' , {replace:true})
    }

    const [eliminando, setEliminando] = useState(false);

    const deleteCount = async (id) => {
      
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        
        if (!confirmar) return;

        setEliminando(true);
        
        try {
            const response = await api.delete(`/usuarios/instructores/${id}`);
            
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
                 <div style={{width: 'auto' , display:'flex', flexDirection:'column' , gap:'20px' , marginTop:'470px'}}>
                <Button onClick={() => goToLogin()} className={styles.eliminarButton} text={'Cerrar Sesion'}/>
                <Button onClick={() => deleteCount(maestroInfo.usuarioId)} className={styles.eliminarButton} text={eliminando ? 'Eliminando...' : 'Eliminar Cuenta'} disabled={eliminando} />
                </div>

                </Aside>

                <Content>
                    {components[activeTab]}
                </Content>
            </main>
        </>
    )
}