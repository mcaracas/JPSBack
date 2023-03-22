import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Tomo from '../../components/pure/forms/TomoFolio';
import '../../styles/TomoFolio.scss';
//@TODO: Delete this page

const TomoFolioPage = () => {

    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const idInterno = lottery?.idInterno;

    console.log(idInterno);

    return (
        <div>
            <EncabezadoFranjas title={'Tomo y Folio'} />
            <Tomo idInterno={idInterno}/>
        </div>
    );
}

export default TomoFolioPage;
