import api from '../api/axios'
import styles from '../assets/dash_layout.module.css'
import { useEffect, useState } from "react";
import { Button } from './Button';
export default function StudentPerfil({children}){
    const [vacantes, setVacantes] = useState([]);
    const [cargando, setCargando] = useState(true);

   
    useEffect(() => {
        const obtenerVacantes = async () => {
            try {
                const response = await api.get('/vacantes'); 
                const listaDeVacantes = response.data.vacantes;
                
                setVacantes(listaDeVacantes || []);
            } catch (error) {
                console.error("Error al obtener vacantes:", error);
            } finally {
                setCargando(false); 
            }
        };
    
        obtenerVacantes();
    }, []);

    return (
        <>
             <h1>¡Bienvenido de Nuevo!</h1>
                <br /><br />
                <p>Filtrar Oportunidades</p>
                <br />
                <div className={styles.containerFiltro}>
                    <Button text='Todos' className={styles.button_secondary} />
                    <Button text='TIC' className={styles.button_secondary} />
                    
                </div>
                <br /><br />
                <h3>Vacantes para ti</h3>
                <br />
                <div className={styles.vacantes_container}>

                {vacantes.map((vacante) => (
                    <div key={vacante.id} className={styles.vacante}>
                        
                        <h3 style={{color: '#E87DD6'}}>{vacante.titulo}</h3>

                        <p style={{fontSize: '14px'}}>
                            {vacante.empresa.nombre}
                        </p>

                        <p >Descripcion</p>
                        <p style={{fontSize: '14px'}}>
                            {vacante.descripcion}
                        </p>
                        
                        <p >Requsitos</p>
                        <p style={{fontSize: '14px'}}>
                            {vacante.requisitos}
                        </p>
              
                        <Button text='Postularse' className={styles.button_secondary}></Button>
                    </div>
                ))}

                </div>
            {children}
        </>
    )
}

