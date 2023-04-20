import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SuccessModal from '../../modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import { getMarchamos, insertarFicheros, getPremios } from '../../../services/axiosService';


const SeriesEnJuego = ({ idInterno, sorteo, fiscalizador, fecha, hora }) => {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [marchamos, setMarchamos] = useState([]);
    const [series, setSeries] = useState([]);
    const [premios, setPremios] = useState([]);

    const initialValues = {
        ser_numeros_o_f: '',
        ser_premios_marchamos: '',
        marchamo1: '',
        marchamo2: '',
        marchamo3: '',
        marchamo4: '',
        no_juegan1: '',
        no_juegan2: '',
        no_juegan3: '',
        no_juegan4: '',
        ser_cant_juegan: '',
        ser_cant_no_juegan: '',
        ser_custodiado: '',
        premio_total: '',
        observaciones: '',
        hora: '',
        ser_firma: '',
        bolita_leyenda: ''
    };


    async function getDatos() {
        try {
            const response = await getMarchamos();

            const filteredData = response.data.filter(
                (item) => item.idSorteo === idInterno && item.tipo === 'Cierre' && item.tipoMarchamo !== 'Serie').map((item) => item.numeroMarchamo);

            const series = response.data.filter(
                (item) => item.idSorteo === idInterno && item.tipo === 'Cierre' && item.tipoMarchamo === 'Serie').map((item) => item.numeroMarchamo);
            setMarchamos(filteredData);
            setSeries(series);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo cargar los datos de Serie en Juego');
            setShowSuccessModal(true);
        }
    }

    async function getPremioLoteria() {
        try {
            const response = await getPremios();
            console.log(response.data);
            const filteredData = response.data.filter((item) => item.idPlan === 1);
            console.log(filteredData);
            setPremios(filteredData);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo cargar los premios');
            setShowSuccessModal(true);
        }
    }

    useEffect(() => {
        getPremioLoteria();
    }, []);

    useEffect(() => {
        getDatos();
    }, []);

    const handleerror = (value) => {
        let error;
        if (!value) {
            error = 'Campo requerido';
        }
        return error;
    };

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/');      // Redirect to the next page
    }

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            await insertarFicheros(values);
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
                        <Field
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
                        <Field
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
    function cargarTabla(premios) {
        let tablaHtml = '<table class="table table-bordered table-responsive">';
        tablaHtml += '<thead><tr><th>Cantidad</th><th>Premio</th></tr></thead>';
        tablaHtml += '<tbody>';

        // Cargar filas de la tabla con los valores del vector de premios
        premios.forEach((premio) => {
            tablaHtml += `<tr><td>1</td><td>${premio.montoUnitario}</td></tr>`;
        });

        tablaHtml += '</tbody>';

        // Calcular y cargar el valor total del premio
        const totalPremio = premios.reduce((total, premio) => total + premio.montoUnitario, 0);

        tablaHtml += '<tfoot><tr>';
        tablaHtml += `<td>Total</td><td><input type="text" class="inp" name="premio_total" placeholder="¢${totalPremio}"></td>`;
        tablaHtml += '</tr></tfoot></table>';

        // Agregar la tabla al elemento HTML deseado (por ejemplo, el elemento con ID "tablaPremios")
        document.getElementById('tablaPremios').innerHTML = tablaHtml;
    }


    //<h5>Se cuenta además con la presencia de las siguientes personas:</h5>
    //<Field component="textarea" name="detalles" className="inp" rows="4" cols="50" />
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
                <br />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, values }) => (
                        <Form>

                            <label >
                                <h5>Números de marchamos utilizados en la custodia del sorteo anterior:</h5>
                            </label>

                            <table className='table table-bordered table-responsive'>
                                {
                                    [
                                        {
                                            // eslint-disable-next-line no-useless-concat
                                            title: 'Series:', value: series.length === 2 ? series[0] + ' ' + ' ' + series[1] : series[0]
                                        },
                                        { title: 'Números:', value: marchamos[0] },
                                        { title: 'Premios:', value: marchamos[1] },
                                        { title: 'Premio Acumulado Fichero:', value: marchamos[2] },
                                        { title: 'Tula:', value: marchamos[3] },
                                    ].map((item) => (
                                        <tbody>
                                            <tr key={item.title}>
                                                <td>{item.title}</td>
                                                <td>{item.value}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
                            <label >
                                <h5>Números de marchamos utilizados en la custodia de los ficheros:</h5>
                            </label>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Números ordenados y fiscalizados: Del 00 al 99 Marchamo N° JPS-SLT-N-</td>
                                        <td><Field className="inp" type="text" name="ser_numeros_o_f" placeholder="______________" validate={handleerror} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} {...errors.ser_numeros_o_f && touched.ser_numeros_o_f ?
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="ser_numeros_o_f" />
                                            </div>
                                            : null}
                                        ></Field></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Premios Marchamo N° JPS-SLT-P-</td>
                                        <td><Field className="inp" type="text" name="ser_premios_marchamos" placeholder="______________" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} required title="Campo requerido"></Field></td>
                                    </tr>
                                </tbody>
                            </table>
                            {cargarTabla(premios)}
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
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Total de series que juegan</td>
                                        <td><Field className="inp" type="text" name="ser_cant_juegan" placeholder="______________" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Total de series que no juegan</td>
                                        <td><Field className="inp" type="text" name="ser_cant_no_juegan" placeholder="______________" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Custodiadas con marchamo N° JPS-SLT-S- </td>
                                        <td><Field className="inp" type="text" name="ser_custodiado" placeholder="______________" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                            <label for="observaciones">Observaciones adicionales:</label>
                            <br />
                            <Field component="textarea" id="observaciones" className="inp" name="observaciones"></Field>
                            <br />

                            <table className="table table-bordered align-middle">
                                <tbody>
                                    <tr>
                                        <td>Hora de finalización Auditorio</td>
                                        <td><Field type="time" name="hora" className="inp"></Field></td>
                                    </tr>
                                    <tr>
                                        <td>Firma de auditor fiscalizador</td>
                                        <td><Field type="text" name="ser_firma" className="inp" placeholder="____________________"></Field></td>
                                    </tr>
                                    <tr>
                                        <td>Bolita con la leyenda</td>
                                        <td><Field name="bolita_leyenda" type="text" className="inp" placeholder="____________"></Field></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="btn" >Enviar
                            </button>
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
};

export default SeriesEnJuego;