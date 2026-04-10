import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { TrophyIcon } from '@heroicons/react/16/solid';
import { Input } from './Input';

export default function DetallesVacante() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const vacanteOriginal = location.state?.vacante;

    const [datos, setDatos] = useState(vacanteOriginal || {});
    const [enviando, setEnviando] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
    const [filtroEstatus, setFiltroEstatus] = useState('pendiente');
    
    // Color principal solicitado
    const primaryColor = "#e02a54";

    // Manejador de tamaño de pantalla para responsividad
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        return <div style={{padding: '20px', color: 'white'}}>No se seleccionó ninguna vacante.</div>;
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

    const isMobile = width <= 850;

    // Estilos base
    const inputStyle = {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        color: 'white',
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box',
        outline: 'none'
    };

    const labelStyle = {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '5px',
        display: 'block'
    };

    const containerStyle = {
        padding: isMobile ? '10px' : '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        gap: '25px',
        minHeight: '100vh',
        backgroundColor: '#121212'
    };

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <button
                style={{
                    padding: '1rem', 
                    backgroundColor: 'transparent', 
                    color: primaryColor, 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                onClick={() => navigate(-1)}
            >
                ← Volver al Dashboard
            </button>

            <div style={containerStyle}>
                
                {/* COLUMNA FORMULARIO */}
                <div style={{ 
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '600px', 
                    backgroundColor: 'rgba(57, 57, 57, 0.3)', 
                    padding: isMobile ? '1.5rem' : '2.5rem', 
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    boxSizing: 'border-box'
                }}>
                    <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '1.5rem' }}>Editar Vacante</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={labelStyle}>Título</label>
                            <Input style={inputStyle} name="titulo" value={datos.titulo || ''} onChange={handleChange} required />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={labelStyle}>Fecha de Expiración</label>
                            <Input style={inputStyle} name="fecha_de_expiracion" type='date' value={datos.fecha_de_expiracion || ''} onChange={handleChange} required />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={labelStyle}>Requisitos</label>
                            <textarea style={{ ...inputStyle, height: '100px', resize: 'none' }} name="requisitos" value={datos.requisitos || ''} onChange={handleChange} required />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={labelStyle}>Descripción</label>
                            <textarea style={{ ...inputStyle, height: '100px', resize: 'none' }} name="descripcion" value={datos.descripcion || ''} onChange={handleChange} required />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                            <div>
                                <label style={labelStyle}>Género</label>
                                <select style={inputStyle} name="genero" value={datos.genero || ''} onChange={handleChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Universal">Universal</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Turno</label>
                                <select style={inputStyle} name="tiempo" value={datos.tiempo || ''} onChange={handleChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="vespertino">Vespertino</option>
                                    <option value="Nocturno">Nocturno</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={labelStyle}>Jornada</label>
                                <select style={inputStyle} name="jornada" value={datos.jornada || ''} onChange={handleChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Completa">Completa</option>
                                    <option value="Media Jornada">Media Jornada</option>
                                    <option value="Intensiva">Intensiva</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Modalidad</label>
                                <select style={inputStyle} name="modalidad" value={datos.modalidad || ''} onChange={handleChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Hibrido">Hibrido</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                            <button type="submit" disabled={enviando} style={{
                                flex: 1, height: '50px', borderRadius: '10px', backgroundColor: primaryColor, color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'
                            }}>
                                {enviando ? "Guardando..." : "Guardar Cambios"}
                            </button>
                            <button type="button" onClick={() => navigate(-1)} style={{
                                flex: 1, height: '50px', borderRadius: '10px', backgroundColor: '#444', color: 'white', border: 'none', cursor: 'pointer'
                            }}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                {/* COLUMNA POSTULANTES */}
                <div style={{ 
                    width: '100%', 
                    maxWidth: isMobile ? '100%' : '600px', 
                    backgroundColor: 'rgba(57, 57, 57, 0.3)', 
                    padding: isMobile ? '1.5rem' : '2.5rem', 
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    display:'flex',
                    flexDirection:'column',
                    gap:'20px' , 
                    color: 'white' , 
                    maxHeight : isMobile ? 'auto' : '85vh',
                    overflowY : 'auto',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <h2 style={{fontSize: '1.2rem', margin: 0}}>Postulantes</h2>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => setFiltroEstatus('pendiente')} style={{ backgroundColor: filtroEstatus === 'pendiente' ? primaryColor : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}>Pendientes</button>
                            <button onClick={() => setFiltroEstatus('rechazado')} style={{ backgroundColor: filtroEstatus === 'rechazado' ? '#444' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}>Rechazados</button>
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
                                padding : '1.2rem', 
                                display : 'flex', 
                                flexDirection: 'column',
                                backgroundColor : 'rgba(255, 255, 255, 0.05)', 
                                borderRadius: '12px',
                                cursor: 'pointer',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxSizing: 'border-box'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px' }}>
                                        {item.alumno.usuario.nombre} {item.alumno.usuario.apellido_p}
                                    </p>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: 0.6 }}>{item.alumno.usuario.correo}</p>
                                </div>

                                <div style={{display: 'flex', gap: '8px' , alignItems:'center'}} onClick={(e) => e.stopPropagation()}>
                                    {item.estatus === 'pendiente' && (
                                        <>
                                            <button onClick={async () => { try { await api.put(`/postulaciones/${item.id}`, { estatus: 'aceptado' }); setPostulantes(prev => prev.map(p => p.id === item.id ? { ...p, estatus: 'aceptado' } : p)); alert("Postulante aceptado"); } catch (error) { console.error(error); alert("Error"); } }} style={{backgroundColor: '#28a745', color: 'white' , padding: '8px 12px' , borderRadius : '8px', border: 'none', cursor: 'pointer', fontSize: '11px'}}>Aceptar</button>
                                            <button onClick={async () => { try { await api.put(`/postulaciones/${item.id}`, { estatus: 'rechazado' }); setPostulantes(prev => prev.map(p => p.id === item.id ? { ...p, estatus: 'rechazado' } : p)); alert("Postulante rechazado"); } catch (error) { console.error(error); alert("Error"); } }} style={{backgroundColor: primaryColor, color: 'white' , padding : '8px 12px' , borderRadius : '8px', border: 'none', cursor: 'pointer', fontSize: '11px'}}>Rechazar</button>
                                        </>
                                    )}
                                    {item.estatus !== 'pendiente' && (
                                        <span style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>{item.estatus}</span>
                                    )}
                                </div>
                            </div>

                            {item.alumno.recomendaciones?.map((rec) => (
                                <div key={rec.id} style={{ fontSize: '11px', marginTop: '10px', padding: '8px', backgroundColor: 'rgba(255,215,0,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrophyIcon style={{ width: '16px', height: '16px', color: '#FFD700', flexShrink: 0 }} />
                                    <span style={{ fontStyle: 'italic', color: '#eee' }}>"{rec.comentario}"</span>
                                </div>
                            ))}
                        </div>
                    ))}

                    {postulantes.filter(p => p.estatus === filtroEstatus).length === 0 && (
                        <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '20px' }}>No hay postulantes {filtroEstatus}s.</p>
                    )}
                </div>
            </div>
        </div>
    );
}