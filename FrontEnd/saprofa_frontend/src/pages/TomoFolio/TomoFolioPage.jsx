import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Tomo from './../../components/./pure/./tomoFolio/TomoFolio'
import TomoFolioNacional from './../../components/./pure/./tomoFolio/TomoFolioNacional'
import '../../styles/TomoFolio.scss';
import Container from '../../components/container/container';

const TomoFolioPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const idInterno = lottery?.idInterno;
    const tipoLoteria = lottery?.tipoLoteria;

    console.log(idInterno);

    const selectComponent = () => {
        switch (tipoLoteria) {
            case 'LN':
                return <TomoFolioNacional idInterno={idInterno} />
            default:
                return <Tomo idInterno={idInterno} />
        }
    }

    return (
        <div>
            <EncabezadoFranjas title={'Tomo y Folio'} />
            <Container component={selectComponent()} />
        </div>
    );
}

export default TomoFolioPage;
