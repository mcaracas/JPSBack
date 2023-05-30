import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import SuccessModal from '../../modals/SuccessModal';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { getVentas, insertaVentas } from '../../../services/axiosService';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CompararVentas = ({ idSorteo }) => {

    const [montoVentas, setMontoVentas] = useState(0);
    const [montoPagar, setMontoPagar] = useState(0);

    const [montoVentasCorregido, setMontoVentasCorregido] = useState(0);
    const [montoPagarCorregido, setMontoPagarCorregido] = useState(0);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });
    const navigate = useNavigate();

    const initialValues = {
        montoVentas: montoVentas,
        montoPagar: montoPagar,
        confirmar: false
    }

    const handleError = (value) => {
        if (!value) {
            return "Debe ingresar un monto";
        } else if (value < 0) {
            return "El monto no puede ser negativo";
        } else if (isNaN(value)) {
            return "El monto debe ser un número";
        }
    }

    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
        getVentas(idSorteo)
            .then(response => {
                setMontoVentas(response.data.montoVentas);
                setMontoPagar(response.data.montoComprado);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleChangeMontoPagar = (e) => {
        setMontoPagarCorregido(e.target.value);
    }

    const handleChangeMontoVentas = (e) => {
        setMontoVentasCorregido(e.target.value);
    }

    const handleSubmit = (values) => {
        if (!values.confirmar) {    // If the checkbox is not checked
            const data = {
                idSorteo: idSorteo,
                montoVentas: values.montoVentasCorregido,
                montoComprado: values.montoPagarCorregido
            }

            console.log("Data: ", data);
            setShowLoadingModal(true);
            insertaVentas(data)
                .then(response => {
                    setShowLoadingModal(false);
                    if (response.status === 200) {  //if the response is 200
                        setTitulo('Operación exitosa');
                        setMensaje('Datos de ventas guardados correctamente');
                        setShowSuccessModal(true);
                    }
                })
                .catch(error => {
                    setShowLoadingModal(false);
                    setTitulo('Operación fallida');
                    setMensaje('No se pudieron guardar los datos de ventas');
                    setShowFailModal(true);
                });
        }
        else {  // If the checkbox is checked
            const data = {
                idSorteo: idSorteo,
                montoVentas: montoVentas,
                montoComprado: montoPagar
            }
            setShowLoadingModal(true);
            insertaVentas(data)
                .then(response => {
                    setShowLoadingModal(false);
                    if (response.status === 200) {  //if the response is 200
                        setTitulo('Operación exitosa');
                        setMensaje('Datos de ventas guardados correctamente');
                        setShowSuccessModal(true);
                    }
                })
                .catch(error => {
                    setShowLoadingModal(false);
                    setTitulo('Operación fallida');
                    setMensaje('No se pudieron guardar los datos de ventas');
                    setShowFailModal(true);
                });

        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        // Navigate to the next page
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



    return (
        <>
            <div className='card' style={{
                width: '70%',
                margin: 'auto',
                padding: '10px',
            }}>
                <div className='card-body'>
                    <h5 className='card-title'>Informe de ventas generado por la administración</h5>
                    <br></br>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={
                            async (values) => {
                                await handleShowConfirmation(() => handleSubmit(values));
                            }
                        }>
                        {({ values, errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="montoVentas">Monto de ventas: </label>
                                    <Field
                                        name="montoVentas"
                                        type="number"
                                        id="montoVentas"
                                        className="form-control-sm"
                                        placeholder="Monto de ventas"
                                        value={montoVentas}
                                        disabled
                                        style={{
                                            background: "none",
                                            border: "none"
                                        }}
                                    />

                                    <br></br><br></br>
                                    <label htmlFor="montoPagar">Monto a pagar: </label>
                                    <Field
                                        name="montoPagar"
                                        type="number"
                                        id="montoPagar"
                                        className="form-control-sm"
                                        placeholder="Monto a pagar"
                                        value={montoPagar}
                                        disabled
                                        style={{
                                            background: "none",
                                            border: "none"
                                        }}
                                    />

                                    <br></br><br></br>
                                    <p className="card-subtitle text-muted">¿Son correctos estos montos?</p>
                                    <Field
                                        name="confirmar"
                                        type="checkbox"
                                        id="confirmar"
                                        className="form-check-input"
                                    />
                                    {values.confirmar ?
                                        <div>
                                            <br></br>
                                            <button
                                                type="submit"
                                                className="btn btn-primary">
                                                Guardar
                                            </button>
                                        </div> :
                                        <div>
                                            <br></br>
                                            <p className='card-subtitle mb-2 text-muted'>
                                                Ingrese los montos correctos:
                                            </p>

                                            <label htmlFor="montoVentasCorregido">Monto de ventas: </label>
                                            <Field
                                                name="montoVentasCorregido"
                                                type="number"
                                                id="montoVentasCorregido"
                                                className="form-control-sm inp"
                                                placeholder="Monto de ventas"
                                                //onChange={handleChangeMontoVentas}
                                                validate={handleError}
                                                style={{
                                                    width: "40%"
                                                }}
                                            />
                                            {errors.montoVentasCorregido && touched.montoVentasCorregido ?
                                                <div style={{ color: "red" }}>
                                                    <ErrorMessage name="montoVentasCorregido" />
                                                </div>
                                                : null}

                                            <br></br><br></br>
                                            <label htmlFor="montoPagarCorregido">Monto a pagar: </label>
                                            <Field
                                                name="montoPagarCorregido"
                                                type="number"
                                                id="montoPagarCorregido"
                                                className="form-control-sm inp"
                                                placeholder="Monto a pagar"
                                                //onChange={handleChangeMontoPagar}
                                                validate={handleError}
                                                style={{
                                                    width: "40%"
                                                }}
                                            />
                                            {errors.montoPagarCorregido && touched.montoPagarCorregido ?
                                                <div style={{ color: "red" }}>
                                                    <ErrorMessage name="montoPagarCorregido" />
                                                </div>
                                                : null}

                                            {values.montoVentasCorregido && values.montoPagarCorregido ?
                                                <div>
                                                    <br></br>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary">
                                                        Guardar
                                                    </button>
                                                </div> : null}
                                        </div>
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando Ventas'
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
                mensaje='¿Está seguro que desea registrar las ventas?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
}

CompararVentas.propTypes = {
    idSorteo: PropTypes.number.isRequired
}

export default CompararVentas;
