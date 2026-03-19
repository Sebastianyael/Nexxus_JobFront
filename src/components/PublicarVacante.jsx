import styles from '../assets/dash_layout.module.css'
import { Button } from './Button'
import { Input } from './Input'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'

export function PublicarVacante() {
    const [vacantes, setVacantes] = useState([]);
    const [editandoId, setEditandoId] = useState(null); 
    const [datosEditados, setDatosEditados] = useState({}); 
    const location = useLocation();
    const navigate = useNavigate();
    const [enviando, setEnviando] = useState(false);

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

    
    const iniciarEdicion = (vacante) => {
        setEditandoId(vacante.id);
        setDatosEditados({ ...vacante }); 
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setDatosEditados(prev => ({ ...prev, [name]: value }));
    };

    const guardarCambios = async (id) => {
        setEnviando(true);
        try {
            await api.put(`/vacantes/${id}`, datosEditados);
            alert("Vacante actualizada con éxito");
            setEditandoId(null); 
            obtenerVacantes(); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("No se pudo actualizar la vacante");
        } finally {
            setEnviando(false);
        }
    };

    const eliminarVacante = async (id) => {

        if (!window.confirm("¿Estás seguro de que deseas eliminar esta vacante? Esta acción no se puede deshacer.")) {
            return;
        }
    
        try {
            const response = await api.delete(`/vacantes/${id}`);
            
            if (response.status === 200) {
                alert("Vacante eliminada con éxito");
                
                setVacantes(vacantes.filter(vacante => vacante.id !== id));
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Hubo un error al intentar eliminar la vacante.");
        }
    };

    const handleSubmitNueva = async (e) => {
        e.preventDefault();
        setEnviando(true);
    
        const formData = new FormData(e.currentTarget); 
        const data = Object.fromEntries(formData.entries());
        
        
        const payload = {
            ...data,
            empresa_id: empresaId 
        };
    
        try {
            const response = await api.post('/vacantes', payload);
            if (response.status === 201 || response.status === 200) {
                alert("¡Vacante publicada!");
                e.target.reset(); 
                obtenerVacantes();
            }
        } catch (error) {
            
            const mensajeError = error.response?.data?.mensaje || "Error al publicar";
            alert(mensajeError);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <h1>¡Publica una Vacante! </h1>
            <form className={styles.postulacionesForm} onSubmit={handleSubmitNueva}>
                <div className={styles.formGroup}>
                    <label htmlFor="titulo">Titulo</label>
                    <Input name="titulo" placeholder="Título" required className={styles.input} />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="fecha_de_expiracion">Fecha de Expiracion</label>
                    <Input name="fecha_de_expiracion" type='date' required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="requisitos">Requisitos</label>
                    <textarea name="requisitos" placeholder="Requisitos" required className={styles.input}></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Descripcion">Descripcion</label>
                    <textarea name="descripcion" placeholder="Descripción" required className={styles.input}></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="genero" >Genero</label>
                    <select name="genero" className={styles.input} id="genero" required>
                        <option value="">Selecciona una opcion</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Universal">Universal</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="tiempo" >Turno</label>
                    <select name="tiempo" className={styles.input} id="tiempo" required>
                        <option value="">Selecciona una opcion</option>
                        <option value="Matutino">Matutino</option>
                        <option value="vespertino">Vespertino</option>
                        <option value="Nocturno">Nocturno</option>
                    </select>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="jornada" >Jornada</label>
                    <select name="jornada" className={styles.input} id="jornada" required>
                        <option value="">Selecciona una opcion</option>
                        <option value="Completa">Completa</option>
                        <option value="Media Jornada">Media Jornada</option>
                        <option value="Intensiva">Intensiva</option>
                    </select>
                </div>

                
                <div className={styles.formGroup}>
                    <label htmlFor="modalidad" >Modalidad</label>
                    <select name="modalidad" className={styles.input} id="modalidad" required>
                        <option value="">Selecciona una opcion</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Remoto">Remoto </option>
                        <option value="Hibrido">Hibrido</option>

                    </select>
                </div>
                

                <Button text={enviando ? "Publicando..." : "Publicar Vacante"} type="submit" className={styles.buttonActive} disabled={enviando} />
            </form>


            <br /><br />
            <div className={styles.vacantes_publicadas}>
                {vacantes.map((vacante) => (
                    <div key={vacante.id} className={styles.vacante}>
                        {editandoId === vacante.id ? (
                            <>
                                
                                    
                                <Input name="titulo" value={datosEditados.titulo} onChange={handleEditChange} className={styles.input} />
                                
                      
                                <textarea name="descripcion" value={datosEditados.descripcion} onChange={handleEditChange} className={styles.input} />
                                
                                <textarea name="requisitos" value={datosEditados.requisitos} onChange={handleEditChange} className={styles.input} />
                                
                                <div style={{display:'flex', gap:'10px'}}>
                                    <Button onClick={() => guardarCambios(vacante.id)} className={styles.editarButton}>
                                        {enviando ? "Guardando..." : "Guardar"}
                                    </Button>
                                    <Button onClick={() => setEditandoId(null)} className={styles.eliminarButtonCrud}>
                                        Cancelar
                                    </Button>
                                </div>
                            </>
                        ) : (
                         
                            <>
                                <h3 style={{color: '#E87DD6'}}>{vacante.titulo}</h3>
                                <p><strong>Descripción:</strong></p>
                                <p style={{fontSize: '14px'}}>{vacante.descripcion}</p>
                                <p><strong>Requisitos:</strong></p>
                                <p style={{fontSize: '14px'}}>{vacante.requisitos}</p>
                                
                                <Button className={styles.editarButton} onClick={() => iniciarEdicion(vacante)}>
                                    Editar
                                </Button>
                                <Button 
                                    className={styles.eliminarButtonCrud} 
                                    onClick={() => eliminarVacante(vacante.id)}
                                >
                                    Eliminar
                                </Button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}