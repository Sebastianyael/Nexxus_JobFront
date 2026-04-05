import styles from '../assets/dash_layout.module.css'
import { Button } from './Button'
import { Input } from './Input'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios'

export function PublicarVacante() {
    const location = useLocation();
    const [enviando, setEnviando] = useState(false);
    const empresaId = location.state?.empresa?.empresaId || location.state?.empresaId;

  
    const hoy = new Date().toISOString().split('T')[0];

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
            <br /><br /><br />
            <form className={styles.postulacionesForm} onSubmit={handleSubmitNueva}>
                <div className={styles.formGroup}>
                    <label htmlFor="titulo">Titulo</label>
                    <Input name="titulo" placeholder="Título" required className={styles.input} />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="fecha_de_expiracion">
                        Fecha de Expiracion 
                        <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>(Debe ser posterior al dia de hoy)</span>
                    </label>
                    <Input 
                        name="fecha_de_expiracion" 
                        type='date' 
                        required 
                        className={styles.input} 
                        min={hoy}
                    />
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
        </>
    );
}