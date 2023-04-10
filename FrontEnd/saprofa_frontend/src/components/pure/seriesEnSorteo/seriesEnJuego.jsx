import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';


const SeriesEnJuego = ({ sorteo, fiscalizador, fecha, hora }) => {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const initialValues = {

    };

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/');      // Redirect to the next page
    }

    const handleSubmit = async (values) => {
        try {
            //await actaFiscalizacion(values);
            setTitulo('Operación exitosa');
            setMensaje('series en juego guardadas exitosamente');
            setShowSuccessModal(true);
        } catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo guardar las series en juego');
            setShowSuccessModal(true);
        }
    };

    function generateRows() {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            const start = i * 250;
            const end = start + 249;
            rows.push(
                <tr key={i}>
                    <td>{`${start} - ${end}`}</td>
                    <td>
                        JPS-SLT-S-
                        <input
                            className="inp"
                            type="text"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            name={`marchamo${i + 1}`}
                            placeholder="___________________"
                        />
                    </td>
                    <td>
                        <input
                            className="inp"
                            type="text"
                            name={`no_juegan${i + 1}`}
                            placeholder="________________________________________"
                        />
                    </td>
                </tr>
            );
        }
        return rows;
    }


    return (
        <>
            <div className="fiscalizacion-containerS">
                <div className="fiscalizacion-header">
                    <b>JUNTA DE PROTECCION SOCIAL</b>
                    <br />
                    <b>AUDITORÍA INTERNA</b>
                    <br />
                    <b>FISCALIZACION DEL ARMADO DE FICHEROS</b>
                    <br />
                    <b>SORTEO: {sorteo}</b>
                    <br />
                    <b>{fecha}</b>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <h5>Se cuenta además con la presencia de las siguientes personas:</h5>
                        <Field component="textarea" name="detalles" className="inp" rows="4" cols="50" />
                        <label >
                            <h5>Números de marchamos utilizados en la custodia del sorteo anterior:</h5>
                        </label>

                        <table className='table table-bordered align-middle'>
                            {[{ title: 'Series:', value: 'JPS-SLT-S-0003942 JPS-SLT-S-0003943' }, { title: 'Números:', value: 'JPS-SLT-N-0001790' }, { title: 'Premios:', value: 'JPS-SLT-P-0000690' }, { title: 'Premio Acumulado Fichero:', value: 'JPS-OTROS-0002088' }, { title: 'Tula:', value: 'JPS-OTROS-0002089' },].map((item) => (
                                <tr key={item.title}>
                                    <td>{item.title}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </table>
                        <label >
                            <h5>Números de marchamos utilizados en la custodia de los ficheros:</h5>
                        </label>
                        <tr>
                            <td>Números ordenados y fiscalizados: Del 00 al 99 Marchamo N° JPS-SLT-N-</td>
                            <td><input className="inp" type="text" name="ser_numeros" placeholder="______________"></input></td>
                        </tr>
                        <tr>
                            <td>Premios Marchamo N° JPS-SLT-P-</td>
                            <td><input className="inp" type="text" name="ser_premios" placeholder="______________"></input></td>
                        </tr>
                        <br />
                        <table className="table table-bordered align-middle">
                            <thead>
                                <tr>
                                    <th>Series De la/ A la</th>
                                    <th>Marchamo N°</th>
                                    <th>Series que no juegan en cada urna</th>
                                </tr>
                            </thead>
                            <tbody>{generateRows()}</tbody>
                        </table>
                        <tr>
                            <td>Total de series que juegan</td>
                            <td><input className="inp" type="text" name="ser_juegan" placeholder="______________" /></td>
                        </tr>
                        <tr>
                            <td>Total de series que no juegan</td>
                            <td><input className="inp" type="text" name="ser_no_juegan" placeholder="______________" /></td>
                        </tr>
                        <tr>
                            <td>Custodiadas con marchamo N° JPS-SLT-S- </td>
                            <td><input className="inp" type="text" name="ser_no_juegan2" placeholder="______________" /></td>
                        </tr>
                    </Form>
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
};

export default SeriesEnJuego;