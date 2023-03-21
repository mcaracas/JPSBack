import React from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import { getDatosParticipantes } from '../../services/axiosService';


const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idDatosPrevios = lottery?.idInterno;
const idSorteo = `${tipoLoteria}${numSorteo}`;

const obtenerDatosAdministracion = (idSorteo) => {
    // TODO: check the value returned by the endpoint
    return getDatosParticipantes(idSorteo);
  }

const DatosParticipantesPage = () => {
    // TODO: change props sent to DatosParticipantes to use sessionStorage
    return (
        <div>
            <EncabezadoFranjas title={"Datos de los participantes"}/>
            <DatosParticipantes idSorteo={ idSorteo } obtenerDatosAdministracion={ obtenerDatosAdministracion }/>
        </div>
    );
}

export default DatosParticipantesPage;