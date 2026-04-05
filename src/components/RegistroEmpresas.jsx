import styles from '../assets/register-alumno.module.css'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function RegistroEmpresas() {
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    // NUEVOS ESTADOS PARA VALIDACIÓN
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const goToLogin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorPass("");

        // VALIDACIÓN DE CONTRASEÑA ANTES DE ENVIAR
        if (password.length < 8) {
            setErrorPass("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorPass("Las contraseñas no coinciden.");
            return;
        }

        setEnviando(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await api.post('/empresas', data);
            
            if (response.status === 200 || response.status === 201) {
                alert("¡Empresa registrada con éxito!");
                goToLogin();
            }
        } catch (error) {
            const mensajeError = error.response?.data?.mensaje || "Error al crear la cuenta";
            const detalles = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : "";
            
            console.error("Error al registrar:", error.response?.data);
            alert(`${mensajeError}\n${detalles}`);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={styles.register_container}>
            <h1>Crea la Cuenta de tu Empresa</h1>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Nombre de la Empresa</label>
                    <Input name="nombre" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label>Giro de la Empresa</label>
                    <Input name="giro" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label>Teléfono</label>
                    <Input name="telefono" type="number" required className={styles.input}
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
                    <label>Email</label>
                    <Input name="email" type="email" required className={styles.input} />
                </div>

                {/* CONTRASEÑA CON AVISO EN EL LABEL */}
                <div className={styles.formGroup}>
                    <label>
                        Contraseña 
                        {password.length > 0 && password.length < 8 && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>(Mínimo 8)</span>
                        )}
                    </label>
                    <Input 
                        name="contraseña" 
                        type="password" 
                        required 
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* CONFIRMAR CONTRASEÑA CON AVISO EN EL LABEL */}
                <div className={styles.formGroup}>
                    <label>
                        Confirmar Contraseña
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '10px' }}>(No coincide)</span>
                        )}
                    </label>
                    <Input 
                        name="confirmar_contraseña" 
                        type="password" 
                        required 
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* ERROR GENERAL DE CONTRASEÑA */}
                {errorPass && (
                    <p style={{ color: '#ff4d4d', fontSize: '13px', textAlign: 'center', gridColumn: '1 / -1' }}>{errorPass}</p>
                )}

                <div className={styles.formGroup}>
                    <label>Calle</label>
                    <Input name="calle" type="text" required className={styles.input} />
                </div>
                
                <div className={styles.formGroup}>
                    <label>Municipio</label>
                    <Input name="municipio" type="text" required className={styles.input} />
                </div>
              
                <div className={styles.formGroup}>
                    <label>Código Postal</label>
                    <Input name="cp" type="number" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label>Colonia</label>
                    <Input name="colonia" type="text" required className={styles.input} />
                </div>

                <br />
                <Button 
                    text={enviando ? "Registrando..." : "Crear Cuenta"} 
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