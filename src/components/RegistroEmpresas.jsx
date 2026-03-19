import styles from '../assets/register-alumno.module.css'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function RegistroEmpresas() {
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    <Input name="telefono" type="text" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <Input name="email" type="email" required className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label>Contraseña</label>
                    <Input name="contraseña" type="password" required className={styles.input} />
                </div>


            

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

                <Button text={'Cancelar'} className={styles.eliminarButtonCrud} onClick={() => goToLogin()}>
        
                </Button>
            </form>
        </div>
    );
}