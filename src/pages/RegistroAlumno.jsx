import styles from '../assets/register-alumno.module.css'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function RegistroAlumno() {
    const [carreras, setCarreras] = useState([]);
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    const [archivo, setArchivo] = useState(null);
    
   
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorGeneral, setErrorGeneral] = useState("");

    function goToLogin() {
        navigate('/')
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorGeneral("");

       
        if (password.length < 8) {
            setErrorGeneral("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorGeneral("Las contraseñas no coinciden.");
            return;
        }

        setEnviando(true);
        const formData = new FormData(e.target);

        if (archivo) {
            formData.set('curriculum', archivo);
        }

        try {
            const response = await api.post('/usuarios/alumnos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert("¡Cuenta creada con éxito!");
                goToLogin();
            }
        } catch (error) {
            console.error("Errores de validación:", error.response?.data.error);
            alert("Revisa los campos: " + JSON.stringify(error.response?.data.error));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={styles.register_container}>
            <h1>Crea tu Cuenta</h1>
            <p style={{ color: '#BDC1CA', fontSize: '14px' }}>
                Encuentra tu próxima oportunidad laboral
            </p>
            <br />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre</label>
                    <Input name="nombre" placeholder="Juanito" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="apellido_p">Apellido Paterno</label>
                    <Input name="apellido_p" placeholder="Perez" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="apellido_m">Apellido Materno</label>
                    <Input name="apellido_m" placeholder="Perez" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <Input name="email" placeholder="juanPerez@gmail.com" type="email" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="telefono">Teléfono</label>
                    <Input 
                        name="telefono" 
                        placeholder="222 333 4455" 
                        type="number" 
                        required 
                        className={styles.input} 
                        onKeyDown={(e) => {
                            if (["-", "e", "+", "."].includes(e.key)) e.preventDefault();
                        }}
                        onInput={(e) => {
                            if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
                            if (e.target.value < 0) e.target.value = "";
                        }} 
                    />
                </div>

           
                <div className={styles.formGroup}>
                    <label htmlFor="contraseña">
                        Contraseña 
                        {password.length > 0 && password.length < 8 && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>
                                (Mínimo 8 caracteres)
                            </span>
                        )}
                    </label>
                    <Input 
                        name="contraseña" 
                        placeholder="***********" 
                        type="password" 
                        required 
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

            
                <div className={styles.formGroup}>
                    <label htmlFor="confirmar_contraseña">
                        Confirmar Contraseña
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>
                                (No coinciden)
                            </span>
                        )}
                    </label>
                    <Input 
                        name="confirmar_contraseña" 
                        placeholder="***********" 
                        type="password" 
                        required 
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

               
                {errorGeneral && (
                    <p style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                        {errorGeneral}
                    </p>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                    <Input name="fecha_nacimiento" type="date" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="genero">Género</label>
                    <select name="genero" className={styles.input} required>
                        <option value="">Elije una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="matricula">Matricula</label>
                    <Input name="matricula" type="number" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="curriculum">Currículum (Solo PDF)</label>
                    <input 
                        name="curriculum" 
                        type="file" 
                        accept="application/pdf" 
                        required 
                        className={styles.input} 
                        onChange={(e) => setArchivo(e.target.files[0])}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="carrera">Carrera</label>
                    <select name="carrera_id" className={styles.input} required>
                        <option value="">Selecciona tu carrera</option>
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
                    text={enviando ? "Cargando..." : "Crear Cuenta"} 
                    type="submit" 
                    className={styles.button} 
                    disabled={enviando}
                />
                
                <Button 
                    text={'Cancelar'} 
                    type="button"
                    className={styles.eliminarButtonCrud} 
                    onClick={goToLogin} 
                />
            </form>
        </div>
    );
}