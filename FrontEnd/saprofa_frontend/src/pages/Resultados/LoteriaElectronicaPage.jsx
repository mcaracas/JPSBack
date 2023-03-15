import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadosLotto from '../../components/pure/Resultados/ResultadosLotto';
import Resultados3M from '../../components/pure/Resultados/Resultados3M';
import ResultadosNT from '../../components/pure/Resultados/ResultadosNT';


const LoteriaElectronicaPage = () => {

    // @TODO: Get the type of lottery from the session storage
    //const tipoSorteo = sessionStorage.getItem("")

    let tipoSorteo = "LTT";

    return (
        <div>
            <EncabezadoFranjas title={"Resultados lotería electrónica"}></EncabezadoFranjas>
            {tipoSorteo === "LTT" ? <ResultadosLotto /> :
                tipoSorteo === "3M" ? <Resultados3M /> :
                    tipoSorteo === "NT" ? <ResultadosNT /> : null}
        </div>
    );
}

export default LoteriaElectronicaPage;