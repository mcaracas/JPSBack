import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PruebasNTForm from '../../components/pure/forms/PruebasNTForm';
import Container from '../../components/container/container';

const PruebasNTPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas Nuevos Tiempos y Nuevos Tiempos Reventados"} />
            <Container component={<PruebasNTForm IdDatoSorteo={150} />} />
        </div>
    );
}

export default PruebasNTPage;
