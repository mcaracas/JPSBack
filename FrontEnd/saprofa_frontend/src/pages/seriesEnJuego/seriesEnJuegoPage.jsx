import React from "react";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import SeriesEnJuego from "../../components/pure/seriesEnSorteo/seriesEnJuego";
import '../../styles/seriesEnJuego.scss';
import Container from "../../components/container/container";
import { fecha } from "../../utils/config/fecha";

const SeriesEnJuegoPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const numeroSorteo = lottery?.numSorteo;
    const tipoLoteria = lottery?.tipoLoteria;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const idInterno = lottery?.idInterno;
    const fechaSorteo = lottery?.fechaHora;
    const fiscalizador = sessionStorage.getItem('name');
    return (
        <div>
            <EncabezadoFranjas title={"Series en juego"} />
            <Container component={
                <SeriesEnJuego idInterno={idInterno} sorteo={sorteo} fiscalizador={fiscalizador} fecha={fecha(fechaSorteo)} tipoLoteria={tipoLoteria} />
            } />
        </div>
    );
}

export default SeriesEnJuegoPage;
