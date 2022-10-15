import React, { Component, useEffect, useState } from 'react';
import { getDatosSorteo, getPlanPremios, getPlanPremiosDetalle, getMarchamo, getUsuario, getDatosFormularios } from './../../services/axiosService';
import PropTypes from 'prop-types';

const DatosPrevios = ({ numSorteo }) => {

    useEffect(() => {
        getDatosFormularios(1)
            .then(response => {
                console.log(response);
                setDatos(response.data);
            })
            .catch(e => {
                console.log("Error: ",e);
            });
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