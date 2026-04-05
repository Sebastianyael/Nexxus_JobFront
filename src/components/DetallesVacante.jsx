import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

import { Input } from './Input';
import styles from '../assets/dash_layout.module.css'

export default function DetallesVacante() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const vacanteOriginal = location.state?.vacante;

    const [datos, setDatos] = useState(vacanteOriginal || {});
    const [enviando, setEnviando] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
   
    const [filtroEstatus, setFiltroEstatus] = useState('pendiente');

    useEffect(() => {
        const cargarPostulantes = async () => {
            if (datos.id) {
                try {
                    const response = await api.get(`/postulados/${datos.id}`);
                    setPostulantes(response.data);
                } catch (error) {
                    console.error("Error al obtener los postulantes:", error);
                }
            }
        };
        cargarPostulantes();
    }, [datos.id]);

    if (!vacanteOriginal) {
        return <div style={{padding: '20px'}}>No se seleccionó ninguna vacante.</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        try {
            await api.put(`/vacantes/${datos.id}`, datos);
            alert("Vacante actualizada con éxito");
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar");
        } finally {
            setEnviando(false);
        }
    };

    const handleDownload = (path) => {
        const url = `${api.defaults.baseURL.replace('/api', '')}/storage/${path}`;
        window.open(url, '_blank');
    };

    const formGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '10px'
    };

    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        fontSize: '14px',
        width: '100%'
    };

    const labelStyle = {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    return (
        <>
            <button
                style={{padding : '1rem' , backgroundColor : 'transparent' , color:'var(--main-color)' , border : 'none' , cursor : 'pointer'}}
                onClick={() => navigate(-1)}
            >Volver al Dashboard</button>
            <div style={{ padding: '20px' , fontFamily: 'Arial' , display:'flex' , justifyContent:'center' , gap:'29px' }}>
                
                <div style={{ 
                    width: '650px', 
                    backgroundColor: 'rgba(57, 57, 57, 0.3)', 
                    padding: '2rem', 
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(50, 50, 50, 0.3)'
                }}>
                    <h1 style={{ color: 'white', marginBottom: '15px' }}>Editar Vacante</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Título</label>
                            <Input className={styles.input} name="titulo" value={datos.titulo || ''} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Fecha de Expiración</label>
                            <Input className={styles.input} name="fecha_de_expiracion" type='date' value={datos.fecha_de_expiracion || ''} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Requisitos</label>
                            <textarea className={styles.input} name="requisitos" value={datos.requisitos || ''} onChange={handleChange} required 
                                style={{ ...inputStyle, height: '80px', resize: 'none' }} />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Descripción</label>
                            <textarea className={styles.input} name="descripcion" value={datos.descripcion || ''} onChange={handleChange} required 
                                style={{ ...inputStyle, height: '80px', resize: 'none' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Género</label>
                                <select className={styles.input} name="genero" value={datos.genero || ''} onChange={handleChange} required style={inputStyle}>
                                    <option value="">Selecciona...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Universal">Universal</option>
                                </select>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Turno</label>
                                <select className={styles.input} name="tiempo" value={datos.tiempo || ''} onChange={handleChange} required style={inputStyle}>
                                    <option value="">Selecciona...</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="vespertino">Vespertino</option>
                                    <option value="Nocturno">Nocturno</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Jornada</label>
                                <select className={styles.input} name="jornada" value={datos.jornada || ''} onChange={handleChange} required style={inputStyle}>
                                    <option value="">Selecciona...</option>
                                    <option value="Completa">Completa</option>
                                    <option value="Media Jornada">Media Jornada</option>
                                    <option value="Intensiva">Intensiva</option>
                                </select>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Modalidad</label>
                                <select className={styles.input} name="modalidad" value={datos.modalidad || ''} onChange={handleChange} required style={inputStyle}>
                                    <option value="">Selecciona...</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Hibrido">Hibrido</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button type="submit" disabled={enviando} className={styles.editarButton}>
                                {enviando ? "Guardando..." : "Guardar Cambios"}
                            </button>
                            <button type="button" onClick={() => navigate(-1)} className={styles.eliminarButtonCrud}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                <div style={{ 
                    width: '750px', 
                    backgroundColor: 'rgba(57, 57, 57, 0.3)', 
                    padding: '2rem', 
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(50, 50, 50, 0.3)' , 
                    display:'flex',
                    flexDirection:'column',
                    gap:'20px' , 
                    color: 'white' , 
                    maxHeight : '84vh',
                    overflowY : 'auto'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{fontSize: '1.2rem'}}>Postulantes</h2>
                       
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => setFiltroEstatus('pendiente')}
                                style={{ 
                                    backgroundColor: filtroEstatus === 'pendiente' ? '#007bff' : 'rgba(255,255,255,0.1)', 
                                    color: 'white', border: 'none', padding: '5px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' 
                                }}
                            >Pendientes</button>
                            <button 
                                onClick={() => setFiltroEstatus('rechazado')}
                                style={{ 
                                    backgroundColor: filtroEstatus === 'rechazado' ? '#dc3545' : 'rgba(255,255,255,0.1)', 
                                    color: 'white', border: 'none', padding: '5px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' 
                                }}
                            >Rechazados</button>
                        </div>
                    </div>
                    
                    {postulantes
                        .filter(p => p.estatus === filtroEstatus) 
                        .map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => handleDownload(item.alumno.curriculum)}
                            style={{
                                width:'100%', 
                                padding : '1rem', 
                                display : 'flex', 
                                justifyContent: 'space-between',
                                alignItems : 'center', 
                                backgroundColor : 'rgba(255, 255, 255, 0.1)', 
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <p style={{ margin: 0 }}>
                                {item.alumno.usuario.nombre} {item.alumno.usuario.apellido_p} {item.alumno.usuario.apellido_m}   
                            </p>

                            <div style={{display: 'flex', gap: '10px' , alignItems:'center'}} onClick={(e) => e.stopPropagation()}>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>{item.estatus}</p>
                                
                                {item.estatus === 'pendiente' && (
                                    <>
                                        <button 
                                            onClick={async () => {
                                                try {
                                                    await api.put(`/postulaciones/${item.id}`, { estatus: 'aceptado' });
                                                    setPostulantes(prev => prev.map(p => 
                                                        p.id === item.id ? { ...p, estatus: 'aceptado' } : p
                                                    ));
                                                    alert("Postulante aceptado");
                                                } catch (error) {
                                                    console.error(error);
                                                    alert("Error al aceptar: " + (error.response?.data?.message || "Error del servidor"));
                                                }
                                            }}
                                            style={{backgroundColor: '#28a745', color: 'white' , padding: '7px' , borderRadius : '15px', border: 'none', cursor: 'pointer'}}
                                        >
                                            Aceptar
                                        </button>

                                        <button 
                                            onClick={async () => {
                                                try {
                                                    await api.put(`/postulaciones/${item.id}`, { estatus: 'rechazado' });
                                                    setPostulantes(prev => prev.map(p => 
                                                        p.id === item.id ? { ...p, estatus: 'rechazado' } : p
                                                    ));
                                                    alert("Postulante rechazado");
                                                } catch (error) {
                                                    console.error(error);
                                                    alert("Error al rechazar");
                                                }
                                            }}
                                            style={{backgroundColor: '#dc3545', color: 'white' , padding : '7px' , borderRadius : '15px', border: 'none', cursor: 'pointer'}}
                                        >
                                            Rechazar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {postulantes.filter(p => p.estatus === filtroEstatus).length === 0 && (
                        <p style={{ textAlign: 'center', opacity: 0.5 }}>No hay postulantes {filtroEstatus}s.</p>
                    )}
                </div>
            </div>
        </>
    );
}