import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SuccessModal from '../../modals/SuccessModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { getMarchamos, insertarFicheros } from '../../../services/axiosService';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";

const SeriesEnJuego = ({ idInterno, sorteo, fiscalizador, fecha, tipoLoteria }) => {


    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [marchamos, setMarchamos] = useState([]);
    const [series, setSeries] = useState([]);
    const [premios, setPremios] = useState([]);
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const fechaSorteo = lottery?.fechaHora;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });


    function handleCloseFailModal() {
        setShowFailModal(false);
    }
    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/');      // Redirect to the next page
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
        ser_cant_juegan: 0,
        ser_cant_no_juegan: 0,
        ser_custodiado: '',
        premio_total: 0,
        observaciones: '',
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


    const handleSubmit = async (values) => {
        try {
            console.log(values);
            //add property to object
            values.hora = fechaSorteo;
            values.ser_firma = fiscalizador;
            values.id_sorteo = idInterno;
            values.premio_total = premios.reduce((a, b) => a + (b['montoUnitario'] || 0), 0);
            const response = await insertarFicheros(values);
            if (response.status === 200) {
                setShowLoadingModal(false);
                setTitulo('¡Operación Exitosa!');
                setMensaje('series en juego guardadas exitosamente');
                setShowSuccessModal(true);
            }
            else {
                setShowLoadingModal(false);
            }
        } catch (error) {
            setShowLoadingModal(false);
            setTitulo('¡Operación Fallida!');
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
                            onKeyPress={(event) => {
                                if (!/[0-9,]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            name={`no_juegan${i + 1}`}
                            placeholder="________________________________________"
                        />
                        <span style={{ color: 'gray', fontSize: '12px' }}>
                            Ingrese los números separados por coma (por ejemplo: {start}, {end})
                        </span>
                    </td>
                </tr>
            );
        }
        return rows;
    }

    function MiTabla() {
        const [seriesInput, setSeriesInput] = useState(
            series.length === 2 ? series[0] + " " + " " + series[1] : series[0]
        );
        const [marchamosInput, setMarchamosInput] = useState(marchamos);
        const [editingEnabled, setEditingEnabled] = useState(false);

        const onEnableEditing = () => {
            setEditingEnabled(true);
        };

        const onDisableEditing = () => {
            setEditingEnabled(false);
        };

        return (
            <div>
                <table className="table table-bordered table-responsive">
                    {[
                        { title: "Series:", value: seriesInput },
                        { title: "Números:", value: marchamosInput[0] },
                        { title: "Premios:", value: marchamosInput[1] },
                        {
                            title: "Premio Acumulado Fichero:",
                            value: marchamosInput[2],
                        },
                        { title: "Tula:", value: marchamosInput[3] },
                    ].map((item) => (
                        <tbody key={item.title}>
                            <tr>
                                <td>{item.title}</td>
                                <td
                                    contentEditable={editingEnabled && item.title !== ""}
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => {
                                        if (item.title === "Series:") {
                                            setSeriesInput(e.target.innerText);
                                        } else {
                                            // Copiamos el array de marchamos y actualizamos el valor correspondiente
                                            const newMarchamos = [...marchamosInput];
                                            newMarchamos[
                                                item.title === "Números:"
                                                    ? 0
                                                    : item.title === "Premios:"
                                                        ? 1
                                                        : item.title === "Premio Acumulado Fichero:"
                                                            ? 2
                                                            : 3
                                            ] = e.target.innerText;
                                            setMarchamosInput(newMarchamos);
                                        }
                                    }}
                                >
                                    {item.value}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {editingEnabled ? (
                    <button className="btn" onClick={onDisableEditing}>Guardar cambios</button>
                ) : (
                    <button className="btn" onClick={onEnableEditing}>Editar</button>
                )}
            </div>
        );
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
                <br />
                <Formik
                    initialValues={initialValues}
                    onSubmit={
                        async (values) => {
                            await handleShowConfirmation(() => handleSubmit(values));
                        }}
                >
                    {({ isSubmitting, errors, touched, values }) => (
                        <Form>

                            <label >
                                <h5>Números de marchamos utilizados en la custodia del sorteo anterior:</h5>
                            </label>
                            <div>
                                <MiTabla series={series} marchamos={marchamos} />
                            </div>
                            <br />
                            <label >
                                <h5>Números de marchamos utilizados en la custodia de los ficheros:</h5>
                            </label>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Números ordenados y fiscalizados: Del 00 al 99 Marchamo N° JPS-SLT-N-</td>
                                        <td><Field className="inp" type="text" name="ser_numeros_o_f" placeholder="______________" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} validate={handleerror} /> {errors.ser_numeros_o_f && touched.ser_numeros_o_f ?
                                            <div style={{ color: "red" }}><ErrorMessage name="ser_numeros_o_f" /></div> : null}
                                        </td>
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
                                        }} validate={handleerror} /> {errors.ser_premios_marchamos && touched.ser_premios_marchamos ?
                                            <div style={{ color: "red" }}><ErrorMessage name="ser_premios_marchamos" /></div> : null}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                        }} />
                                        </td>
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
                                        }} />
                                        </td>
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
                                        }} validate={handleerror} />{errors.ser_custodiado && touched.ser_custodiado ? <div style={{ color: "red" }}><ErrorMessage name="ser_custodiado" /></div> : null}
                                        </td>
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
                                        <td>Firma de auditor fiscalizador</td>
                                        <td>
                                            <Field type="text" name="ser_firma" className="inp" value={fiscalizador} placeholder="____________________" />
                                            {errors.ser_firma && touched.ser_firma && fiscalizador === null ? <div style={{ color: "red" }}><ErrorMessage name="ser_firma" /></div> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bolita con la leyenda</td>
                                        <td><Field name="bolita_leyenda" type="text" className="inp" placeholder="____________" />
                                        </td>
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
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando series en juego'
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
                mensaje='¿Está seguro que desea registrar las series en juego guardadas?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
};

export default SeriesEnJuego;