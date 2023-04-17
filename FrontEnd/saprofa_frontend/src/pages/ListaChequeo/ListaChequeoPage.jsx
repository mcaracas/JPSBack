import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import ListaChequeoPopular from '../../components/listaChequeo/listaChequeoPopular';

const ListaChequeoPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem("lottery"));
    const idInterno = lottery?.idInterno;

    return (
        <div>
            <EncabezadoFranjas title={"Lista de Chequeo"} />
            <Container component={<ListaChequeoPopular idDatoSorteo={idInterno} />} />
        </div>
    );
}

export default ListaChequeoPage;
