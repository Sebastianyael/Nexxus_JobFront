import api from '../api/axios'
import styles from '../assets/dash_layout.module.css'
import { useEffect, useState } from "react";
import { Button } from './Button';
import { useLocation } from 'react-router-dom';

export default function StudentPostulaciones() {
    const [vacantes, setVacantes] = useState([]);
    const location = useLocation();
    const alumnoId = location.state?.user?.alumnoId;

    useEffect(() => {
        const obtenerVacantes = async () => {
            if (!alumnoId) return;
            try {
                const response = await api.get(`/mispostulaciones/${alumnoId}`);
                setVacantes(response.data || []);
            } catch (error) {
                console.error("Error al obtener las postulaciones", error);
            }
        };
        obtenerVacantes();
    }, [alumnoId]);

    return (
        <>
            <h1>Mis Postulaciones</h1>
            <br />
            <div className={styles.postulaciones_container}>
                {vacantes.length > 0 ? (
                    vacantes.map((item) => (
                        <div className={styles.postulacion}>
                            <h3 style={{color : "#B152E0"}}>{item.vacante.titulo}</h3>
                                                           
                           <div style={{display : 'flex' , gap: '20px' , fontSize : '12px'}}>
                            <p>{item.vacante.empresa.nombre} </p>
                            <p>{item.vacante.empresa.telefono}</p>
                            <p>{item.vacante.empresa.email}</p>
                            <p>{item.vacante.empresa.calle}</p>
                           </div>

                           <div style={{display : 'flex' , gap: '10px'}}>
                            <h4 >Requisitos</h4>
                            <p>{item.vacante.requisitos}</p>
                           </div>

                           <div style={{display : 'flex' , gap: '10px'}}>
                            <h4 >Descripcion</h4>
                            <p>{item.vacante.descripcion}</p>
                           </div>

                           
                           <div style={{display : 'flex' , alignItems: 'center' , justifyContent: 'space-around' , color: 'gray'}}>
                            <p style={{fontSize: '13px'}}>{item.estatus}</p>
                            <Button className={styles.button}>Cancelar Postulacione</Button>
                           </div>

                           <div style={{display : 'flex' , justifyContent: 'space-around' , color: 'gray'}}>
                            <p>Aplicaste : {new Date(item.created_at).toLocaleDateString()}</p>
                            <p>F.Expiracion : {new Date(item.vacante.fecha_de_expiracion).toLocaleDateString()}</p>
                           </div>
                        </div>
                    ))
                ) : (
                    <p>Aún no te has postulado a ninguna vacante.</p>
                )}
            </div>
        </>
    );
}