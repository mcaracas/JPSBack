import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { actaFiscalizacion } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import Reportes from '../reportes/reportes';
import { getEmailSorteo } from '../../../services/axiosService';
import LoadingModal from '../../modals/LoadingModal';
import FailModal from '../../modals/FailModal';
import ConfirmationModal from '../../modals/ConfirmationModal';


const ConclusionesFiscalizacion = ({ sorteo, fiscalizador, fecha, idSorteo }) => {
    //Modals
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });


    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if (!usuario) {
            sessionStorage.clear();
            navigate('/');
        }
    });

    const initialValues = {
        procesosConformeEstablecido: true,
        otrasObservaciones: '',
        detalles: '',
        recomendaciones: true,
        resultadosSorteo: ''
    };

    const handleerror = (value) => {
        let error;
        if (!value) {
            error = 'Campo requerido';
        }
        return error;
    };

    //Modal functions
    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/ListaChequeo');
    }

    function handleCloseFailModal() {
        setShowFailModal(false);
    }

    const handleConfirmation = async (confirmed) => {
        if (!confirmed) {
            setShowConfirmation(false);
            return;
        }
        await confirmationAction();
        setShowConfirmation(false);
    }

    const handleShowConfirmation = async (action) => {
        setShowConfirmation(true);
        setConfirmationAction(() => () => {
            action();
        });
    }

    const handleSubmit = async (values) => {
        try {
            setShowLoadingModal(true);
            await actaFiscalizacion(values, idSorteo);
            await getEmailSorteo(idSorteo);
            setShowLoadingModal(false);
            setTitulo('Operación exitosa');
            setMensaje('Conclusiones y recomendaciones guardados exitosamente, se generó el acta de fiscalización y se envió al correo ');
            setShowSuccessModal(true);
        } catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar las conclusiones y recomendaciones');
            setShowSuccessModal(true);
        }
    };

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/ChooseLottery');
    }

    return (
        <>
            <div className="fiscalizacion-container">
                <div className="fiscalizacion-header">
                    <b>AUDITORÍA INTERNA</b>
                    <br />
                    <b>ACTA DE FISCALIZACIÓN</b>
                    <br />
                    <b>SORTEO: {sorteo}</b>
                    <br />
                    <b>{fecha}</b>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={
                        async (values) => {
                            await handleShowConfirmation(() => handleSubmit(values));
                        }
                    }
                >
                    {({ isSubmitting, errors, touched, values }) => (
                        <Form>
                            <h5>Conclusiones de la fiscalización</h5>
                            <label>
                                Los procesos se realizaron conforme lo establecido:
                                <Field type="checkbox" name="procesosConformeEstablecido" />
                            </label>
                            <label>
                                Otras:
                                {values.procesosConformeEstablecido ? <Field type="text" className="inp" name="otrasObservaciones" disabled /> :
                                    <div><Field type="text" name="otrasObservaciones" className="inp" validate={handleerror} />
                                        {errors.otrasObservaciones && touched.otrasObservaciones ?
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="otrasObservaciones" />
                                            </div>
                                            : null}
                                    </div>}
                            </label>
                            <h5>Detallar:</h5>
                            <label>
                                {values.procesosConformeEstablecido ? <Field component="textarea" className="inp" name="detalles" rows="4" cols="50" disabled /> :
                                    <div>
                                        <Field component="textarea" name="detalles" className="inp" rows="4" cols="50" validate={handleerror} />
                                        {errors.detalles && touched.detalles ?
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="detalles" />
                                            </div>
                                            : null}
                                    </div>}
                            </label>
                            <h5>Recomendaciones de la fiscalización</h5>
                            <label>
                                Ninguna
                                <Field type="checkbox" name="recomendaciones" />
                            </label>
                            <label>
                                Los resultados evidenciados en el sorteo serán analizados para ser eventualmente valorados en la formulación de un oficio de advertencia/asesoría o bien un informe de auditoría
                                {values.recomendaciones ? <Field component="textarea" name="resultadosSorteo" className="inp" rows="4" cols="50" disabled /> :
                                    <div>
                                        <Field component="textarea" name="resultadosSorteo" className="inp" rows="4" cols="50" validate={handleerror} />
                                        {errors.resultadosSorteo && touched.resultadosSorteo ?
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="resultadosSorteo" />
                                            </div>
                                            : null}
                                    </div>}
                            </label>

                            <h5>Marcas de Auditoría:</h5>
                            <ul>
                                <li>
                                    <label>
                                        √ Cotejado con el documento
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        N/A: No aplica
                                    </label>
                                </li>
                            </ul>
                            <u>{fiscalizador}</u>
                            <p>Fiscalizador de la Auditoría Interna</p>

                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Guardar'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando conclusiones y recomendaciones'
                mensaje='Por favor espere...'
            />
            <FailModal
                show={showFailModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseFailModal}
            />
            <ConfirmationModal
                show={showConfirmation}
                titulo='Confirmación'
                mensaje='¿Está seguro que desea finalizar?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
};

export default ConclusionesFiscalizacion;