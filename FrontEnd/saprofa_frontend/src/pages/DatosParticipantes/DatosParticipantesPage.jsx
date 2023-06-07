import React, { useEffect, useState } from 'react';
import DatosParticipantes from '../../components/pure/datosParticipantes/DatosParticipantes';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import { getDatosParticipantes, getGerenciaGeneral, getGerenciaOpreacion, getGerenciaProduccion } from '../../services/axiosService';
import Container from '../../components/container/container';
import FailModal from '../../components/modals/FailModal';
import { useNavigate } from 'react-router-dom';

let idDatosPrevios = '';
let tipoLoteria = '';

const DatosParticipantesPage = () => {
    const [datosParticipantes, setDatosParticipantes] = useState(null);
    const [participantes, setParticipantes] = useState(null);
    const [showFailModal, setShowFailModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    function handleCloseFailModal() {
        setShowFailModal(false);
        navigate('/ChooseLottery');
    }

    async function getParticipantes() {
        const gerenciaGeneralReponse = await getGerenciaGeneral();
        const gerenciaGeneral = gerenciaGeneralReponse.data;
        const gerenciaOperacionResponse = await getGerenciaOpreacion();
        const gerenciaOperaciones = gerenciaOperacionResponse.data;
        const gerenciaProduccionResponse = await getGerenciaProduccion();
        const gerenciaProduccion = gerenciaProduccionResponse.data;
        const participantes = {
            gerenciaGeneral,
            gerenciaOperaciones,
            gerenciaProduccion,
        };
        
        return participantes;
    }

    /**
     * 
     * @param {int} id Id del sorteo
     * @returns Un objeto de javascript con las etiquetas de los participantes y sus valores obtenidos del backend
     */
    const obtenerDatosAdministracion = async (id) => {
        try {
            const response = await getDatosParticipantes(id);
            if (response.status === 500) {
                throw new Error('Error al obtener los datos de los participantes');
            }
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
        // Obtine los datos de los participantes para enviarlos listos al componente DatosParticipantes
        const obtenerDatos = async () => {
            const response = await obtenerDatosAdministracion(idDatosPrevios);
            setDatosParticipantes(response);
        };
        obtenerDatos();
        setParticipantes(getParticipantes());
        console.log('participantes', participantes);
    }, []);

    return (
        <>
            <div>
                <EncabezadoFranjas title={"Datos de los participantes"} />
                <Container
                    component={datosParticipantes &&
                        <DatosParticipantes
                            idSorteo={idDatosPrevios}
                            objetoDatosMapeados={datosParticipantes}
                            obtenerDatosAdministracion={obtenerDatosAdministracion}
                            tipoLoteria={tipoLoteria}
                            participantes={participantes}
                        />
                    }
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