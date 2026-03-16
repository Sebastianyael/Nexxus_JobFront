import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import api from "../api/axios"; 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";


import styles from '../assets/login-form.module.css'

export function LoginForm() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        correo: '',
        contraseña: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        document.body.style.display = 'flex'
        document.body.style.justifyContent = 'center'
        document.body.style.alignItems = 'center'

        return () => {
            document.body.style.display = 'block'
            document.body.style.justifyContent = 'start'
            document.body.style.alignItems = 'start'

        }
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', credentials);
            console.log("Respuesta de Laravel:", response.data);
     
            const tipo = response.data.tipo;

            if(tipo == "alumno"){
                const usuarioInfo = response.data
                navigate('/DashboardStudent' , {state: {user : usuarioInfo}})

            }else if(tipo == "Instructor"){
                alert("Redirgiendo al dashboard del instructor")

            }else if(tipo == "empresa"){
                const empresaInfo = response.data;
                navigate('/empresaDashboard' , {state: {empresa : empresaInfo}})
                
            }
  
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Credenciales incorrectas");
        }
    };
    

    return (
        <>

        <div  className={styles.login_container}>

            <h1>Bienvenido de Nuevo</h1>
            <p style={{ color: '#BDC1CA', fontSize: '14px' }}>
                Ingresa tus credenciales para acceder a tu panel
            </p>
            <br />
    
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="email">Correo Electrónico</label>
                <Input 
                    name="email" 
                    placeholder="pedro1233@gmail.com" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    className={styles.input}
                />

                <label htmlFor="contraseña">Contraseña</label>
                <Input 
                    name="contraseña" 
                    placeholder="*********" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    className={styles.input}
                />

                <br />
                <Button text="Iniciar Sesión" type="submit" className={styles.button} />
            </form>

            <div  className={styles.register_link}>
                <p>¿No tienes una cuenta?</p>

                <Link style={{ color: 'var(--main-color)', textDecoration: 'none' }} title="Registrate Ahora" to="/registroAlumno">Registrate como Alumno</Link>
            </div>
                <Link style={{ color: 'var(--main-color)', textDecoration: 'none' }} title="Registrate Ahora" to="/registroEmpresa">Regsitarte como empresa</Link>
        </div>
        </>
    );
}