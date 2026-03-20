import styles from '../assets/dash_layout.module.css'
import { Button } from './Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function PublicarVacante() {
    const navigate = useNavigate();
    const [vacantes, setVacantes] = useState([]);
    const location = useLocation();
    const empresaId = location.state?.empresa?.empresaId || location.state?.empresaId;

    const obtenerVacantes = async () => {
        if (!empresaId) return;
        try {
            const response = await api.get(`/misVacantes/${empresaId}`);
            setVacantes(response.data.vacantes || []);
        } catch (error) {
            console.error("Error al obtener vacantes:", error);
        }
    };

    useEffect(() => {
        obtenerVacantes();
    }, [empresaId]);

 
    const irADetalles = (vacante) => {
        navigate('/detallesVacante', { state: { vacante } });
    };

    const eliminarVacante = async (id) => {
        if (!window.confirm("¿Estás seguro?")) return;
        try {
            await api.delete(`/vacantes/${id}`);
            setVacantes(vacantes.filter(v => v.id !== id));
            alert("Eliminada con éxito");
        } catch (error) {
            console.log(error)
            alert("Error al eliminar");
        }
    };

    return (
        <>
            <h1>Listado de vacantes y sus postulaciones</h1>
            <div className={styles.vacantes_publicadas}>
                {vacantes.map((vacante) => (
                    <div key={vacante.id} className={styles.vacanteEmpresa}>
                        <h3 style={{color: '#E87DD6'}}>{vacante.titulo}</h3>
                        <p><strong>Descripción:</strong> {vacante.descripcion}</p>
                        
                        <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                            <Button className={styles.editarButton} onClick={() => irADetalles(vacante)}>
                                Detalles / Editar
                            </Button>
                            <Button className={styles.eliminarButtonCrud} onClick={() => eliminarVacante(vacante.id)}>
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}