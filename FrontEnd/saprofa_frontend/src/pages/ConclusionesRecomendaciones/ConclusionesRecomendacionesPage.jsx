import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ConclusionesRecomendaciones from '../../components/pure/conclusionesRecomendaciones/ConclusionesFiscalizacion';
import '../../styles/conclusionesrecomendaciones.scss';
import Container from '../../components/container/container';
import { fecha } from "../../utils/config/fecha";
import Reportes from '../../components/pure/reportes/reportes';

const ConclusionesRecomendacionesPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const numeroSorteo = lottery?.numSorteo;
    const tipoLoteria = lottery?.tipoLoteria;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const idSorteo = lottery?.idInterno;
    const fechaSorteo = lottery?.fechaHora;
    //const fiscalizador = lottery?.fiscalizador;
    const fiscalizador = sessionStorage.getItem('name');
    return (
        <div>
            <EncabezadoFranjas title={"Conclusiones y Recomendaciones"} />
            <Container
                component={<ConclusionesRecomendaciones sorteo={sorteo} fiscalizador={fiscalizador} fecha={fecha(fechaSorteo)} idSorteo={idSorteo} />}
            />
            <span className="reportes"></span>
        </div>
    );
}

export default ConclusionesRecomendacionesPage;