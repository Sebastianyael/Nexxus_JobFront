import api from '../api/axios'
import styles from '../assets/dash_layout.module.css'
import { useEffect, useState } from "react";
import { Button } from './Button';
import { useLocation } from 'react-router-dom';

export default function StudentPerfil({children}){
    const [vacantes, setVacantes] = useState([]);

    const [filtros, setFiltros] = useState({
        genero: '',
        tiempo: '',
        jornada: '',
        modalidad: ''
    });

    const location = useLocation()
    const alumnoId = location.state?.user.alumnoId;


    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const obtenerVacantes = async (params = {}) => {
        try {
          
            const response = await api.get('/vacantes/filtrar', { params }); 
            
            setVacantes(response.data.vacantes || []);
        } catch (error) {
            console.error("Error al obtener vacantes:", error);
        }
    };

    useEffect(() => {
        obtenerVacantes();
    }, []);


    const ejecutarFiltro = (e) => {
        e.preventDefault();
        obtenerVacantes(filtros);
    };

    const postulacion = async(vacanteId) => {
        try{
            const response = await api.post('/postulaciones' , {
                alumno_id : alumnoId,
                vacante_id : vacanteId,
                estatus : 'pendiente'
            })
            if (response.status === 200 || response.status === 201) {
                alert(response.data.mensaje);
            }
        }catch(error){
            console.error('Error en la postulacion' , error)
            alert('Hubo un error en la postulacion')
        }
    }

    return (
        <>
            <h1>¡Bienvenido de Nuevo!</h1>
            <br /><br />
            <p>Filtrar Oportunidades</p>
            <br />
            
          
            <form className={styles.containerFiltro} onSubmit={ejecutarFiltro}>
                <div className={styles.formGroup}>
                    <label htmlFor="genero" >Género</label>
                    <select 
                        name="genero" 
                        className={styles.filtroInput} 
                        id="genero" 
                        value={filtros.genero}
                        onChange={handleChange}
                    >
                        <option value="">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Universal">Universal</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="tiempo" >Turno</label>
                    <select 
                        name="tiempo" 
                        className={styles.filtroInput} 
                        id="tiempo" 
                        value={filtros.tiempo}
                        onChange={handleChange}
                    >
                        <option value="">Todos</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Nocturno">Nocturno</option>
                    </select>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="jornada" >Jornada</label>
                    <select 
                        name="jornada" 
                        className={styles.filtroInput} 
                        id="jornada" 
                        value={filtros.jornada}
                        onChange={handleChange}
                    >
                        <option value="">Todas</option>
                        <option value="Completa">Completa</option>
                        <option value="Media Jornada">Media Jornada</option>
                        <option value="Intensiva">Intensiva</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="modalidad" >Modalidad</label>
                    <select 
                        name="modalidad" 
                        className={styles.filtroInput} 
                        id="modalidad" 
                        value={filtros.modalidad}
                        onChange={handleChange}
                    >
                        <option value="">Todas</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Remoto">Remoto </option>
                        <option value="Hibrido">Hibrido</option>
                    </select>
                </div>
            
                <Button type="submit" className={styles.button_secondary}>Filtrar</Button>
                
      
                <button 
                    type="button"
                    className={styles.button_secondary} 
                    onClick={() => {
                        const reset = { genero: '', tiempo: '', jornada: '', modalidad: '' };
                        setFiltros(reset);
                        obtenerVacantes(reset);
                    }}
                    style={{marginLeft: '10px', fontSize: '12px'}}
                >
                    Limpiar
                </button>
            </form>

            <br /><br />
            <h3>Vacantes para ti</h3>
            <br />
               
            <div className={styles.vacantes_container}>
                {vacantes.length > 0 ? vacantes.map((vacante) => (
                    <div key={vacante.id} className={styles.vacante}>
                        <h3 style={{color: '#E87DD6'}}>{vacante.titulo}</h3>
                        <p style={{fontSize: '14px'}}><strong>{vacante.empresa?.nombre}</strong></p>
                        <br />
                        <p>Descripción</p>
                        <p style={{fontSize: '14px'}}>{vacante.descripcion}</p>
                        <br />
                        <p>Requisitos</p>
                        <p style={{fontSize: '14px'}}>{vacante.requisitos}</p>
                        <br />
                        <p>Datos adicionales</p>
                        <div style={{width : 'auto' , display:'flex' , gap:'30px' , padding:'5px'}}>
                            <p>
                                {vacante.genero}
                            </p>

                            <p>
                                {vacante.modalidad}
                            </p>

                            <p>
                                {vacante.tiempo}
                            </p>
                        </div>
                        <br />
                        <Button onClick={() => postulacion(vacante.id)} className={styles.button_secondary}>
                            Postularse
                        </Button>
                    </div>
                )) : <p>No se encontraron vacantes con esos filtros.</p>}
            </div>
            {children}
        </>
    )
}