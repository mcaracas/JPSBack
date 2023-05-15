import React from "react";
import EncabezadoFranjas from "../../components/pure/EncabezadoFranjas";
import Inventario from "../../components/pure/inventario/inventario";
import '../../styles/inventario.scss';
import { fecha } from "../../utils/config/fecha";
import Container from "../../components/container/container";


const InventarioPage = () => {
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const tipoLoteria = lottery?.tipoLoteria;
    const numeroSorteo = lottery?.numSorteo;
    const sorteo = `${tipoLoteria}${' Nº ' + numeroSorteo}`;
    const fechaSorteo = lottery?.fechaHora;
    return (
        <div>
            <EncabezadoFranjas title={"Inventario"} />
            <Container component={
            <Inventario sorteo={sorteo} fecha={fecha(fechaSorteo)} />
        } />
        </div>
    );
}
export default InventarioPage;