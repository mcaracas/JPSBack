import React, { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const ResultadosLotto = () => {

    const numeroRef = useRef('');

    const [resultados, setResultados] = useState([]);

    const agregarResultado = (values) => {
        console.log('resultados:', resultados);
        setResultados([...resultados, {
            numero: values.numero.value
        }]);
    }

    const validateNumber = (numero) => {
        if (!numero) {
            return 'El número es requerido';
        }
        else if (isNaN(numero)) {
            return 'El número debe ser un número';
        }
        else if (numero.length !== 2) {
            return 'El número debe tener 2 dígitos';
        }
        else if (numero < 0 || numero > 40 ) {
            return 'El número debe estar entre 0 y 40';
        }
        return '';
    }

    return (
        <div className="container">
            <Formik
                initialValues={{
                    numero: ''
                }}
                onSubmit={(values) => {
                    console.log('values:', values);
                }}
            >
                {({ errors, touched }) => (
                    <div className="container-fluid">
                        <Form>
                            <div className="row">
                                <table className="table table-bordered align-middle mt-5 col">
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Resultados del Sorteo<br /> Números favorecidos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <label htmlFor="numero">Número</label>
                                                <Field
                                                    id="numero"
                                                    name="numero"
                                                    type="text"
                                                    className="form-control input-form-control"
                                                    validate={validateNumber}
                                                    innerRef={numeroRef}
                                                />
                                                <ErrorMessage name="numero" component={() => {
                                                    return (
                                                        <div className="error">{errors.numero}</div>
                                                    )
                                                }} />
                                            </th>
                                            <th>
                                                {touched.numero && errors.numero ?
                                                    //Disabled button
                                                    <div className='button-field col-2 ms-3 '>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'
                                                            disabled> Agregar Resultado
                                                        </button>
                                                    </div> :
                                                    <div className='button-field col-2 ms-3 '>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'
                                                            onClick={() => 
                                                                agregarResultado({numero: numeroRef.current})
                                                            }
                                                        >
                                                            Agregar Resultado
                                                        </button>
                                                    </div>}
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div >
    );
}

export default ResultadosLotto;
