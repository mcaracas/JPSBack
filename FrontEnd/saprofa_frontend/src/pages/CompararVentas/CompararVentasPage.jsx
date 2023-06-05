import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import CompararVentas from './../../components/pure/forms/CompararVentas';


const CompararVentasPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const idSorteo = lottery?.idInterno;
    const tipoLoteria = lottery?.tipoLoteria;

    return (
        <div>
            <EncabezadoFranjas title={"Comparar Ventas"} />
            <Container component={<CompararVentas idSorteo={idSorteo} />} />
        </div>
    );
}

export default CompararVentasPage;
