import { Input } from "./Input"
import { Button } from "./Button"

export function LoginForm(){
    return(
        <>
            <h1>Bienvenido de Nuevo</h1>
            <p style={{color:'#BDC1CA', fontSize: '14px'}}>Ingresa tus credenciales para acceder a tu panel</p>
            <br />
            <form action="#" method="post" className="login-form">
                <label htmlFor="correo">Correo Electronico</label>
                <Input name="correo" placeholder="pedro1233@gmail.com" type="email" required></Input>

                <label htmlFor="contraseña">Contraseña</label>
                <Input name="contraseña" placeholder="*********" type="password" required></Input>

                <br />
                <Button text="Iniciar Sesion"></Button>
            </form>
            
            <div className="register-link">
                <p>¿No tienes una cuenta?</p>
                <a style={{color: 'var(--main-color)' , textDecoration: 'none'}} href="#">Registrate Ahora</a>
            </div>
        </>
    )
}