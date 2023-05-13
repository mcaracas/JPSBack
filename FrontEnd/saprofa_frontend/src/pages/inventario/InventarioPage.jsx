import React from "react";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import Inventario from "../../components/pure/inventario/inventario";
import '../../styles/inventario.scss';

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

const InventarioPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const tipoLoteria = lottery?.tipoLoteria;
    const numeroSorteo = lottery?.numSorteo;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const idInterno = lottery?.idInterno;
    const fechaSorteo = lottery?.fechaHora;
    return (
        <div>
            <EncabezadoFranjas title={"Inventario"} />
            <Inventario idInterno={idInterno} sorteo={sorteo} fecha={fecha(fechaSorteo)} tipoLoteria={tipoLoteria} />
        </div>
    );
}
export default InventarioPage;

