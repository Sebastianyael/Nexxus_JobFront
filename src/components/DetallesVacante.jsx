import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import { Button } from './Button';
import { Input } from './Input';
import styles from '../assets/dash_layout.module.css'
export default function DetallesVacante() {
    const location = useLocation();
    const navigate = useNavigate();
    
 
    const vacanteOriginal = location.state?.vacante;

    const [datos, setDatos] = useState(vacanteOriginal || {});
    const [enviando, setEnviando] = useState(false);

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
        <div style={{ padding: '20px' , fontFamily: 'Arial', }}>
            
            <h1 style={{ color: 'white', marginBottom: '15px' }}>Editar Vacante</h1>

            <div style={{ 
                width: '650px', 
                backgroundColor: 'rgba(57, 57, 57, 0.3)', 
                padding: '2rem', 
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(50, 50, 50, 0.3)'
            }}>
                <form onSubmit={handleSubmit}>
                    
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Título</label>
                        <Input className={styles.input} styles name="titulo" value={datos.titulo || ''} onChange={handleChange} required style={inputStyle} />
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
                        <Button 
                            type="submit" 
                            disabled={enviando}
                            className={styles.editarButton}
                        >
                            {enviando ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                        <Button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className={styles.eliminarButtonCrud}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}