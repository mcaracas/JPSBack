import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadoLoteriaFisica from '../../components/pure/Resultados/ResultadoLoteriaFisica';

const LoteriaFisicapage = () => {
    const num_sorteo = sessionStorage.getItem('num_sorteo');
    const tipo_loteria = sessionStorage.getItem('tipo_loteria');
    // TODO: change num_sorteo and tipo_loteria to the values from the session storage
    return (
        <div>
            <EncabezadoFranjas title={"Resultados Loteria Fisica"}/>
            <ResultadoLoteriaFisica num_sorteo='3360' tipo_loteria='LN'/>
        </div>
    );
}

export default LoteriaFisicapage;
