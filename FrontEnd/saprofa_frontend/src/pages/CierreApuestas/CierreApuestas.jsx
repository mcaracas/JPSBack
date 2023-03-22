import React from 'react'
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import '../CierreApuestas/CierreApuestas.scss';
import { Formik, Form } from 'formik';
import { getCierreApuestas, insertarApuestas } from '../../services/axiosService';
import { useEffect } from 'react';

const CierreApuestas = () => {

    const [datos, setDatos] = React.useState();
    const [checked, setChecked] = React.useState(false);

    const handleCheck = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (isChecked) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }
     
    useEffect(() => {
        getCierreApuestas('123456').then(res => {
          if(res.status === 200){
            setDatos(res.data)
          }else{
            throw new Error("No se pudo obtener los datos")
          }
        }).catch(err => {
          alert(`Algo salió mal: ${err}`);
        })
      }, [])


    const initialValues = {
        monto: ' '
    }

    const handleSubmit = async () => {
        try {
            await insertarApuestas(datos);
            alert("Se ha cerrado las apuestas");
        }
        catch (error) {
            console.log(error);
        }
    };

    const manejarCambiodatos = (e) => {
        setDatos(e.target.value)
    }

    return (
        <div>
            <section className="cierreApuestas">
                <EncabezadoFranjas title={"Cierre de las apuestas"}></EncabezadoFranjas>
                <hr />
                <h5>Monto total:</h5>
                {datos}
                <br />
                <br />
                <h6>¿Es correcto?</h6>
                <input className="check" onChange={handleCheck} type="checkbox" name="nombre" id="nombre" />
                <hr />
                <h6>En caso de error digite el monto correcto</h6>
                <input className="lbl" disabled={checked ? "disabled" : ""} onChange={manejarCambiodatos} type="text" />
                <br />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <button type="submit" className="boton" disabled={!checked && checked ? "disabled" : ""}>Aceptar
                        </button>
                    </Form>
                </Formik>
            </section>
        </div>
    )
}

export default CierreApuestas