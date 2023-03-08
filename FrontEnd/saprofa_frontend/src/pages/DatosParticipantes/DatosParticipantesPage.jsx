import React from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';

const DatosParticipantesPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Datos de los participantes"}/>
            <DatosParticipantes/>
        </div>
    );
}

export default DatosParticipantesPage;