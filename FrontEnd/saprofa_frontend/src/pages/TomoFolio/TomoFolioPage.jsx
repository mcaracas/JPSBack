import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Tomo from '../../components/pure/forms/TomoFolio';
import '../../styles/TomoFolio.scss';
import Container from '../../components/container/container';

const TomoFolioPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const idInterno = lottery?.idInterno;

    console.log(idInterno);

    return (
        <div>
            <EncabezadoFranjas title={'Tomo y Folio'} />
            <Container component={<Tomo idInterno={idInterno} />} />
        </div>
    );
}

export default TomoFolioPage;
