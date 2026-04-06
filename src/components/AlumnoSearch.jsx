import { useState, useEffect } from 'react'
import styles from '../assets/register-alumno.module.css'
import dashStyles from '../assets/dash_layout.module.css'
import { Input } from "./Input"
import { Button } from "./Button"
import api from "../api/axios"
import { useLocation } from 'react-router-dom'
import { TrophyIcon, AcademicCapIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/16/solid'

export default function AlumnoSearch() {
    const location = useLocation()
    const maestroInfo = location.state?.maestro
    const idInstructor = maestroInfo?.instructor?.id
   
    const [matricula, setMatricula] = useState('')
    const [alumno, setAlumno] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [comentario, setComentario] = useState('')
    const [enviandoInsignia, setEnviandoInsignia] = useState(false)

   
    const [recomendaciones, setRecomendaciones] = useState([])

    useEffect(() => {
        if (idInstructor) {
            obtenerRecomendaciones()
        }
    }, [idInstructor])

    const obtenerRecomendaciones = async () => {
        try {
            const response = await api.get(`/recomendaciones/${idInstructor}`)
         
            setRecomendaciones(response.data.recomendaciones || [])
        } catch (err) {
            console.error("Error al obtener recomendaciones", err)
        }
    }

    const eliminarRecomendacion = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta insignia?")) return
        try {
            await api.delete(`/recomendaciones/${id}`)
            setRecomendaciones(recomendaciones.filter(r => r.id !== id))
        } catch (err) {
            alert("No se pudo eliminar la recomendación.")
        }
    }

    const buscarAlumno = async () => {
        if (!matricula) return;
        setLoading(true);
        setError(false);
        setAlumno(null);
        setComentario(''); 

        try {
            const response = await api.get(`/usuarios/search/alumnos/${matricula}`);
            if (response.data && response.data.alumno) {
                setAlumno(response.data.alumno);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const enviarInsignia = async () => {
        if (!comentario.trim()) {
            alert("Por favor, añade un comentario sobre el mérito.");
            return;
        }

        setEnviandoInsignia(true);
        const datosEnvio = {
            instructor_id: idInstructor,
            alumnos_id: alumno.id,
            comentario: comentario
        };

        try {
            await api.post('/recomendaciones', datosEnvio);
            setComentario('');
            alert("¡Insignia asignada correctamente!");
            obtenerRecomendaciones(); 
        } catch (err) {
            alert("Hubo un error al asignar la insignia.");
        } finally {
            setEnviandoInsignia(false);
        }
    }

    const badgeButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#FFD700', 
        backgroundImage: 'linear-gradient(45deg,rgb(55, 188, 73),rgb(31, 216, 50))',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        padding: '10px 20px',
        fontWeight: 'bold',
        cursor: enviandoInsignia ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        opacity: enviandoInsignia ? 0.7 : 1
    }

    return (
        <>
        <div style={{
            backgroundColor: 'var(--background-card)',
            borderRadius: '15px',
            padding: '2rem',
            margin: '20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)', 
            minHeight: '40vh'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '20px' }}>
                <h1 style={{ margin: 0, color: 'white' }}>Busca a un alumno</h1>
                <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
                    <Input 
                        type='text' 
                        className={dashStyles.input_dos} 
                        placeholder='Ingresa Matrícula' 
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                    <Button className={styles.button} onClick={buscarAlumno} disabled={loading}>
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </div>
            </div>

            <hr style={{ border: '0.5px solid #eee', marginBottom: '2rem' }} />

            {error && (
                <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '2rem' }}>
                    Alumno no encontrado.
                </div>
            )}

            {alumno && (
                <div style={{ display: 'flex', gap: '30px', alignItems: 'start' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <AcademicCapIcon style={{ width: '80px', height: '80px', color: '#4ade80' }} />
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>
                                {alumno.usuario.nombre} {alumno.usuario.apellido_p} {alumno.usuario.apellido_m}
                            </h3>
                            <div style={{ color: '#ccc', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <p><strong>Matrícula:</strong> {alumno.matricula}</p>
                                <p><strong>Carrera</strong> {alumno.carrera.nombre}</p>
                                <p><strong>Email:</strong> {alumno.usuario.email}</p>
                            </div>
                        </div>
                        
                        <div style={{ 
                            display: 'flex', alignItems: 'center', gap: '15px', padding: '1.5rem',
                            borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)'
                        }}>
                            <button 
                                onClick={enviarInsignia}
                                disabled={enviandoInsignia}
                                style={badgeButtonStyle}
                            >
                                <TrophyIcon style={{ width: '22px', height: '22px' }} />
                                {enviandoInsignia ? 'Enviando...' : 'Asignar Insignia'}
                            </button>

                            <div style={{ flex: 1 }}>
                                <Input 
                                    name='comment' 
                                    type='text' 
                                    className={dashStyles.input_dos} 
                                    placeholder='Añadir un comentario' 
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

       
        <div style={{
            margin: '20px',
            borderRadius: '15px',
            maxHeight: '50vh',
            backgroundColor: 'var(--background-card)', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}>
             <h2 style={{color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem'}}>Insignias Otorgadas</h2>
             {recomendaciones.map((rec) => (
                <div key={rec.id} style={{
                    width : '100%', padding : '15px', display : 'flex', justifyContent: 'space-between',
                    alignItems: 'center', gap : '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Alumno : {rec.alumno_info.usuario.nombre} {rec.alumno_info.usuario.apellido_p} {rec.alumno_info.usuario.apellido_m}</span>
                        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Matrícula: {rec.alumno_info?.matricula}</span>
                    </div>
                    
                    <button 
                        onClick={() => eliminarRecomendacion(rec.id)}
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}
                        title="Eliminar insignia"
                    >
                        <TrashIcon style={{ width: '22px', color: '#ff4d4d' }} />
                    </button>
                </div>
             ))}
             
             {recomendaciones.length === 0 && (
                <p style={{ color: '#888', textAlign: 'center' }}>No has otorgado insignias aún.</p>
             )}
        </div>
        </>
    )
}