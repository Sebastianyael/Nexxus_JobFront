import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from '../assets/register-alumno.module.css'
import dashStyles from '../assets/dash_layout.module.css'
import { Input } from "./Input"
import { Button } from "./Button"
import api from "../api/axios"

export default function ProfesorCuenta() {
    const location = useLocation()
    
   
    const [maestro, setMaestro] = useState(null)
    const [puestos, setPuestos] = useState([])
    const [cargando, setCargando] = useState(true)

  
    const idUsuarioInicial = location.state?.maestro?.instructor?.id_usuario 

    useEffect(() => {
        const fetchData = async () => {
            try {

                const resPuestos = await api.get('/puestos')
                if (Array.isArray(resPuestos.data)) {
                    setPuestos(resPuestos.data)
                }

         
                const resMaestro = await api.get(`/usuarios/instructores/${idUsuarioInicial}`)
                
             
                if (resMaestro.data && resMaestro.data.instructores) {
                    setMaestro(resMaestro.data.instructores)
                }
            } catch (error) {
                console.error("Error al sincronizar datos:", error)
            } finally {
                setCargando(false)
            }
        }

        fetchData()
    }, [idUsuarioInicial])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        
        const dataToSend = {
            nombre: formData.get("nombre"),
            apellido_p: formData.get("apellido_p"),
            apellido_m: formData.get("apellido_m"),
            email: formData.get("email"),
            telefono: formData.get("telefono"),
            contraseña: formData.get("contraseña"),
            fecha_nacimiento: formData.get("fecha_nacimiento"),
            genero: formData.get("genero"),
            tipo: "Instructor", 
            no_empleado: parseInt(formData.get("no_empleado")),
            id_puesto: parseInt(formData.get("id_puesto"))
        }

        try {
            await api.put(`/usuarios/instructores/${maestro.id_usuario}`, dataToSend)
            alert("¡Datos actualizados correctamente!")
            
            
            const refresh = await api.get(`/usuarios/instructores/${maestro.id_usuario}`)
            setMaestro(refresh.data.instructores)
        } catch (error) {
            console.error("Error al actualizar:", error)
            alert("Error al guardar cambios.")
        }
    }

    if (cargando) return <p>Cargando información actualizada...</p>
    if (!maestro) return <p>No se encontró información del instructor.</p>

    return (
        <>
            <h1>Mis datos</h1>
            <br />
            <form className={dashStyles.miCuentaForm} onSubmit={handleSubmit}>
                
                <div className={styles.formGroup}>
                    <label>Nombre</label>
                    <Input 
                        name="nombre" 
                        type="text" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.nombre} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Apellido Paterno</label>
                    <Input 
                        name="apellido_p" 
                        type="text" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.apellido_p} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Apellido Materno</label>
                    <Input 
                        name="apellido_m" 
                        type="text" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.apellido_m} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <Input 
                        name="email" 
                        type="email" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.email} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Teléfono</label>
                    <Input 
                        name="telefono" 
                        type="text" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.telefono} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Contraseña</label>
                    <Input 
                        name="contraseña" 
                        type="password" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.contraseña} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Fecha de Nacimiento</label>
                    <Input 
                        name="fecha_nacimiento" 
                        type="date" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.fecha_nacimiento} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Género</label>
                    <select 
                        name="genero" 
                        className={dashStyles.input} 
                        defaultValue={maestro.usuarios?.genero} 
                        required
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Número de Empleado</label>
                    <Input 
                        name="no_empleado" 
                        type="number" 
                        required 
                        className={dashStyles.input} 
                        defaultValue={maestro.no_empleado} 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Puesto</label>
                    <select 
                        name="id_puesto" 
                        className={dashStyles.input} 
                        defaultValue={maestro.id_puesto} 
                        required
                    >
                        {puestos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <Button text={'Actualizar'} type="submit" className={styles.button} />
            </form>
        </>
    )
}