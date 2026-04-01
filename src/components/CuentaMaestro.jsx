import { useLocation } from "react-router-dom"
import { Aside } from "./Aside"


export default function  CuentaMaestro(){
    const location = useLocation()
    const maestroInfo = location.state?.maestro


    return(
        <>
            <div style={{width : '100%' , height: '50vh' , backgroundColor : 'red'}}>
                    <h1>{maestroInfo.mensaje}</h1>
            </div>
        </>
    )
}