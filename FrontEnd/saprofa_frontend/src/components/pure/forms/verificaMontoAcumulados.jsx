import React, { useState, useEffect } from 'react'
import './../../../styles/VerificaMontosAcumulados.scss';
import { Formik, Form } from 'formik';
import { getMontoAcumulado } from '../../../services/axiosService';
import { insertaMontoAcumulado } from '../../../services/axiosService';
import SuccessModal from './../../modals/SuccessModal';

const VerificaMontosAcumulado = () => {

    const [datos, setDatos] = React.useState();
    const [checked, setChecked] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleCheck = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (isChecked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }

    const handleCheck2 = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (isChecked) {
            setChecked2(false);
        }
        else {
            setChecked2(true);
        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
    }

    const manejarCambiodatos = (e) => {
        const value = e.target.value;
        const formattedValue = value ? parseFloat(value).toLocaleString('es-ES').replace(/,/g, '.') : '';
        setDatos(formattedValue);
    }

    const getDatos = async () => {
        try {
            const response = getMontoAcumulado(); //response.data y ocupa el ID
            console.log(response); //response.data
            setDatos(response); //response.data
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar los datos de Acumulado');
            setShowSuccessModal(true);
        }
    }

    const handleSubmit = async () => {
        try {
            await insertaMontoAcumulado(datos);
            setTitulo('Operación exitosa');
            setMensaje('Acumulado guardado exitosamente');
            setShowSuccessModal(true);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar los datos de Acumulado');
            setShowSuccessModal(true);
        }
    }

    useEffect(() => {
        getDatos();
    }, []);

    const initialValues = {
        montoTotal: datos
    };

    const formattedDatos = datos ? datos.toLocaleString('es-ES').replace(/,/g, '.') : '';

    return (
        <>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <section className="verificaAcumulado">
                        <hr />
                        <h4>Monto total:</h4>
                        <h4>₡ {formattedDatos}</h4>
                        <div className="verificaAcumulado">
                            <h5>¿Es correcto?</h5>
                            <input className="check" onChange={handleCheck} type="checkbox" name="nombre" id="nombre" />
                            {checked && <span className="required-message">Debes marcar esta opción</span>}
                        </div>
                        <hr />
                        <label>
                            <h5>En caso de error digite el monto correcto: </h5>
                            <input className="check" onChange={handleCheck2} type="checkbox" name="edita" id="edita" />
                        </label>
                        <br />
                        <input className="lbl1" disabled={checked2} onChange={manejarCambiodatos} type="text"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <br />
                        <Form>
                            <button type="submit" className="btn" disabled={checked}>Aceptar
                            </button>
                        </Form>
                    </section>
                </Formik>
            </div>
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
        </>
    );
}

export default VerificaMontosAcumulado;