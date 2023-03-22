import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getUltimoTomofolio, postTomoFolio } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';


const Tomo = ({ idInterno }) => {

    const [tomo, setTomo] = useState(1);
    const [folio, setFolio] = useState(1);
    const [tomoActual, setTomoActual] = useState(1);
    const [folioActual, setFolioActual] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const initialValues = {
        tomo: tomoActual,
        folio: folioActual
    }

    async function getTomoFolio() {
        console.log(idInterno);
        const response = await getUltimoTomofolio(idInterno);
        let tom = response.data.tomo;
        let fol = response.data.folio;
        setTomo(tom);
        setFolio(fol);
    }

    const addTomoActual = () => {
        setTomoActual(tomoActual + 1);
    }

    const addFolioActual = () => {
        if (folioActual < 254) {
            setFolioActual(folioActual + 1);
        } else {
            setFolioActual(2);
            addTomoActual();
        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
      }
 
    //Get Tomo and Folio from DB when component is mounted
    useEffect(() => {
        getTomoFolio();
    }, []);

    //Set Tomo and Folio Actual when Tomo and Folio are changed
    useEffect(() => {
        setTomoActual(tomo);
        setFolioActual(folio + 1);
    }, [tomo, folio]);


    return (
        <>

            <div className="container-fluid">
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        const data = {
                            "tomo": tomoActual,
                            "folio": folioActual,
                            "idDatoSorteo": idInterno,
                            "estado": "Activo"
                        }
                        postTomoFolio(data)
                            .then(response => {
                                if (response.status === 200) {
                                    setTitulo('Operación exitosa');
                                    setMensaje('Datos de tomo y folio guardados exitosamente');
                                    setShowSuccessModal(true);
                                    //@TODO: Redirect to home page
                                }
                            }
                            )
                            .catch(error => {
                                setTitulo('Operación fallida');
                                setMensaje('No se pudo guardar los datos de tomo y folio');
                                setShowSuccessModal(true);
                            });

                    }}>
                    {({ errors, touched }) => (
                        <Form>
                            <table className='table table-bordered align-middle' id="tabla">
                                <thead className='thead-dark'>
                                    <tr>
                                        <th colSpan={4}>Tomo y folio</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>Anterior</th>
                                        <th colSpan={2}>Actual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <label htmlFor="tomo">Tomo: </label>
                                            <Field
                                                name="tomo"
                                                type="number"
                                                id="tomo"
                                                className="inputTomo"
                                                value={tomo}
                                                disabled />
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folio">Folio: </label>
                                            <Field
                                                name="folio"
                                                type="number"
                                                id="folio"
                                                className="inputFolio"
                                                value={folio}
                                                disabled />
                                        </td>
                                        <td>
                                            <label htmlFor="tomo">Tomo: </label>
                                            <Field
                                                name="tomoActual"
                                                type="number"
                                                id="tomoActual"
                                                className="inputTomo"
                                                value={tomoActual}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addTomoActual}>+</button>
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folio">Folio: </label>
                                            <Field
                                                name="folioActual"
                                                type="number"
                                                id="folioActual"
                                                className="inputFolio"
                                                value={folioActual}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addFolioActual}>+</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <button
                                                type='submit'
                                                name='Guardar'
                                                className='btn btn-primary'>Guardar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
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

Tomo.propTypes = {
    idInterno: PropTypes.number.isRequired
}

export default Tomo;