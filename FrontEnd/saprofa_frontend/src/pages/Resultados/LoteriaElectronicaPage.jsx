import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadosLotto from '../../components/pure/Resultados/ResultadosLotto';
import Resultados3M from '../../components/pure/Resultados/Resultados3M';
import ResultadosNT from '../../components/pure/Resultados/ResultadosNT';
import Container from '../../components/container/container';


const LoteriaElectronicaPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const tipoSorteo = lottery?.tipoLoteria;
    const numeroSorteo = lottery?.numSorteo;
    const idInterno = lottery?.idInterno;

    const component = () => {
        switch (tipoSorteo) {
            case "LTT":
                return <ResultadosLotto numSorteo={numeroSorteo} idInterno={idInterno} />;
            case "3M":
                return <Resultados3M numSorteo={numeroSorteo} idInterno={idInterno} />;
            case "NT":
                return <ResultadosNT numSorteo={numeroSorteo} idInterno={idInterno} />;
            default:
                return null;
        }
    }
            

    return (
        <div>
            <EncabezadoFranjas title={"Resultados lotería electrónica"}></EncabezadoFranjas>
            <Container
                component={ component()}
            ></Container>
        </div>
    );
}

export default LoteriaElectronicaPage;