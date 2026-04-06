import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import api from "../api/axios"
import { TrophyIcon } from "@heroicons/react/16/solid"

export default function MisRecomendaciones() {
    const location = useLocation()
    const userId = location.state?.user?.alumnoId;
    console.log(userId)
    
    const [recomendaciones, setRecomendaciones] = useState([])

    useEffect(() => {
   
      
            const fetchRecomendaciones = async () => {
                try {
                
                    const response = await api.get(`/misRecomendaciones/${userId}`)
                    setRecomendaciones(response.data.recomendaciones)
                    console.log(response.data.recomendaciones.mensaje)
                } catch (error) {
                    console.error("Error al obtener recomendaciones:", error)
                }
            }

            fetchRecomendaciones()
        
    }, [userId])

    return (
        <>
            <h1>Mis Recomendaciones</h1>

            <br />

            <div style={{ 
                width: '100%', 
                maxHeight: '70vh', 
                padding: '1rem', 

                overflowY: 'scroll' 
            }}>
                {recomendaciones.length > 0 ? (
                    recomendaciones.map((reco) => (
                        <div key={reco.id} style={{ 
                            backgroundColor: 'var(--background-card)', 
                            margin: '10px 0', 
                            padding: '10px', 
                            borderRadius: '8px',
                            color: 'white',
                            gap : '15px',
                            display : 'flex',
                            alignItems : 'center'
                            
                        }}>
                            <div style={{width : '35px' , height : '35px' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                                <TrophyIcon style={{color : '#FFD700'}}></TrophyIcon>
                            </div>

                            <div style={{display : 'flex' , flexDirection : 'column' , gap : '10px'}}>
                                <p><strong>Instructor :</strong> {reco.instructor_info.usuarios.nombre} {reco.instructor_info.usuarios.apellido_p} {reco.instructor_info.usuarios.apellido_m}</p>
                                <p><strong>Comentario:</strong> {reco.comentario}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'white' }}>No hay recomendaciones disponibles ...</p>
                )}
            </div>
        </>
    )
}