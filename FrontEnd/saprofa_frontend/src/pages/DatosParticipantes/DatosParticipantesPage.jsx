import React, { useEffect, useState } from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import { getDatosParticipantes } from '../../services/axiosService';
import Container from '../../components/container/container';


const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idDatosPrevios = lottery?.idInterno;
const idSorteo = `${tipoLoteria}${numSorteo}`;

/**
 * 
 * @param {int} id Id del sorteo
 * @returns Array con dos arrays, el primero con las labels y el segundo con los datos de los participantes
 */
const obtenerDatosAdministracion = async (id) => {    
    const response = await getDatosParticipantes(id);
    const datos = response.data;
    const datosMapeados = {
        'Gerente Operaciones': datos.gerenteOperaciones,
        'Gerencia Produccion y Comercializacion': datos.gerenteProduccion,
        'Gerencia': datos.gerencia,
        'Juez': datos.juez,
        'Presentador del Sorteo': datos.presentador,
        'Prompter': datos.prompter,
        'Equipo de Computo': datos.equipoComputo,
    };
    // return [Object.keys(datosMapeados), Object.values(datosMapeados)];
    return datosMapeados;
}

const DatosParticipantesPage = () => {
    const [datosParticipantes, setDatosParticipantes] = useState(null); 
    useEffect(() => {
        const obtenerDatos = async () => {
            const response = await obtenerDatosAdministracion(idDatosPrevios);
            setDatosParticipantes(response);
        };
        obtenerDatos();
    }, []);

    // TODO: change props sent to DatosParticipantes to use sessionStorage
    return (
        <div>
            <EncabezadoFranjas title={"Datos de los participantes"} />
            <Container
                // component={datosParticipantes && <DatosParticipantes idSorteo={idDatosPrevios} labels={datosParticipantes[0]} datosParticipantes={datosParticipantes[1]} obtenerDatosAdministracion={obtenerDatosAdministracion} />}
                component={datosParticipantes && <DatosParticipantes idSorteo={idDatosPrevios} objetoDatosMapeados={datosParticipantes} obtenerDatosAdministracion={obtenerDatosAdministracion} />}
            />
        </div>
    );
}

export default DatosParticipantesPage;