import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getUltimoTomofolio, postTomoFolio } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../modals/LoadingModal';
import FailModal from '../../modals/FailModal';
import ConfirmationModal from '../../modals/ConfirmationModal';


const Tomo = ({ idInterno }) => {

    const [tomo, setTomo] = useState(1);
    const [folio, setFolio] = useState(1);
    const [tomoActual, setTomoActual] = useState(1);

    const [folioActual, setFolioActual] = useState(1);
    const [folioActual2, setFolioActual2] = useState(1);
    const [folioActual3, setFolioActual3] = useState(1);
    const [folioActual4, setFolioActual4] = useState(1);
    const [folioActual5, setFolioActual5] = useState(1);

    //Modals
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });

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
        //folioActual cant be greater than folioActual2
        if (folioActual < folioActual2 - 1) {
            if (folioActual < 254) {
                setFolioActual(folioActual + 1);
            } else {
                setFolioActual(2);
                addTomoActual();
            }
        } else {
            setFolioActual(folioActual + 1);
            addFolioActual2();

        }
    }

    const addFolioActual2 = () => {
        if (folioActual2 < folioActual3 - 1) {
            if (folioActual2 < 254) {
                setFolioActual2(folioActual2 + 1);
            } else {
                setFolioActual2(2);
                addFolioActual();
            }
        } else {
            setFolioActual2(folioActual2 + 1);
            addFolioActual3();
        }
    }

    const addFolioActual3 = () => {
        if (folioActual3 < folioActual4 - 1) {
            if (folioActual3 < 254) {
                setFolioActual3(folioActual3 + 1);
            } else {
                setFolioActual3(3);
                addFolioActual2();
            }
        } else {
            setFolioActual3(folioActual3 + 1);
            addFolioActual4();
        }
    }

    const addFolioActual4 = () => {
        if (folioActual4 < folioActual5 - 1) {
            if (folioActual4 < 254) {
                setFolioActual4(folioActual4 + 1);
            } else {
                setFolioActual4(4);
                addFolioActual3();
            }
        } else {
            setFolioActual4(folioActual4 + 1);
            addFolioActual5();
        }
    }

    const addFolioActual5 = () => {
        if (folioActual5 < 254) {
            setFolioActual5(folioActual5 + 1);
        } else {
            setFolioActual5(5);
            addFolioActual4();
        }
    }

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



    //Get Tomo and Folio from DB when component is mounted
    useEffect(() => {
        getTomoFolio();
    }, []);

    //Set Tomo and Folio Actual when Tomo and Folio are changed
    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if (!usuario) {
            sessionStorage.clear();
            navigate('/');
        }
        setTomoActual(tomo);
        setFolioActual(folio + 1);
        setFolioActual2(folio + 2);
        setFolioActual3(folio + 3);
        setFolioActual4(folio + 4);
        setFolioActual5(folio + 5);
    }, [tomo, folio]);

    const handleSubmit = async (values) => {
        try {
            const data = {
                "tomo": tomoActual,
                "folio": folioActual,
                "idDatoSorteo": idInterno,
                "estado": "Activo"
            }
            const data2 = {
                "tomo": tomoActual,
                "folio": folioActual2,
                "idDatoSorteo": idInterno,
                "estado": "Activo"
            }
            const data3 = {
                "tomo": tomoActual,
                "folio": folioActual3,
                "idDatoSorteo": idInterno,
                "estado": "Activo"
            }
            const data4 = {
                "tomo": tomoActual,
                "folio": folioActual4,
                "idDatoSorteo": idInterno,
                "estado": "Activo"
            }
            const data5 = {
                "tomo": tomoActual,
                "folio": folioActual5,
                "idDatoSorteo": idInterno,
                "estado": "Activo"
            }

            setShowLoadingModal(true);
            const response = await postTomoFolio(data);
            const response2 = await postTomoFolio(data2);
            const response3 = await postTomoFolio(data3);
            const response4 = await postTomoFolio(data4);
            const response5 = await postTomoFolio(data5);
            setShowLoadingModal(false);
            if (response.status === 200 && response2.status === 200 && response3.status === 200 && response4.status === 200 && response5.status === 200) {
                setShowSuccessModal(true);
                setTitulo('¡Operación Exitosa!');
                setMensaje('Se guardaron los datos correctamente');
            } else {
                setShowFailModal(true);
                setTitulo('¡Operación Fallida!');
                setMensaje('No se pudieron guardar los datos');
            }
        } catch (error) {
            setShowLoadingModal(false);
            setShowFailModal(true);
            setTitulo('¡Operación Fallida!');
            setMensaje(`No se pudo guardar el tomo y folio. ${error.message}`);
        }
    }

    return (
        <>

            <div className="container-fluid">
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        await handleShowConfirmation(() => handleSubmit(values));
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
                                            <label htmlFor="folio">Folio 1: </label>
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
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folioActual2">Folio 2: </label>
                                            <Field
                                                name="folioActual2"
                                                type="number"
                                                id="folioActual2"
                                                className="inputFolio"
                                                value={folioActual2}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addFolioActual2}>+</button>
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folioActual3">Folio 3: </label>
                                            <Field
                                                name="folioActual3"
                                                type="number"
                                                id="folioActual3"
                                                className="inputFolio"
                                                value={folioActual3}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addFolioActual3}>+</button>
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folioActual4">Folio 4: </label>
                                            <Field
                                                name="folioActual4"
                                                type="number"
                                                id="folioActual4"
                                                className="inputFolio"
                                                value={folioActual4}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addFolioActual4}>+</button>
                                            <br></br>
                                            <br></br>
                                            <label htmlFor="folioActual5">Folio 5: </label>
                                            <Field
                                                name="folioActual5"
                                                type="number"
                                                id="folioActual5"
                                                className="inputFolio"
                                                value={folioActual5}
                                                disabled />
                                            <button
                                                type='button'
                                                id='btnAgregar'
                                                onClick={addFolioActual5}>+</button>

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
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando tomo y folios'
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
                mensaje='¿Está seguro que desea registrar el tomo y los folios?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
}

Tomo.propTypes = {
    idInterno: PropTypes.number.isRequired
}

export default Tomo;