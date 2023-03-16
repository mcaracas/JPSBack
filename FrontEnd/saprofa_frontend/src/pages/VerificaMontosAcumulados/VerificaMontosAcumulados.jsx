import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import React from 'react'

const VerificaMontosAcumulados = () => {
    const [datos, setDatos] = React.useState("Probando");
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
        console.log(datos);
     }
     const manejarCambiodatos = (e) => {
        setDatos(e.target.value)
     }
    
      return (
        <div>
            <section className="cierreApuestas">
            <EncabezadoFranjas title= {"Cierre de las apuestas"}></EncabezadoFranjas>       
                <hr/>
                <h5>Monto total:</h5>
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
    