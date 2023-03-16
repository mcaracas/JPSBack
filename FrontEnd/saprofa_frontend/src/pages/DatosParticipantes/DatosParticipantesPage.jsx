import React from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import { getDatosParticipantes } from '../../services/axiosService';

const obtenerDatosAdministracion = (idSorteo) => {
    // TODO: check the value returned by the endpoint
    return getDatosParticipantes(idSorteo);
  }

const DatosParticipantesPage = () => {
    // TODO: change props sent to DatosParticipantes to use sessionStorage
    const num_sorteo = sessionStorage.getItem('num_sorteo');
    const tipo_loteria = sessionStorage.getItem('tipo_loteria');
    return (
        <div>
            <EncabezadoFranjas title={"Datos de los participantes"}/>
            <DatosParticipantes num_sorteo='3360' tipo_loteria='LN' obtenerDatosAdministracion={ obtenerDatosAdministracion }/>
        </div>
    );
}

export default DatosParticipantesPage;