import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import React from 'react'
import './VerificaMontosAcumulados.scss'
import { getMontoAcumulado } from '../../services/axiosService';
import { insertaMontoAcumulado } from '../../services/axiosService';

const VerificaMontosAcumulados = () => {
    const [datos, setDatos] = React.useState();
React.useEffect(() => {
    getMontoAcumulado().then( Response => {
        if(Response.status === 200){
        setDatos(Response.data) }
        else{
         throw new Error('No se obtuvieron los datos');}
    }).catch(error => alert(`Algo salió mal: ${error}`))

}, [datos]);


    const [checked, setChecked] = React.useState(false);
    
    const handleCheck = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if(isChecked ){
            setChecked(true);
        }
            else {
            setChecked(false);
        }
    }
    
    
    
    const onAceptar = (e) => {
        insertaMontoAcumulado(datos);
     }
     const manejarCambiodatos = (e) => {
        setDatos(e.target.value)
     }
    
      return (
        <div>
            <section className="verificaAcumulado">
            <EncabezadoFranjas title= {"Verificar monto de acumulado"}></EncabezadoFranjas>       
                <hr/>
                <h5>Monto acumulado:</h5>
                {datos}
                <br />
                <br />
                <h6>¿Es correcto?</h6>
                <input className="check" onChange= {handleCheck} type="checkbox" name="nombre" id="nombre" />
                <hr/>
                <h6>En caso de error digite el monto correcto</h6>
                <input className="lbl" disabled={checked? "disabled" : ""} onChange={manejarCambiodatos} type="text" />
                <br />
                <button className="boton" disabled={!checked && checked? "disabled" : ""} onClick={onAceptar}>Aceptar</button>
            </section>
    
        </div>
      )
    }
    
    export default VerificaMontosAcumulados
    