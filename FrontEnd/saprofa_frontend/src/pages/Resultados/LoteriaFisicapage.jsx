import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadoLoteriaFisica from '../../components/pure/Resultados/ResultadoLoteriaFisica';

const LoteriaFisicapage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Resultados Loteria Fisica"}/>
            <ResultadoLoteriaFisica/>
        </div>
    );
}

export default LoteriaFisicapage;
