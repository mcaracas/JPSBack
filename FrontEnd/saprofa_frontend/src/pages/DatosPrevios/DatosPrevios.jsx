import React, { Component, useEffect, useState } from 'react';
import { getDatosSorteo, getPlanPremios, getPlanPremiosDetalle, getMarchamo, getUsuario } from './../../services/axiosService';
import PropTypes from 'prop-types';

const DatosPrevios = ({ numSorteo }) => {

    useEffect(() => {
        getDatosSorteo(numSorteo)
            .then((response) => {
                setDatos(response.data);
                console.log("Datos previos: ", datos);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                console.log("Datos previos finally: ", datos);
            });
        console.log("Datos previos finally: ", datos);
        getPlanPremios(datos.planPremios)
            .then((response) => {
                setPlanPremios(response.data);
                console.log("Plan premios: ", PlanPremios);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                console.log("Plan premios finally: ", PlanPremios);
            });
        console.log("Plan premios finally: ", PlanPremios);
        getPlanPremiosDetalle(PlanPremios.id)
            .then((response) => {
                setPlanPremiosDetalle(response.data);
                console.log("Plan premios detalle: ", PlanPremiosDetalle);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                console.log("Plan premios detalle finally: ", PlanPremiosDetalle);
            });
        console.log("Plan premios detalle finally: ", PlanPremiosDetalle);
        return () => {
            console.log("DatosPrevios final: ", datos);
        }
    }, []);

    const [datos, setDatos] = useState([]);
    const [PlanPremios, setPlanPremios] = useState([]);
    const [PlanPremiosDetalle, setPlanPremiosDetalle] = useState([]);
    const [usuario, setUsuario] = useState([]);

    return (
        <div>
            <h1>Datos Previos</h1>
            <h3>Nombre: {PlanPremios.descripcion}</h3>
            <h5>Fecha: {datos.fechaHora}</h5>
            <h5>Numero de Sorteo: {datos.numSorteo}</h5>
            <h5>Numero de premio: {PlanPremiosDetalle.numPremio}</h5>
            <h5>Premio monetario por fraccion: ₡{PlanPremiosDetalle.montoUnitario}</h5>
            <h5>Numero de fracciones: {PlanPremiosDetalle.fraccionEntero}</h5>
            <h5>Descripcion: {PlanPremiosDetalle.descripcion}</h5>
            <h5>Nombre del usuario: {usuario}</h5>
            <h5>Datos de marchamos:</h5>
            <pre>{JSON.stringify(datos)}</pre>
            <pre>{JSON.stringify(PlanPremios)}</pre>
            <pre>{JSON.stringify(PlanPremiosDetalle)}</pre>
        </div>
    );
}

DatosPrevios.propTypes = {
    props: PropTypes.object
}

export default DatosPrevios;


// const DatosSorteo = response.data;
//                 getPlanPremios(DatosSorteo.planPremios)
//                     .then((response) => {
//                         const PlanPremios = response.data;
//                         getPlanPremiosDetalle(DatosSorteo.planPremios)
//                             .then((response) => {
//                                 const PlanPremiosDetalle = response.data;
//                                 getUsuario(DatosSorteo.idUsuario)
//                                     .then((response) => {
//                                         const nombre = response.data.nombre;
//                                         setData({ DatosSorteo, PlanPremios, PlanPremiosDetalle, nombre });
//                                         console.log("Data filled: ", data);
//                                     })
//                                     .catch((e) => {
//                                         console.log(e);
//                                     });
//                             })
//                             .catch((error) => {
//                                 console.log("Error:", error);
//                             });
//                     })
//                     .catch((error) => {
//                         console.log("Error:", error);
//                     });
// getPlanPremios(datos.planPremios)
//                     .then((response) => {
//                         console.log("Plan Premios: ", response.data);
//                         setPlanPremios(response.data);
//                         getPlanPremiosDetalle(datos.planPremios)
//                             .then((response) => {
//                                 console.log("Plan Premios Detalle: ", response.data);
//                                 setPlanPremiosDetalle(response.data);
//                                 getUsuario(datos.idUsuario)
//                                     .then((response) => {
//                                         console.log("Usuario: ", response.data.nombre);
//                                         setUsuario(response.data.nombre);
//                                     }).catch((error) => {
//                                         console.log(error);
//                                     });
//                             }).catch((error) => {
//                                 console.log(error);
//                             });
//                     }).catch((error) => {
//                         console.log(error);
//                     });