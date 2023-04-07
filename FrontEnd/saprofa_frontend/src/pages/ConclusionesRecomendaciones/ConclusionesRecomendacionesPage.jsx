import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ConclusionesRecomendaciones from '../../components/pure/conclusionesRecomendaciones/ConclusionesFiscalizacion';
import '../../styles/conclusionesrecomendaciones.scss';

function fecha(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // add 1 since months start at 0
    const day = date.getDate();
    const spanishDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const spanishMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const formattedDate = `${spanishDays[date.getDay()]}, ${day} de ${spanishMonths[month - 1]} de ${year}`;
    return formattedDate;
}

const ConclusionesRecomendacionesPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const numeroSorteo = lottery?.numSorteo;
    const tipoLoteria = lottery?.tipoLoteria;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const fechaSorteo = lottery?.fechaHora;
    //const fiscalizador = lottery?.fiscalizador;
    const fiscalizador = 'Andrés Villalobos Montero';
    return (
        <div>
            <EncabezadoFranjas title={"Conclusiones y Recomendaciones"} />
            <ConclusionesRecomendaciones sorteo={sorteo} fiscalizador={fiscalizador} fecha={fecha(fechaSorteo)} />
        </div>
    );
}

export default ConclusionesRecomendacionesPage;