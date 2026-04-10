import { useLocation } from "react-router-dom"
import { Aside } from "../components/Aside"
import { PublicarVacante } from "../components/PublicarVacante"
import Content from "../components/Content"
import EmpresaPerfil from '../components/EmpresaPerfil'




import { Button } from "../components/Button"
import styles from '../assets/dash_layout.module.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import Postulaciones from "../components/Postulaciones"




export default function EmpresaDashboard({children}){
    const [eliminando, setEliminando] = useState(false);

    const location = useLocation()
   
    const empresaId = location.state?.empresa?.empresaId;
    const [activeTab , setActiveTab] = useState(localStorage.getItem('lastSection') || 'publicarVacante' )
    const navigate = useNavigate()
    function goToLogin(){
        navigate('/' , {replace:true})
    }

    const cambiarTab = (tabNombre) => {
        setActiveTab(tabNombre)
        localStorage.setItem('lastSection', tabNombre)
    }

    const deleteCount = async (id) => {
      
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        
        if (!confirmar) return;

        setEliminando(true);
        
        try {
            const response = await api.delete(`/empresas/${id}`);
            
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
                 

                
                    <Button 
                            onClick={() => cambiarTab('publicarVacante')} 
                          
                            className={`${styles.button} ${activeTab === 'publicarVacante' ? styles.active : ''}`} 
                            text={"Publicar Vacantes"}
                        /> 

                        <Button 
                            onClick={() => cambiarTab('postulaciones')} 
                            className={`${styles.button} ${activeTab === 'postulaciones' ? styles.active : ''}`} 
                            text={"Postulaciones"}
                        /> 

                        <Button 
                            onClick={() => cambiarTab('perfil')} 
                            className={`${styles.button} ${activeTab === 'perfil' ? styles.active : ''}`} 
                            text={"Perfil"}
                        />

                <div style={{width: 'auto' , display:'flex', flexDirection:'column' , gap:'20px' , marginTop:'370px'}}>
                <Button onClick={() => goToLogin()} className={styles.eliminarButton} text={'Cerrar Sesion'}/>
                <Button onClick={() => deleteCount(empresaId)} className={styles.eliminarButton} text={eliminando ? 'Eliminando...' : 'Eliminar Cuenta'} disabled={eliminando} />
                </div>
                    
                </Aside>

                <Content>
                    {components[activeTab]}
                    {children}
                </Content>

            </main>
        </>
    )
}