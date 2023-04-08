import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadoLoteriaFisica from '../../components/pure/Resultados/ResultadoLoteriaFisica';
import Container from '../../components/container/container';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;

const LoteriaFisicapage = () => {
    // TODO: change num_sorteo and tipo_loteria to the values from the session storage
    return (
        <div>
            <EncabezadoFranjas title={"Resultados Loteria Fisica"}/>
            <Container  component={<ResultadoLoteriaFisica idSorteo={idSorteo}/>} />
        </div>
    );
}

export default LoteriaFisicapage;
