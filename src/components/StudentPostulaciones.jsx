import api from '../api/axios'
import styles from '../assets/dash_layout.module.css'
import { useEffect, useState } from "react";
import { Button } from './Button';
import { useLocation } from 'react-router-dom';

export default function StudentPostulaciones() {
    const [vacantes, setVacantes] = useState([]);
    const [filtro, setFiltro] = useState('pendientes'); 
    const location = useLocation();
    const alumnoId = location.state?.user?.alumnoId;

  
    const eliminarPostulacion = async (postulacionId) => {
        if (!window.confirm("¿Estás seguro de que deseas cancelar esta postulación?")) return;
        
        try {
            const response = await api.delete(`/postulaciones/${postulacionId}`)
            if (response.status === 200) {
                alert("Postulación cancelada con éxito");
             
                setVacantes(prev => prev.filter(v => v.id !== postulacionId));
            }
        } catch (error) {
            console.error("Error al eliminar la postulación", error);
            alert("No se pudo cancelar la postulación.");
        }
    }

    useEffect(() => {
        const obtenerVacantes = async () => {
            if (!alumnoId) return;
            try {
                let endpoint = `/mispostulaciones/${alumnoId}`; 
                
                if (filtro === 'aceptadas') {
                    endpoint = `/mispostulaciones/aceptadas/${alumnoId}`;
                } else if (filtro === 'rechazadas') {
                    endpoint = `/mispostulaciones/rechazadas/${alumnoId}`;
                }

                const response = await api.get(endpoint);
                setVacantes(response.data || []);
            } catch (error) {
                console.error("Error al obtener las postulaciones", error);
                setVacantes([]);
            }
        };
        obtenerVacantes();
    }, [alumnoId, filtro]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Mis Postulaciones</h1>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', color: 'gray' }}>Estado:</label>
                    <select 
                        value={filtro} 
                        onChange={(e) => setFiltro(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#1a1a1a',
                            color: '#00cfcf', 
                            border: '1px solid #333',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="pendientes">Pendientes</option>
                        <option value="aceptadas">Aceptadas</option>
                        <option value="rechazadas">Rechazadas</option>
                    </select>
                </div>
            </div>

            <br />

            <div className={styles.postulaciones_container}>
                {vacantes.length > 0 ? (
                    vacantes.map((item) => (
                        <div key={item.id} className={styles.postulacion}>
                            <h3 style={{ color: "#B152E0" }}>{item.vacante.titulo}</h3>

                            <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#ccc' }}>
                                <p><strong>Empresa:</strong> {item.vacante.empresa.nombre} </p>
                                <p><strong>Tel:</strong> {item.vacante.empresa.telefono}</p>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <h4 style={{ fontSize: '14px' }}>Descripción</h4>
                                <p style={{ fontSize: '13px' }}>{item.vacante.descripcion}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', padding: '10px 0', fontSize: '13px', color: '#00cfcf' }}>
                                <span>{item.vacante.modalidad}</span>
                                <span>{item.vacante.tiempo}</span>
                                <span>{item.vacante.genero}</span>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                borderTop: '1px solid #333', 
                                paddingTop: '10px' 
                            }}>
                                <p style={{ fontSize: '13px', color: 'gray' }}>
                                    Estatus: <span style={{ color: filtro === 'aceptadas' ? '#00ff00' : filtro === 'rechazadas' ? '#ff4d4d' : '#ffa500' }}>
                                        {item.estatus || filtro}
                                    </span>
                                </p>

                                
                                {filtro === 'pendientes' && (
                                    <Button 
                                        className={styles.button} 
                                        onClick={() => eliminarPostulacion(item.id)}
                                        style={{ backgroundColor: '#ff4d4d', color: 'white' }}
                                    >
                                        Cancelar Postulación
                                    </Button>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '11px', marginTop: '10px' }}>
                                <p>Aplicado el: {new Date(item.created_at).toLocaleDateString()}</p>
                                <p>Expira: {new Date(item.vacante.fecha_de_expiracion).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'gray', textAlign: 'center' }}>No tienes postulaciones en estado: {filtro}.</p>
                )}
            </div>
        </>
    );
}