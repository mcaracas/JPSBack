import React, { useEffect, useState } from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import { getDatosParticipantes } from '../../services/axiosService';
import Container from '../../components/container/container';
import FailModal from '../../components/modals/FailModal';
import { useNavigate } from 'react-router-dom';

let idDatosPrevios = '';
let tipoLoteria = '';

const DatosParticipantesPage = () => {
    const [datosParticipantes, setDatosParticipantes] = useState(null);
    const [showFailModal, setShowFailModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    function handleCloseFailModal() {
        setShowFailModal(false);
        navigate('/ChooseLottery');
    }

    /**
 * 
 * @param {int} id Id del sorteo
 * @returns Array con dos arrays, el primero con las labels y el segundo con los datos de los participantes
 */
    const obtenerDatosAdministracion = async (id) => {
        try {
            const response = await getDatosParticipantes(id);
            if (response.status === 500) {
                throw new Error('Error al obtener los datos de los participantes');
            }
            const datos = response.data;
            console.log(datos);
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
        } catch (error) {
            setMensaje(`Error al cargar los Datos de Participantes. ${error.message}`);
            setTitulo("¡Operación Fallida!");
            setShowFailModal(true);
        }
    }

    useEffect(() => {
        const lottery = JSON.parse(sessionStorage.getItem('lottery'));
        tipoLoteria = lottery?.tipoLoteria;
        idDatosPrevios = lottery?.idInterno;
        const obtenerDatos = async () => {
            const response = await obtenerDatosAdministracion(idDatosPrevios);
            setDatosParticipantes(response);
        };
        obtenerDatos();
    }, []);

    // TODO: change props sent to DatosParticipantes to use sessionStorage
    return (
        <>
            <div>
                <EncabezadoFranjas title={"Datos de los participantes"} />
                <Container
                    // component={datosParticipantes && <DatosParticipantes idSorteo={idDatosPrevios} labels={datosParticipantes[0]} datosParticipantes={datosParticipantes[1]} obtenerDatosAdministracion={obtenerDatosAdministracion} />}
                    component={datosParticipantes && <DatosParticipantes idSorteo={idDatosPrevios} objetoDatosMapeados={datosParticipantes} obtenerDatosAdministracion={obtenerDatosAdministracion} tipoLoteria={tipoLoteria}/>}
                />
            </div>
            <FailModal
                show={showFailModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseFailModal}
            />
        </>
    );
}

export default DatosParticipantesPage;