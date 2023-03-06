
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import React from 'react'
import './CierreApuestas.scss'

const CierreApuestas = () => {

const [datos, setDatos] = React.useState("Probando");
const [checked, setChecked] = React.useState(false);
const handleCheck = (e) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
    if(isChecked){
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
            <input onChange= {handleCheck} type="checkbox" name="nombre" id="nombre" />
            <hr/>
            {datos}
            <input disabled={checked? "disabled" : ""} onChange={manejarCambiodatos} type="text" />
            <button disabled={checked? "disabled" : ""} onClick={onAceptar}>Aceptar</button>
        </section>

    </div>
  )
}

export default CierreApuestas
