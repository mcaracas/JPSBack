import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import PruebasNTForm from '../../components/pure/forms/PruebasNTForm';

const PruebasNTPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas Nuevos Tiempos y Nuevos Tiempos Reventados"} />
            <Container component={<PruebasNTForm/>} />
        </div>
    );
}

export default PruebasNTPage;
