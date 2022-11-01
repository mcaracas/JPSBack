import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PruebasNTForm from '../../components/pure/forms/PruebasNTForm';

const PruebasNTPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas Nuevos Tiempos y Nuevos Tiempos Reventados"}/>
            <PruebasNTForm/>
        </div>
    );
}

export default PruebasNTPage;
