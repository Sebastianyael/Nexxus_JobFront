import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import api from "../api/axios"; 

export function LoginForm() {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', credentials);
            console.log("Respuesta de Laravel:", response.data);
            alert("¡Login exitoso!");
  
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <>
            <h1>Bienvenido de Nuevo</h1>
            <p style={{ color: '#BDC1CA', fontSize: '14px' }}>
                Ingresa tus credenciales para acceder a tu panel
            </p>
            <br />
            {/* 4. Conectar el formulario al handleSubmit */}
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email">Correo Electrónico</label>
                <Input 
                    name="email" 
                    placeholder="pedro1233@gmail.com" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                />

                <label htmlFor="contraseña">Contraseña</label>
                <Input 
                    name="contraseña" 
                    placeholder="*********" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                />

                <br />
                <Button text="Iniciar Sesión" type="submit" />
            </form>

            <div className="register-link">
                <p>¿No tienes una cuenta?</p>
                <a style={{ color: 'var(--main-color)', textDecoration: 'none' }} href="#">
                    Regístrate Ahora
                </a>
            </div>
        </>
    );
}