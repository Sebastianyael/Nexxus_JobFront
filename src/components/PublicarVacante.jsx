import styles from '../assets/dash_layout.module.css'
import { Button } from './Button'
import { Input } from './Input'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios'

export function PublicarVacante() {
    const location = useLocation()
    const navigate = useNavigate()
    const [enviando, setEnviando] = useState(false)
    

    const empresaId = location.state?.empresa?.empresaId

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEnviando(true)

        
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        

        data.empresa_id = empresaId

        try {
            const response = await api.post('/vacantes', data)

            if (response.status === 201 || response.status === 200) {
                alert("¡Vacante publicada con éxito!")
  
                navigate('/empresaDashboard') 
            }
        } catch (error) {
            console.error("Error al publicar:", error.response?.data || error.message)
            alert("Error al publicar la vacante. Revisa los campos.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <h1>¡Publica una Vacante! {empresaId}</h1>
            <br />
            <form className={styles.postulacionesForm} onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'flex', flexDirection: 'column' }} htmlFor="titulo">Titulo</label>
                    <br />

                    <Input name="titulo" required className={styles.input} />      
                </div>
                
                <div>
                    <label style={{ display: 'flex', flexDirection: 'column' }} htmlFor="fecha_de_expiracion">Fecha de Expiracion</label>
                    <br />
                    <Input name="fecha_de_expiracion" type='date' required className={styles.input} />      
                </div>

                <div>
                    <label style={{ display: 'flex', flexDirection: 'column' }} htmlFor="requisitos">Requisitos</label>
                    <br />
                    <textarea name="requisitos" id="requisitos" required className={styles.input}></textarea>      
                </div>

                <div>
                    <label style={{ display: 'flex', flexDirection: 'column' }} htmlFor="descripcion">Descripcion</label>
                    <br />
                    <textarea name="descripcion" id="descripcion" required className={styles.input}></textarea>      
                </div>

                <Button 
                    text={enviando ? "Publicando..." : "Publicar Vacante"} 
                    type="submit" 
                    className={styles.buttonActive} 
                    disabled={enviando || !empresaId} 
                />
            </form>
        </>
    )
}