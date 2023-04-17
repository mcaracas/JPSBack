import React, { useState, useEffect } from 'react';
import { getListaChequeo } from '../../services/axiosService';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';

const ListaChequeoPopular = ({idDatoSorteo}) => {

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

    const [opciones, setOpciones] = useState(['Cumplido', 'Incumplido', 'N/A']);

    useEffect(() => {
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

    useEffect(() => {
        if (listaChequeoFlag) {
            initlistaChequeoPrevio();
            initlistaChequeoDurante();
            initlistaChequeoDespues();
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

    const handleSubmit = () => {
        console.log(listaChequeo);
    }

    return (
        <div>
            <Formik
                initialValues={{
                    listaChequeoPrevio: listaChequeoPrevio,
                    listaChequeoDurante: listaChequeoDurante,
                    listaChequeoDespues: listaChequeoDespues
                }}
                onSubmit={handleSubmit}
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
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>Guardar</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

ListaChequeoPopular.propTypes = {
    idDatoSorteo: PropTypes.number.isRequired,
}

export default ListaChequeoPopular;