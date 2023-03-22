import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';



const Tomo = ({ idInterno }) => {

    const [tomo, setTomo] = useState(1);
    const [folio, setFolio] = useState(1);
    const [tomoActual, setTomoActual] = useState(1);
    const [folioActual, setFolioActual] = useState(1);

    const initialValues = {
        tomo: '',
        folio: ''
    }

    async function getTomoFolio() {
        // const response = await getTomoFolio(idInterno);
        // console.log("Datos: ", response);
        setTomo(8);
        setFolio(97);
        setTomoActual(tomo);
        setFolioActual(folio+1);
    }

    const addTomoActual = () => {
        //@TODO: When tomoActual updates, set folioActual to 2
        setTomoActual(tomoActual + 1);
    }

    const addFolioActual = () => {
        //@TODO: Set a maximum value for folioActual,
        // when it reaches it, add 1 to tomoActual and set folioActual to 2
        setFolioActual(folioActual + 1);
    }

    //When the page is loaded, get tomo and folio
    useEffect(() => {
        setTomo(8);
        setFolio(97);
    }, []);

    //when tomo y folio are set, set tomoActual and folioActual
    useEffect(() => {
        setTomoActual(tomo);
        setFolioActual(folio+1);
    }, [tomo, folio]);


    return (
        <div className="container-fluid">
            <Formik
                initialValues={{}}
            >
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
                            </tbody>
                        </table>
                    </Form>
                )}

            </Formik>
        </div>
    );
}

Tomo.propTypes = {
    idInterno: PropTypes.number.isRequired
}

export default Tomo;


//DELETE
{/* <div className='container'>
                            <div className='row' id="contSorteo">
                                <div className='row' id="fila">
                                    <div className='col align-self-start'>
                                        <b>Tomo y folio de sorteo anterior</b><br></br>
                                        <div className='row '>
                                            <label htmlFor="tomo">Tomo: </label>
                                            <Field
                                                name="tomo"
                                                type="number"
                                                id="tomo"
                                                className="inputTomo"
                                                value={1}
                                                disabled />
                                            <label htmlFor="folio">Folio: </label>
                                            <Field
                                                name="folio"
                                                type="number"
                                                id="folio"
                                                className="inputFolio"
                                                value={1}
                                                disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col align-self-start'>
                                    <b>Tomo y folio de sorteo actual</b><br></br>
                                        <div className='w-50 p-3'>
                                            <label htmlFor="tomo">Tomo: </label>
                                            <Field
                                                name="tomo"
                                                type="number"
                                                id="tomo"
                                                className="inputTomo"
                                                value={1}
                                                disabled />
                                            <label htmlFor="folio">Folio: </label>
                                            <Field
                                                name="folio"
                                                type="number"
                                                id="folio"
                                                className="inputFolio"
                                                value={1}
                                                disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}