import React, { Component, useEffect, useState } from 'react';
import { getDatosSorteo, getPlanPremios, getPlanPremiosDetalle, getMarchamo, getUsuario, getDatosFormularios } from './../../services/axiosService';
import PropTypes from 'prop-types';

const DatosPrevios = ({ numSorteo }) => {

    useEffect(() => {
        getDatosFormularios('LN3360')
            .then(response => {
                console.log(response.data);
                setDatos(response.data);
            })
            .catch(e => {
                console.log("Error: ",e);
            });
    }, []);

    const [datos, setDatos] = useState([]);

    return (
        <div>
          <pre>{JSON.stringify(datos)}</pre>
        </div>
    );
}

DatosPrevios.propTypes = {
    props: PropTypes.object
}

export default DatosPrevios;