import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import CierreApuestas from '../../components/pure/forms/CierreApuestas';


const CierreApuestasPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const idSorteo = lottery?.idInterno;
    const tipoLoteria = lottery?.tipoLoteria;

    return (
        <div>
            <EncabezadoFranjas title={"Cierre de Apuestas"} />
            <Container component={<CierreApuestas idSorteo={idSorteo} />} />
        </div>
    );
}

export default CierreApuestasPage;
