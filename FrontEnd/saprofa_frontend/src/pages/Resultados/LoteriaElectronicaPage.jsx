import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadosLotto from '../../components/pure/Resultados/ResultadosLotto';
import Resultados3M from '../../components/pure/Resultados/Resultados3M';
import ResultadosNT from '../../components/pure/Resultados/ResultadosNT';


const LoteriaElectronicaPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const tipoSorteo = lottery?.tipoLoteria;
    const numeroSorteo = lottery?.numSorteo;
    const idInterno = lottery?.idInterno;

    return (
        <div>
            <EncabezadoFranjas title={"Resultados lotería electrónica"}></EncabezadoFranjas>
            {tipoSorteo === "LTT" ? <ResultadosLotto numSorteo={numeroSorteo} idInterno={idInterno}/> :
                tipoSorteo === "3M" ? <Resultados3M numSorteo={numeroSorteo} idInterno={idInterno}/> :
                    tipoSorteo === "NT" ? <ResultadosNT numSorteo={numeroSorteo} idInterno={idInterno} /> : null}
        </div>
    );
}

export default LoteriaElectronicaPage;