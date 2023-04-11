import React from "react";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import SeriesEnJuego from "../../components/pure/seriesEnSorteo/seriesEnJuego";
import '../../styles/seriesEnJuego.scss';


const SeriesEnJuegoPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const numeroSorteo = lottery?.numSorteo;
    const tipoLoteria = lottery?.tipoLoteria;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const fechaSorteo = lottery?.fechaHora;
    //const fiscalizador = lottery?.fiscalizador;
    const fiscalizador = 'Andrés Villalobos Montero';
    const hora = lottery?.fechaHora

    return (
        <div>
            <EncabezadoFranjas title={"Series en juego"} />
            <SeriesEnJuego sorteo={sorteo} fiscalizador={fiscalizador} fecha={"2023-04-06"} hora={hora} />
        </div>
    );
}

export default SeriesEnJuegoPage;
