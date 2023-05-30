import React, { useState, useEffect } from 'react';
import { getListaChequeo, insertaProcedimiento } from '../../services/axiosService';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import SuccessModal from "../modals/SuccessModal";
import LoadingModal from "../modals/LoadingModal";
import FailModal from "../modals/FailModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';

const ListaChequeoPopular = ({ idDatoSorteo }) => {

    const [listaChequeo, setListaChequeo] = useState([]);
    const [listaChequeoFlag, setListaChequeoFlag] = useState(false);

    const [showPrevios, setShowPrevios] = useState(true);
    const [arrowUpPrevio, setArrowUpPrevio] = useState(false);

    const [showDurante, setShowDurante] = useState(true);
    const [arrowUpDurante, setArrowUpDurante] = useState(false);

    const [showDespues, setShowDespues] = useState(true);
    const [arrowUpDespues, setArrowUpDespues] = useState(false);

    const [listaChequeoPrevio, setListaChequeoPrevio] = useState([{}]);
    const [listaChequeoDurante, setListaChequeoDurante] = useState([{}]);
    const [listaChequeoDespues, setListaChequeoDespues] = useState([{}]);
    const [listaChequeoGeneracion, setListaChequeoGeneracion] = useState([{}]);
    const [listaChequeoSolicitud, setListaChequeoSolicitud] = useState([{}]);

    const [showGeneracion, setShowGeneracion] = useState(true);
    const [arrowUpGeneracion, setArrowUpGeneracion] = useState(false);

    const [showSolicitud, setShowSolicitud] = useState(true);
    const [arrowUpSolicitud, setArrowUpSolicitud] = useState(false);

    const [opciones, setOpciones] = useState(['Cumplido', 'Incumplido', 'N/A']);

    // MODALS
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });
    const navigate = useNavigate();


    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
        getListaChequeo(2)
            .then((res) => {
                setListaChequeo(res.data);
                setListaChequeoFlag(true);
            }
            );
    }, []);

    const initlistaChequeoPrevio = () => {
        const data = [];
        listaChequeo.procedimientosPrevios.forEach(element => {
            data.push({
                'IdDatoSorteo': idDatoSorteo,
                'IdChequeoDetalle': element.id,
                'Verificado': 'Cumplido'
            });
        });
        setListaChequeoPrevio(data);
    }

    const initlistaChequeoDurante = () => {
        const data = [];
        listaChequeo.procedimientosDurante.forEach(element => {
            data.push({
                'IdDatoSorteo': idDatoSorteo,
                'IdChequeoDetalle': element.id,
                'Verificado': 'Cumplido'
            });
        });
        setListaChequeoDurante(data);
    }

    const initlistaChequeoDespues = () => {
        const data = [];
        listaChequeo.procedimientosPosteriores.forEach(element => {
            data.push({
                'IdDatoSorteo': idDatoSorteo,
                'IdChequeoDetalle': element.id,
                'Verificado': 'Cumplido'
            });
        });
        setListaChequeoDespues(data);
    }

    const initlistaChequeoGeneracion = () => {
        const data = [];
        listaChequeo.procedimientosGeneracion.forEach(element => {
            data.push({
                'IdDatoSorteo': idDatoSorteo,
                'IdChequeoDetalle': element.id,
                'Verificado': 'Cumplido'
            });
        });
        setListaChequeoGeneracion(data);
    }

    const initlistaChequeoSolicitud = () => {
        const data = [];
        listaChequeo.procedimientosSolicitud.forEach(element => {
            data.push({
                'IdDatoSorteo': idDatoSorteo,
                'IdChequeoDetalle': element.id,
                'Verificado': 'Cumplido'
            });
        });
        setListaChequeoSolicitud(data);
    }

    useEffect(() => {
        if (listaChequeoFlag) {
            initlistaChequeoPrevio();
            initlistaChequeoDurante();
            initlistaChequeoDespues();
            initlistaChequeoGeneracion();
            initlistaChequeoSolicitud();
        }
    }, [listaChequeoFlag]);

    const handleShowPrevio = () => {
        setShowPrevios(!showPrevios);
        setArrowUpPrevio(!arrowUpPrevio);
    }

    const handleShowDurante = () => {
        setShowDurante(!showDurante);
        setArrowUpDurante(!arrowUpDurante);
    }

    const handleShowDespues = () => {
        setShowDespues(!showDespues);
        setArrowUpDespues(!arrowUpDespues);
    }

    const handleShowGeneracion = () => {
        setShowGeneracion(!showGeneracion);
        setArrowUpGeneracion(!arrowUpGeneracion);
    }

    const handleShowSolicitud = () => {
        setShowSolicitud(!showSolicitud);
        setArrowUpSolicitud(!arrowUpSolicitud);
    }

    const handlePrevioChangeStatus = (id, value) => {
        const data = {
            'IdDatoSorteo': idDatoSorteo,
            'IdChequeoDetalle': id,
            'Verificado': value
        }
        const index = listaChequeoPrevio.findIndex(x => x.IdChequeoDetalle === id);
        if (index > -1) {
            listaChequeoPrevio[index].Verificado = value;
            setListaChequeoPrevio(listaChequeoPrevio);
        } else {
            listaChequeoPrevio.push(data);
            setListaChequeoPrevio(listaChequeoPrevio);
        }
    }

    const handleDuranteChangeStatus = (id, value) => {
        const data = {
            'IdDatoSorteo': idDatoSorteo,
            'IdChequeoDetalle': id,
            'Verificado': value
        }
        const index = listaChequeoDurante.findIndex(x => x.IdChequeoDetalle === id);
        if (index > -1) {
            listaChequeoDurante[index].Verificado = value;
            setListaChequeoDurante(listaChequeoDurante);
        } else {
            listaChequeoDurante.push(data);
            setListaChequeoDurante(listaChequeoDurante);
        }
    }

    const handleDespuesChangeStatus = (id, value) => {
        const data = {
            'IdDatoSorteo': idDatoSorteo,
            'IdChequeoDetalle': id,
            'Verificado': value
        }
        const index = listaChequeoDespues.findIndex(x => x.IdChequeoDetalle === id);
        if (index > -1) {
            listaChequeoDespues[index].Verificado = value;
            setListaChequeoDespues(listaChequeoDespues);
        } else {
            listaChequeoDespues.push(data);
            setListaChequeoDespues(listaChequeoDespues);
        }
    }

    const handleGeneracionChangeStatus = (id, value) => {
        const data = {
            'IdDatoSorteo': idDatoSorteo,
            'IdChequeoDetalle': id,
            'Verificado': value
        }
        const index = listaChequeoGeneracion.findIndex(x => x.IdChequeoDetalle === id);
        if (index > -1) {
            listaChequeoGeneracion[index].Verificado = value;
            setListaChequeoGeneracion(listaChequeoGeneracion);
        } else {
            listaChequeoGeneracion.push(data);
            setListaChequeoGeneracion(listaChequeoGeneracion);
        }
    }

    const handleSolicitudChangeStatus = (id, value) => {
        const data = {
            'IdDatoSorteo': idDatoSorteo,
            'IdChequeoDetalle': id,
            'Verificado': value
        }
        const index = listaChequeoSolicitud.findIndex(x => x.IdChequeoDetalle === id);
        if (index > -1) {
            listaChequeoSolicitud[index].Verificado = value;
            setListaChequeoSolicitud(listaChequeoSolicitud);
        } else {
            listaChequeoSolicitud.push(data);
            setListaChequeoSolicitud(listaChequeoSolicitud);
        }
    }

    // MODALS
    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        const lottery = JSON.parse(sessionStorage.getItem("lottery"));
        const tipoSorteo = lottery?.tipoLoteria;

        if (tipoSorteo === "LTT") {
            navigate('/PruebasLotto');
        } else if (tipoSorteo === "NT") {
            navigate('/PruebasNuevosTiempos');
        } else if (tipoSorteo === "3M") {
            navigate('/Pruebas3M');
        } else if (tipoSorteo === "LN") {
            navigate('/MarchamoNacional');
        } else if (tipoSorteo === "LP") {
            navigate('/MarchamoPopular');
        }
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

    async function handleSubmit() {
        try {
            const promisesPrevio = listaChequeoPrevio.map(async (procedimiento) => {
                const response = await insertaProcedimiento(procedimiento);
                return response;
            });

            const promisesDurante = listaChequeoDurante.map(async (procedimiento) => {
                const response = await insertaProcedimiento(procedimiento);
                return response;
            });

            const promisesDespues = listaChequeoDespues.map(async (procedimiento) => {
                const response = await insertaProcedimiento(procedimiento);
                return response;
            });

            const promisesGeneracion = listaChequeoGeneracion.map(async (procedimiento) => {
                const response = await insertaProcedimiento(procedimiento);
                return response;
            });

            const promisesSolicitud = listaChequeoSolicitud.map(async (procedimiento) => {
                const response = await insertaProcedimiento(procedimiento);
                return response;
            });

            setShowLoadingModal(true);

            await Promise.all(promisesPrevio);
            await Promise.all(promisesDurante);
            await Promise.all(promisesDespues);
            await Promise.all(promisesGeneracion);
            await Promise.all(promisesSolicitud);
            setShowLoadingModal(false);

            setTitulo('Operación exitosa');
            setMensaje('Procedimientos ingresados correctamente');
            setShowSuccessModal(true);
        }
        catch (error) {
            setShowLoadingModal(false);
            setMensaje(`Error al guardar los procedimientos.\n ${error.message}`);
            setTitulo("¡Operación Fallida!");
            setShowFailModal(true);
        }

    }

    //@TODO: Procedimiento 1: Nombre de representantes

    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        listaChequeoPrevio: listaChequeoPrevio,
                        listaChequeoDurante: listaChequeoDurante,
                        listaChequeoDespues: listaChequeoDespues
                    }}
                    onSubmit={
                        async (values) => {
                            await handleShowConfirmation(() => handleSubmit());
                        }
                    }
                >
                    <Form>
                        <div className='card'
                            style={{
                                width: '80%',
                                margin: 'auto',
                                padding: '10px',
                            }}>
                            <div className='card-body'>
                                <h5 className='card-title'>Verificar procedimientos</h5>
                                <hr></hr>
                                <div className='row d-flex align-items-center'>
                                    <div className='col'>
                                        <h5 className='card-subtitle'>Previo al sorteo&nbsp;
                                            {arrowUpPrevio
                                                ? <i className="bi bi-caret-down-fill" onClick={handleShowPrevio}></i>
                                                : <i className="bi bi-caret-up-fill" onClick={handleShowPrevio}></i>
                                            }
                                        </h5>
                                    </div>
                                </div>
                                {showPrevios ?
                                    <div>
                                        <div className='card-text'>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>Número</th>
                                                        <th scope='col'>Procedimiento</th>
                                                        <th scope='col'>Realizado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listaChequeo.procedimientosPrevios ?
                                                        listaChequeo.procedimientosPrevios.map((procedimiento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope='row'>{procedimiento.orden}</th>
                                                                    <td>{procedimiento.descripcion}</td>
                                                                    <td>
                                                                        {listaChequeoPrevio.find(x => x.IdChequeoDetalle === procedimiento.id) ?
                                                                            <select className='form-select form-select-lg mb-3'
                                                                                name={procedimiento.id}
                                                                                onChange={(e) => handlePrevioChangeStatus(procedimiento.id, e.target.value)}
                                                                                style={{
                                                                                    width: 'auto',
                                                                                    height: 'auto',
                                                                                    fontSizeAdjust: '0.5',
                                                                                    fontSize: '0.9rem',
                                                                                }}>
                                                                                <option
                                                                                    value={listaChequeoPrevio.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                    defaultValue={listaChequeoPrevio.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}>
                                                                                    {listaChequeoPrevio.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                </option>
                                                                                {opciones.map((opcion, index) => {
                                                                                    if (opcion !== listaChequeoPrevio.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado) {
                                                                                        return (
                                                                                            <option value={opcion} key={index}>{opcion}</option>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null}
                                <hr></hr>
                                <div className='row d-flex align-items-center'>
                                    <div className='col'>
                                        <h5 className='card-subtitle'>Durante el sorteo&nbsp;
                                            {arrowUpDurante
                                                ? <i className="bi bi-caret-down-fill" onClick={handleShowDurante}></i>
                                                : <i className="bi bi-caret-up-fill" onClick={handleShowDurante}></i>
                                            }
                                        </h5>
                                    </div>
                                </div>
                                {showDurante ?
                                    <div>
                                        <div className='card-text'>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>Número</th>
                                                        <th scope='col'>Procedimiento</th>
                                                        <th scope='col'>Realizado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listaChequeo.procedimientosDurante ?
                                                        listaChequeo.procedimientosDurante.map((procedimiento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope='row'>{procedimiento.orden}</th>
                                                                    <td>{procedimiento.descripcion}</td>
                                                                    <td>
                                                                        {listaChequeoDurante.find(x => x.IdChequeoDetalle === procedimiento.id) ?
                                                                            <select className='form-select form-select-lg mb-3'
                                                                                name={procedimiento.id}
                                                                                onChange={(e) => handleDuranteChangeStatus(procedimiento.id, e.target.value)}
                                                                                style={{
                                                                                    width: 'auto',
                                                                                    height: 'auto',
                                                                                    fontSizeAdjust: '0.5',
                                                                                    fontSize: '0.9rem',
                                                                                }}>
                                                                                <option
                                                                                    value={listaChequeoDurante.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                    defaultValue={listaChequeoDurante.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}>
                                                                                    {listaChequeoDurante.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                </option>
                                                                                {opciones.map((opcion, index) => {
                                                                                    if (opcion !== listaChequeoDurante.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado) {
                                                                                        return (
                                                                                            <option value={opcion} key={index}>{opcion}</option>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null}
                                <hr></hr>
                                <div className='row d-flex align-items-center'>
                                    <div className='col'>
                                        <h5 className='card-subtitle'>Después del sorteo&nbsp;
                                            {arrowUpDespues
                                                ? <i className="bi bi-caret-down-fill" onClick={handleShowDespues}></i>
                                                : <i className="bi bi-caret-up-fill" onClick={handleShowDespues}></i>
                                            }
                                        </h5>
                                    </div>
                                </div>
                                {showDespues ?
                                    <div>
                                        <div className='card-text'>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>Número</th>
                                                        <th scope='col'>Procedimiento</th>
                                                        <th scope='col'>Realizado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listaChequeo.procedimientosPosteriores ?
                                                        listaChequeo.procedimientosPosteriores.map((procedimiento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope='row'>{procedimiento.orden}</th>
                                                                    <td>{procedimiento.descripcion}</td>
                                                                    <td>
                                                                        {listaChequeoDespues.find(x => x.IdChequeoDetalle === procedimiento.id) ?
                                                                            <select className='form-select form-select-lg mb-3'
                                                                                name={procedimiento.id}
                                                                                onChange={(e) => handleDespuesChangeStatus(procedimiento.id, e.target.value)}
                                                                                style={{
                                                                                    width: 'auto',
                                                                                    height: 'auto',
                                                                                    fontSizeAdjust: '0.5',
                                                                                    fontSize: '0.9rem',
                                                                                }}>
                                                                                <option
                                                                                    value={listaChequeoDespues.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                    defaultValue={listaChequeoDespues.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}>
                                                                                    {listaChequeoDespues.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                </option>
                                                                                {opciones.map((opcion, index) => {
                                                                                    if (opcion !== listaChequeoDespues.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado) {
                                                                                        return (
                                                                                            <option value={opcion} key={index}>{opcion}</option>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null}
                                <hr></hr>
                                <div className='row d-flex align-items-center'>
                                    <div className='col'>
                                        <h5 className='card-subtitle'>Generación de informes&nbsp;
                                            {arrowUpGeneracion
                                                ? <i className="bi bi-caret-down-fill" onClick={handleShowGeneracion}></i>
                                                : <i className="bi bi-caret-up-fill" onClick={handleShowGeneracion}></i>
                                            }
                                        </h5>
                                    </div>
                                </div>
                                {showGeneracion ?
                                    <div>
                                        <div className='card-text'>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>Número</th>
                                                        <th scope='col'>Procedimiento</th>
                                                        <th scope='col'>Realizado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listaChequeo.procedimientosGeneracion ?
                                                        listaChequeo.procedimientosGeneracion.map((procedimiento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope='row'>{procedimiento.orden}</th>
                                                                    <td>{procedimiento.descripcion}</td>
                                                                    <td>
                                                                        {listaChequeoGeneracion.find(x => x.IdChequeoDetalle === procedimiento.id) ?
                                                                            <select className='form-select form-select-lg mb-3'
                                                                                name={procedimiento.id}
                                                                                onChange={(e) => handleGeneracionChangeStatus(procedimiento.id, e.target.value)}
                                                                                style={{
                                                                                    width: 'auto',
                                                                                    height: 'auto',
                                                                                    fontSizeAdjust: '0.5',
                                                                                    fontSize: '0.9rem',
                                                                                }}>
                                                                                <option
                                                                                    value={listaChequeoGeneracion.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                    defaultValue={listaChequeoGeneracion.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}>
                                                                                    {listaChequeoGeneracion.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                </option>
                                                                                {opciones.map((opcion, index) => {
                                                                                    if (opcion !== listaChequeoGeneracion.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado) {
                                                                                        return (
                                                                                            <option value={opcion} key={index}>{opcion}</option>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null}
                                <hr></hr>
                                <div className='row d-flex align-items-center'>
                                    <div className='col'>
                                        <h5 className='card-subtitle'>Solicitud de informes&nbsp;
                                            {arrowUpSolicitud
                                                ? <i className="bi bi-caret-down-fill" onClick={handleShowSolicitud}></i>
                                                : <i className="bi bi-caret-up-fill" onClick={handleShowSolicitud}></i>
                                            }
                                        </h5>
                                    </div>
                                </div>
                                {showSolicitud ?
                                    <div>
                                        <div className='card-text'>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>Número</th>
                                                        <th scope='col'>Procedimiento</th>
                                                        <th scope='col'>Realizado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listaChequeo.procedimientosSolicitud ?
                                                        listaChequeo.procedimientosSolicitud.map((procedimiento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope='row'>{procedimiento.orden}</th>
                                                                    <td>{procedimiento.descripcion}</td>
                                                                    <td>
                                                                        {listaChequeoSolicitud.find(x => x.IdChequeoDetalle === procedimiento.id) ?
                                                                            <select className='form-select form-select-lg mb-3'
                                                                                name={procedimiento.id}
                                                                                onChange={(e) => handleSolicitudChangeStatus(procedimiento.id, e.target.value)}
                                                                                style={{
                                                                                    width: 'auto',
                                                                                    height: 'auto',
                                                                                    fontSizeAdjust: '0.5',
                                                                                    fontSize: '0.9rem',
                                                                                }}>
                                                                                <option
                                                                                    value={listaChequeoSolicitud.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                    defaultValue={listaChequeoSolicitud.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}>
                                                                                    {listaChequeoSolicitud.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado}
                                                                                </option>
                                                                                {opciones.map((opcion, index) => {
                                                                                    if (opcion !== listaChequeoSolicitud.find(x => x.IdChequeoDetalle === procedimiento.id).Verificado) {
                                                                                        return (
                                                                                            <option value={opcion} key={index}>{opcion}</option>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null}
                                <hr></hr>
                                <div>
                                    <button type='submit' className='btn btn-primary'>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </Form>
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
                titulo='Guardando Pruebas'
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
                mensaje='¿Está seguro que desea registrar las pruebas?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
}

ListaChequeoPopular.propTypes = {
    idDatoSorteo: PropTypes.number.isRequired,
}

export default ListaChequeoPopular;