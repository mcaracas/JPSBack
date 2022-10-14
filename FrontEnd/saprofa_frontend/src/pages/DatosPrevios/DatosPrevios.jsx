import React, { Component, useEffect, useState } from 'react';
import { getDatosSorteo, getPlanPremios, getPlanPremiosDetalle, getMarchamo, getUsuario } from './../../services/axiosService';
import PropTypes from 'prop-types';

const DatosPrevios = ({ numSorteo }) => {

    useEffect(() => {
        console.log(numSorteo)
        getDatosSorteo(numSorteo)
            .then((response) => {
                console.log(response.data);
                setDatos(response.data);
                console.log("Datos previos: ", datos);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                console.log("Datos previos finally: ", datos);
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