import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import ListaChequeo from '../../components/listaChequeo/listaChequeo';

const ListaChequeoPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const idInterno = lottery?.idInterno;

    return (
        <div>
            <EncabezadoFranjas title={"Lista de Chequeo"} />
            <Container component={<ListaChequeo idDatoSorteo={idInterno} />} />
        </div>
    );
}

export default ListaChequeoPage;
