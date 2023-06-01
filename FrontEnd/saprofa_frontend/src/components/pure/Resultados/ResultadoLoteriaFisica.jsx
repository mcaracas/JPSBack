import React, { useState, useRef, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import { insertarPremios } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import { useNavigate } from 'react-router-dom';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const idPlanPremios = lottery?.planPremios;
const idDatoSorteo = lottery?.idInterno;


const ResultadoLoteriaFisica = ({ idSorteo, planPremiosProp }) => {
    const [tipoPremio, setTipoPremio] = useState(planPremiosProp[0].descripcion);
    const [indexPremio, setIndexPremio] = useState(0);
    const [numeroResultado, setNumeroResultado] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [datosEnviados, setDatosEnviados] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [numFavorecido, setNumFavorecido] = useState('');
    const [seriePremio, setSeriePremio] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });
    const [planPremios, setPlanPremios] = useState(planPremiosProp);
    const navigate = useNavigate();
    const numFavorecidoRef = useRef(null);
    const seriePremioRef = useRef(null);


    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
    }

    const handleConfirmation = async (confirmed) => {
        if (!confirmed) {
            setShowConfirmation(false);
            return;
        }
        await confirmationAction();
        setShowConfirmation(false);
    }

    function handleCloseFailModal() {
        setShowFailModal(false);
    }

    const handleShowConfirmation = async (action) => {
        setShowConfirmation(true);
        setConfirmationAction(() => () => {
            action();
        });
    }

    const handleTipoPremio = (event) => {
        const selectedIndex = event.target.selectedIndex;
        setIndexPremio(selectedIndex);
        setTipoPremio(planPremios[selectedIndex].descripcion);
        console.log("tipoPremio: ", tipoPremio, "\nindexPremio: ", indexPremio)
    };

    const [resultados, setResultados] = useState([]);
    const [resultado, setResultado] = useState({
        numeroResultado,
        numPremioPlan: idPlanPremios,
        idDatoSorteo,
        numFavorecido,
        seriePremio,
        tipoResultado: tipoPremio,
        verificado: true, //TODO: change this to the real data
        verificaAcumulado: true, //TODO: change this to the real data
        idDatoSorteoNavigation: null,
        numPremioPlanNavigation: null,
    });

    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if (!usuario) {
            sessionStorage.clear();
            navigate('/');
        }
        setResultado((prevResultado) => ({
            ...prevResultado,
            numFavorecido: numFavorecidoRef.current.value,
            seriePremio: seriePremioRef.current.value,
        }));
    }, [numFavorecido, seriePremio]);

    const formRef = useRef(null);

    const obtenerResultadoAdminitracion = async (id) => {
        try {
            // const response = await getPremioFromAdministracion(id);
            // const datos = response.data;
            // setResultado({
            //     ...datos,
            //     numFavorecido: datos.numFavorecido.toString(),
            //     seriePremio: datos.seriePremio.toString(),
            //     tipoResultado: datos.tipoResultado,
            // });
            //TODO: change this to the real data
            setNumFavorecido('72');
            setSeriePremio('999');
            setResultado((prevResultado) => ({
                ...prevResultado,
                numFavorecido: '72',
                seriePremio: '999',
                tipoResultado: tipoPremio,
            }));
            if (resultado) {
                const formValues = {
                    numFavorecido: resultado.numFavorecido,
                    seriePremio: resultado.seriePremio,
                    tipoResultado: tipoPremio,
                };
                formRef.current.values.numFavorecido = resultado.numFavorecido.toString();
                formRef.current.values.seriePremio = resultado.seriePremio.toString();
            }
        } catch (error) {
            setDatosEnviados(false);
            setTitulo('¡Error!');
            setMensaje(error);
            setShowSuccessModal(true);
        }
    };

    const reducirCantidadPremio = (indexPremio) => {
        console.log("indexPremio: ", indexPremio)
        console.log("premio: ", planPremios[indexPremio]);
        console.log("descripcion: ", planPremios[indexPremio].descripcion);
        const updatedPlanPremios = [...planPremios];
        const cant = updatedPlanPremios[indexPremio].cantidadPremios;
        if (cant === 1) {
            updatedPlanPremios.splice(indexPremio, 1);
            // si el premio es el ultimo de la lista, se selecciona al inicio
            if (indexPremio === updatedPlanPremios.length) {
                setIndexPremio(0);
                setTipoPremio(updatedPlanPremios[0].descripcion);
            } else {
                //se actualizan los valores despues de eliminar el premio del dropdown
                setIndexPremio(indexPremio);
                setTipoPremio(updatedPlanPremios[indexPremio].descripcion);
            }
        } else {
            updatedPlanPremios[indexPremio] = {
                ...updatedPlanPremios[indexPremio],
                cantidadPremios: cant - 1,
            };
        }

        setPlanPremios(updatedPlanPremios);
    };

    const agregarResultado = (resultado) => {
        const numberValidation = validateNumber(numFavorecido);
        const serieValidation = validateSerie(seriePremio);
        if ((numberValidation !== '' || serieValidation !== '')) {
            setDatosEnviados(false);
            setTitulo('¡Error!');
            setMensaje(`${serieValidation}!\n${numberValidation}!`);
            setShowSuccessModal(true);
            return;
        }
        reducirCantidadPremio(indexPremio);
        setResultados([...resultados, {
            numeroResultado,
            numPremioPlan: idPlanPremios,
            idDatoSorteo,
            numFavorecido: formRef.current.values.numFavorecido.toString(),
            seriePremio: formRef.current.values.seriePremio.toString(),
            verificado: true, //TODO: change this to the real data
            verificaAcumulado: true, //TODO: change this to the real data
            tipoResultado: tipoPremio,
            idDatoSorteoNavigation: null,
            numPremioPlanNavigation: null,
        }]);
        setNumeroResultado(numeroResultado + 1);
    }

    const changeResultNumber = (index) => {
        const newResultados = [...resultados];
        for (let i = index; i < newResultados.length; i++) {
            newResultados[i].numeroResultado = i;
        }
        setResultados(newResultados);
        setNumeroResultado(numeroResultado - 1);
    }
    const removeFields = (index) => {
        handleShowConfirmation(() => {
            let data = [...resultados];
            data.splice(index, 1);
            changeResultNumber(index);
            setResultados(data);
        });
    }

    const handleSubmit = async (values) => {
        try {
            const response = await insertarPremios(resultados);
            if (resultados.length === 0) {
                setMensaje("No se han agregado resultados");
                setTitulo("¡Operación Fallida!");
                setShowSuccessModal(true);
                return;
            }
            if (response.status === 200) {
                setMensaje("Datos de Resultados guardados exitosamente");
                setTitulo("¡Operación Exitosa!");
                setDatosEnviados(true);
                setShowSuccessModal(true);
            } else {
                console.log('error');
            }
        } catch (error) {
            setShowLoadingModal(false);
            setMensaje(`Error al Registrar los resultados. ${error.message}`);
            setTitulo("¡Operación Fallida!");
            setDatosEnviados(false);
            setShowFailModal(true);
        }
    }

    const validateSerie = (seriePremio) => {
        setSeriePremio(seriePremio);
        if (!seriePremio || seriePremio === '') {
            return 'La serie es requerida';
        }
        else if (isNaN(seriePremio)) {
            return 'La serie debe ser un número';
        }
        else if (seriePremio.length !== 3) {
            return 'La serie debe tener 3 dígitos';
        }
        return '';
    }

    const validateNumber = (numFavorecido) => {
        setNumFavorecido(numFavorecido);
        if (!numFavorecido || numFavorecido === '') {
            return 'El número es requerido';
        }
        else if (isNaN(numFavorecido)) {
            return 'El número debe ser un número';
        }
        else if (numFavorecido.length !== 2) {
            return 'El número debe tener 2 dígitos';
        }
        return '';
    }

    return (
        <>
            <div className='container'>
                <Formik
                    initialValues={resultado}
                    innerRef={formRef}
                    onSubmit={
                        async () => {
                            await handleShowConfirmation(() => handleSubmit(resultados));
                        }
                    }
                >
                    {({ errors, isSubmitting, isValidating }) => (
                        <div className='container-fluid'>
                            <Form>
                                <div className='row'>
                                    <div className='col-10'>
                                        <table className='table table-bordered align-middle mt-5 col'>
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>Resultados del Sorteo<br /> Números favorecidos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <label htmlFor='seriePremio'>Serie</label>
                                                        <Field
                                                            id='seriePremio'
                                                            name='seriePremio'
                                                            type='text'
                                                            className='form-control input-form-control'
                                                            innerRef={seriePremioRef}
                                                            validate={validateSerie}
                                                        />
                                                        <ErrorMessage name='seriePremio' component={() => {
                                                            return (
                                                                <div className='error'>{errors.seriePremio}</div>
                                                            )
                                                        }} />
                                                    </th>
                                                    <th>
                                                        <label htmlFor='numFavorecido'>Número</label>
                                                        <Field
                                                            id='numFavorecido'
                                                            name='numFavorecido'
                                                            type='text'
                                                            className='form-control input-form-control'
                                                            innerRef={numFavorecidoRef}
                                                            validate={validateNumber}
                                                        />
                                                        <ErrorMessage name='numFavorecido' component={() => {
                                                            return (
                                                                <div className='error'>{errors.numFavorecido}</div>
                                                            )
                                                        }} />
                                                    </th>
                                                    <td className='col-4'>
                                                        <select className="form-select form-select-sm" onClick={handleTipoPremio}>
                                                            {planPremios.map((planPremio) => (
                                                                <option
                                                                    value={planPremio.MontoUnitario}
                                                                    key={planPremio.numPremio}
                                                                >
                                                                    {planPremio.descripcion} ({planPremio.cantidadPremios})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-2'>
                                        <div className='button-field col-1 mt-5 '>
                                            <button
                                                type='button'
                                                className='btn btn-success'
                                                onClick={() => obtenerResultadoAdminitracion(numeroResultado)}
                                            >
                                                Obtener Resultado
                                            </button>
                                        </div>
                                        <div className='button-field col-1 mt-5 '>
                                            <button
                                                type='button'
                                                className='btn btn-success'
                                                onClick={() => agregarResultado(resultado)}
                                            >
                                                Agregar Resultado
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='button-field'>
                                    <button type="submit" className='btn' disabled={isSubmitting || isValidating || datosEnviados} >Registrar Resultados</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
                <div className='mb-5' style={{ height: '400px', overflowY: 'auto' }}>
                    <table className='table align-middle mt-5 col'>
                        <thead>
                            <tr>
                                <th colSpan={4}>Resultados Agregados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Numero Resultado</th>
                                <th>Serie</th>
                                <th>Número</th>
                                <th>Tipo de Premio</th>
                            </tr>
                            {resultados.map((resultado, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='col-1'>{resultado.numeroResultado}</td>
                                        <td>{resultado.seriePremio}</td>
                                        <td>{resultado.numFavorecido}</td>
                                        <td>
                                            <div className="container m-auto">
                                                <div className="row justify-content-center">
                                                    <div className="m-auto col-10">
                                                        {/* TODO: add the real premio */}
                                                        {resultado.tipoResultado}
                                                    </div>
                                                    <div className="col-1">
                                                        <i className='bi bi-x-square-fill closeX' onClick={() => removeFields(index)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
            <ConfirmationModal
                show={showConfirmation}
                titulo='Confirmación'
                mensaje='¿Está seguro que desea eliminar el resultado?'
                handleConfirmation={handleConfirmation}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando Datos de Participantes'
                mensaje='Por favor espere...'
            />
            <FailModal
                show={showFailModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseFailModal}
            />
        </>
    );
}

export default ResultadoLoteriaFisica;
