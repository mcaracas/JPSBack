import React, { useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { postResultadosElectronica } from '../../../services/axiosService';
import PropTypes from 'prop-types'
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';


const ResultadosLotto = ({ numSorteo, idInterno }) => {

    const navigate = useNavigate();

    const numeroRef = useRef("");

    const [resultados, setResultados] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
		const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
	});

    const agregarResultado = (values) => {
        setResultados([...resultados, {
            numero: values.numero.value
        }]);
    }

    const removeFields = (index) => {
        let data = [...resultados];
        data.splice(index, 1);
        setResultados(data);
    }

    const validateNumber = (numero) => {
        //If the number is empty
        if (!numero) {
            return 'El número es requerido';
        }
        //If the given input is not a number
        else if (isNaN(numero)) {
            return 'El resultado debe ser un número';
        }
        //If the number has more or less than 2 digits
        else if (numero.length !== 2) {
            return 'El número debe tener 2 dígitos';
        }
        //If the number is not between 0 and 40
        else if (numero < 0 || numero > 40) {
            return 'El número debe estar entre 0 y 40';
        }
        //If the number is already in the list
        for (let i = 0; i < resultados.length; i++) {
            if (resultados[i].numero === numero) {
                return 'El número ya se encuentra registrado';
            }
        }
        //If there are 5 numbers already
        if (resultados.length === 5) {
            return 'Ya se han registrado los 5 números';
        }

        return '';
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
    }

    async function handleSubmit() {
        try {
            const promises = resultados.map(async (resultado) => {
                const data = {
                    "IdDatoSorteo": idInterno,
                    "NumeroPremioPlan": null,
                    "NumFavorecido": resultado.numero.replace(/'/g, '"'),
                    "Verificado": false,
                    "VerificaAcumulado": false
                };

                const response = await postResultadosElectronica(data);
                return response;
            });

            await Promise.all(promises);

            // Display success message to the user
            setTitulo('Operación exitosa');
            setMensaje('Resultados ingresados correctamente');
            setShowSuccessModal(true);
            // Reload the page
            //window.location.reload();

        } catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudieron ingresar los resultados');
            setShowSuccessModal(true);
        }
    }

    return (
        <>

            <div className="container">
                <Formik
                    initialValues={{
                        numero: ""
                    }}
                    onSubmit={(values, { resetForm }) => {

                        agregarResultado({ numero: numeroRef.current })
                        resetForm({ numero: "" });

                    }}
                >
                    {({ errors, touched }) => (
                        <div className="container-fluid">
                            <Form >
                                <div className="row">
                                    <table className="table table-bordered align-middle mt-5 col">
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>Resultados del Sorteo de Lotto No. {numSorteo}
                                                    <br /> Números favorecidos</th>
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
                                                        autoFocus
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
                                                                type='submit'
                                                                className='btn btn-success'>
                                                                Agregar Resultado
                                                            </button>
                                                        </div>}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <table className='table align-middle mt-5 col'>
                                        <thead>
                                            <tr>
                                                <th colSpan={3}>Resultados Agregados</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Número</th>
                                            </tr>
                                            {resultados.map((resultado, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{resultado.numero}</td>
                                                        <td>
                                                            <div className="container">
                                                                <div className="row justify-content-center">
                                                                    <div className="col-12 col-md-6 d-flex justify-content-end align-items-start">
                                                                        <i className='bi bi-x-square-fill closeX' onClick={() => removeFields(index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <th>
                                                    <div className='container'>
                                                        <div className='row justify-content-center'>
                                                            {resultados.length === 5 ?
                                                                <div className='button-field col-2 ms-3 '>
                                                                    <button
                                                                        type='submit'
                                                                        className='btn btn-success'
                                                                        onClick={handleSubmit}
                                                                    >
                                                                        Guardar Resultados
                                                                    </button>
                                                                </div> :
                                                                <div className='button-field col-2 ms-3 '>
                                                                    <button
                                                                        type='button'
                                                                        className='btn btn-success'
                                                                        disabled> Guardar Resultados
                                                                    </button>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Form>
                        </div>
                    )}
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

ResultadosLotto.propTypes = {
    numSorteo: PropTypes.number.isRequired,
    idInterno: PropTypes.number.isRequired
}

export default ResultadosLotto;
