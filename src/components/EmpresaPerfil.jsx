import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Input } from "./Input";
import { Button } from "./Button";
import styles from '../assets/dash_layout.module.css';

export default function EmpresaPerfil() {
    const location = useLocation();
    const empresaId = location.state?.empresa?.empresaId;

    
    const [formData, setFormData] = useState({
        nombre: '',
        giro: '',
        telefono: '',
        email: '',
        contraseña: '', 
        calle: '',
        cp: '',
        colonia: '',
        municipio: ''
    });

    
    useEffect(() => {
        if (empresaId) {
            const fetchEmpresa = async () => {
                try {
                    
                    const response = await axios.get(`http://localhost:8000/api/empresas/${empresaId}`);
                    
                    
                    const info = response.data.empresas;

                    if (info) {
                        setFormData({
                            nombre: info.nombre || '',
                            giro: info.giro || '',
                            telefono: info.telefono || '',
                            email: info.email || '',
                            contraseña: info.contraseña, 
                            calle: info.calle || '',
                            cp: info.cp || '',
                            colonia: info.colonia || '',
                            municipio: info.MUNICIPIO || ''
                        });
                    }
                } catch (error) {
                    console.error("Error al obtener la empresa:", error);
                }
            };

            fetchEmpresa();
        }
    }, [empresaId]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/empresas/${empresaId}`, formData);
            
            if (response.status === 200) {
                alert("Empresa actualizada correctamente");
            }
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al intentar actualizar los datos");
        }
    };

    return (
        <>
            <h1>Datos de la empresa</h1>
            <br />
            <form 
                onSubmit={handleUpdate} 
                style={{
                    width: '80%', 
                    height: 'auto', 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '20px', 
                    padding: '1rem', 
                    justifyContent: 'space-around'
                }}
            >
                
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="nombre">Nombre de la Empresa</label>
                    <Input name="nombre" value={formData.nombre} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="giro">Giro</label>
                    <Input name="giro" value={formData.giro} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="telefono">Telefono</label>
                    <Input name="telefono" value={formData.telefono} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="email">Email</label>
                    <Input name="email" value={formData.email} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="contraseña">Contraseña</label>
                    <Input name="contraseña" type="password" value={formData.contraseña} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="calle">Calle</label>
                    <Input name="calle" value={formData.calle} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="cp">CP</label>
                    <Input name="cp" value={formData.cp} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="colonia">Colonia</label>
                    <Input name="colonia" value={formData.colonia} onChange={handleChange} className={styles.input} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '290px' }}>
                    <label htmlFor="municipio">Municipio</label>
                    <Input name="municipio" value={formData.municipio} onChange={handleChange} className={styles.input} />
                </div>

                <Button className={styles.editarButton} type="submit">
                    Actualizar
                </Button>

            </form>
        </>
    );
}