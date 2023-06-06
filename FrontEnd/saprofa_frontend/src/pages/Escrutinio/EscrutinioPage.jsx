import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import Escrutinio from '../../components/pure/forms/Escrutinio';


const EscrutinioPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const tipoLoteria = lottery?.tipoLoteria;
    const idSorteo = lottery?.idInterno;

    return (
        <div>
            <EncabezadoFranjas title={"Escrutinio"} />
            <Container component={<Escrutinio tipoLoteria={tipoLoteria} idSorteo={idSorteo} />} />
        </div>
    );
}

export default EscrutinioPage;
