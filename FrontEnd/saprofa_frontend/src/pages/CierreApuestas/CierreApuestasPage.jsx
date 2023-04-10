import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import CierreApuestas from '../../components/pure/forms/CierreApuestas';


const CierreApuestasPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Cierre de Apuestas"} />
            <Container component={<CierreApuestas />} />
        </div>
    );
}

export default CierreApuestasPage;
