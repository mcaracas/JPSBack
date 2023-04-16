import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import SuccessModal from '../../modals/SuccessModal';

const CompararVentas = () => {

    const [montoVentas, setMontoVentas] = useState(0);
    const [montoPagar, setMontoPagar] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');

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


    const handleSubmit = (values) => {
        if (!values.confirmar) {    // If the checkbox is not checked
            console.log("Datos corregidos: ", values);

            //if the response is 200
            setTitulo('Operación exitosa');
            setMensaje('Datos de ventas guardados correctamente');
            setShowSuccessModal(true);
        }
        else {  // If the checkbox is checked
            console.log("Datos vienen correctos: ", values);
        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
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
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
        </>
    );
}

export default CompararVentas;
