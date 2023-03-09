import React from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';

const DatosParticipantesPage = () => {
    const num_sorteo = sessionStorage.getItem('num_sorteo');
    const tipo_loteria = sessionStorage.getItem('tipo_loteria');
    return (
        <div>
            <EncabezadoFranjas title={"Datos de los participantes"}/>
            <DatosParticipantes num_sorteo='3360' tipo_loteria='LN'/>
        </div>
    );
}

export default DatosParticipantesPage;