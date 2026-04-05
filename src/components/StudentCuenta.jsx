import styles from '../assets/register-alumno.module.css'
import dashStyles from '../assets/dash_layout.module.css'
import api from '../api/axios';
import { useState, useEffect, useCallback } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { useLocation } from 'react-router-dom';

export default function StudenCuenta() {
    const [carreras, setCarreras] = useState([]);
    const [alumno, setAlumno] = useState(null);
    const [enviando, setEnviando] = useState(false);

    // NUEVOS ESTADOS PARA VALIDACIÓN DE CONTRASEÑA
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const location = useLocation();
    const userId = location.state?.user?.alumnoId;

    const obtenerInformacion = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await api.get(`/usuarios/alumnos/${userId}`);
            setAlumno(response.data);
            // Inicializamos el estado de la contraseña con el valor actual
            setPassword(response.data.alumno.usuario.contraseña || "");
            setConfirmPassword(response.data.alumno.usuario.contraseña || "");
        } catch (error) {
            console.error("Error al obtener la info:", error);
        }
    }, [userId]);

    useEffect(() => {
        obtenerInformacion();
    }, [obtenerInformacion]);

    useEffect(() => {
        const obtenerCarreras = async () => {
            try {
                const response = await api.get('/carreras');
                setCarreras(response.data.carreras);
            } catch (error) {
                console.error("Error al cargar las carreras:", error);
            }
        };
        obtenerCarreras();
    }, []);

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        setErrorPass("");

        // BLOQUEO DE ENVÍO SI NO CUMPLE REQUISITOS
        if (password.length < 8) {
            setErrorPass("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorPass("Las contraseñas no coinciden.");
            return;
        }

        setEnviando(true);
        const formData = new FormData(e.currentTarget);
        formData.append('_method', 'PUT');

        try {
            const response = await api.post(`/usuarios/alumnos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert("¡Cuenta actualizada con éxito!");
                await obtenerInformacion();
            }
        } catch (error) {
            console.error("Error al actualizar:", error.response?.data || error.message);
            alert("Hubo un error al actualizar. Revisa que el PDF sea válido.");
        } finally {
            setEnviando(false);
        }
    };

    if (!alumno) {
        return <div className={dashStyles.loading}>Cargando datos del perfil...</div>;
    }

    return (
        <>
            <h1>Mi cuenta</h1>

            <form className={dashStyles.miCuentaForm} onSubmit={(e) => handleSubmit(e, alumno.alumno.id)} >
                <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre</label>
                    <Input name="nombre" type="text" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.nombre} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="apellido_p">Apellido Paterno</label>
                    <Input name="apellido_p" type="text" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.apellido_p} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="apellido_m">Apellido Materno</label>
                    <Input name="apellido_m" type="text" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.apellido_m} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <Input name="email" type="email" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.email} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="telefono">Teléfono</label>
                    <Input name="telefono" type="number" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.telefono}
                        min={0}
                        max={9999999999}
                        onKeyDown={(e) => {
                            if (["-", "e", "+", "."].includes(e.key)) e.preventDefault();
                        }}
                        onInput={(e) => {
                            if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
                            if (e.target.value < 0) e.target.value = "";
                        }} 
                    />
                </div>

                {/* --- CAMPO CONTRASEÑA ACTUALIZADO --- */}
                <div className={styles.formGroup}>
                    <label htmlFor="contraseña">
                        Contraseña
                        {password.length > 0 && password.length < 8 && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>(Mínimo 8 caracteres)</span>
                        )}
                    </label>
                    <Input 
                        name="contraseña" 
                        type="password" 
                        required 
                        className={dashStyles.input} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* --- CAMPO CONFIRMAR CONTRASEÑA AÑADIDO --- */}
                <div className={styles.formGroup}>
                    <label htmlFor="confirmar_contraseña">
                        Confirmar Contraseña
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>(No coinciden)</span>
                        )}
                    </label>
                    <Input 
                        name="confirmar_contraseña" 
                        type="password" 
                        required 
                        className={dashStyles.input} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {errorPass && (
                    <p style={{ color: '#ff4d4d', fontSize: '13px', textAlign: 'center', gridColumn: '1 / -1' }}>{errorPass}</p>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                    <Input name="fecha_nacimiento" type="date" required className={dashStyles.input} defaultValue={alumno.alumno.usuario.fecha_nacimiento} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="genero">Género</label>
                    <select name="genero" className={dashStyles.input} defaultValue={alumno.alumno.usuario.genero} required>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="matricula">Matricula</label>
                    <Input name="matricula" type="number" required className={dashStyles.input} defaultValue={alumno.alumno.matricula} />
                </div>

                <div className={styles.formGroup}>
                    <div style={{ display: 'flex', gap: '10px', width: 'auto' }}>
                        <label htmlFor="curriculum">Currículum (PDF)</label>
                        {alumno.alumno.curriculum_url && (
                            <a
                                style={{ display: 'block', color: '#28a745' }}
                                href={alumno.alumno.curriculum_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver archivo actual
                            </a>
                        )}
                    </div>
                    <input
                        name="curriculum"
                        type="file"
                        accept=".pdf"
                        className={dashStyles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="carrera">Carrera</label>
                    <select
                        name="carrera_id"
                        className={dashStyles.input}
                        required
                        defaultValue={alumno.alumno.carrera_id}
                    >
                        <option value={alumno.alumno.carrera_id}>{alumno.alumno.carrera.nombre}</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.id} value={carrera.id}>
                                {carrera.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <Input name="tipo" type='hidden' value="alumno" />

                <br />
                <Button
                    text={enviando ? "Cargando..." : "Actualizar"}
                    type="submit"
                    className={styles.button}
                    disabled={enviando}
                />
            </form>
        </>
    );
}