import React, { useState, useEffect } from 'react'
import './../../../styles/Escrutinio.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getEscrutinio } from '../../../services/axiosService';
import { insertarEscrutinio } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';

const Escrutinio = ({ tipoLoteria, idSorteo }) => {

    const [datos, setDatos] = React.useState('');
    const [checked, setChecked] = React.useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [checked2, setChecked2] = React.useState(false);
    const [datos2, setDatos2] = React.useState();
    const [idInterno, setIdInterno] = React.useState(0);

    const navigate = useNavigate();

    const handleCheck = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (isChecked) {
            setChecked(false);
            setChecked2(false);
        }
        else {
            setChecked(true);
        }
    }

    const handleCheck2 = (e) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (isChecked) {
            setChecked2(true);
        }
        else {
            setChecked2(false);
        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate(navigateTo());
    }

    const navigateTo = () => {
        switch (tipoLoteria) {
            case 'LTT':
                return ('/TomoFolio');
            case 'NT':
                return ('/TomoFolio');
            case '3M':
                return ('/TomoFolio');
            case 'LN':  //@TODO: Cambiar si se hace una pagina para loteria nacional
                return ('/TomoFolio');
            case 'LP':
                return ('/TomoFolio');
            default:
                return ('/ChooseLottery');
        }
    }

    const manejarCambiodatos = (e) => {
        const value = e.target.value;
        const formattedValue = value ? parseFloat(value).toLocaleString('es-ES').replace(/,/g, '.') : '';
        setDatos2(formattedValue);
    }

    const getDatos = async () => {
        try {
            const response = await getEscrutinio(idSorteo);
            setDatos(response.data.escrutinio);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar los datos de escrutinio');
            setShowSuccessModal(true);
        }
    }

    const handleerror = (value) => {
        let error;
        if (!value) {
            error = 'Campo requerido';
        }
        return error;
    };

    const handleSubmit = async () => {
        try {
            if (!checked) {
                await insertarEscrutinio(idInterno, datos);
            } else {
                const numberWithoutDots = Number(datos2.replace(/\./g, ''));
                await insertarEscrutinio(idInterno, numberWithoutDots);
            }
            setTitulo('Operación exitosa');
            setMensaje('Datos de escrutinio guardados correctamente');
            setShowSuccessModal(true);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar los datos de Escrutinio');
            setShowSuccessModal(true);
        }
    }

    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        const lottery = JSON.parse(sessionStorage.getItem('lottery'));
        setIdInterno(lottery?.idInterno);
        if (!usuario) {
            sessionStorage.clear();
            navigate('/');
        }
        getDatos();
    }, [navigate]);

    const initialValues = {
        montoTotal: '',
        montoNuevo: ''
    };

    const formattedDatos = datos ? datos.toLocaleString('es-ES').replace(/,/g, '.') : '';
    const formattedDatos2 = datos2 ? datos2.toLocaleString('es-ES').replace(/,/g, '.') : '';
    return (
        <>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            < section className="escrutinio">
                                <hr />
                                <h4>Monto total:</h4>
                                <h4>₡ {formattedDatos}</h4>

                                <h5>¿Es correcto?</h5>
                                <input className="check" onChange={handleCheck} type="checkbox" name="nombre" id="nombre" />
                                {checked && <span className="required-message">Debes marcar esta opción caso de que el monto sea correcto</span>}

                                <hr />
                                <br />

                                {checked ?
                                    <div>
                                        <label>
                                            <h5>En caso de error digite el monto correcto: </h5>
                                            <input className="check" onChange={handleCheck2} type="checkbox" name="edita" id="edita" />
                                            <br />
                                            {!checked2 && <span className="required-message">Marcar solamente en caso de que el monto sea incorrecto</span>}
                                        </label>
                                        <br />
                                        <br />
                                        {checked2 ?
                                            <div>
                                                <h4>Nuevo Monto:</h4>
                                                <h4>₡ {formattedDatos2}</h4>
                                                <Field className="lbl1" name='montoNuevo' placeholder='Digite el monto' disabled={!checked2} validate={handleerror} onInput={manejarCambiodatos} type="text"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />
                                                {errors.montoNuevo && touched.montoNuevo ?
                                                    <div style={{ color: 'red' }}>
                                                        <ErrorMessage name="montoNuevo" />
                                                    </div>
                                                    : null}
                                                <div>
                                                    <br />
                                                    <button type="submit" className="btn">Aceptar</button>
                                                </div>
                                            </div>
                                            : <div></div>}
                                    </div> :
                                    <div>
                                        <button type="submit" className="btn">Aceptar</button>
                                    </div>
                                }
                            </section>
                        </Form>
                    )}
                </Formik>
            </div >
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
        </>
    );
}

export default Escrutinio;