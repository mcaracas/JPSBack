import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import { insertDatosAdministracion } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import ParticipantesDropdown from './ParticipantesDropdown';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';


// Array con opciones agregadas a dropdowns de participantes
const OPCIONES_AGREGAR = ["No Participa"];

/**
 * 
 * @param {string} idSorteo Id del sorteo
 * @param {object} objetoDatosMapeados Objeto con las etiquetas de los participantes y sus valores obtenidos del backend
 * @param {function} obtenerDatosAdministracion Funcion que obtiene los datos de los participantes del backend
 * @param {string} tipoLoteria Tipo de loteria 
 * @returns 
 */
const DatosParticipantes = ({ idSorteo, objetoDatosMapeados, obtenerDatosAdministracion, tipoLoteria }) => {
  // Valores iniciales de los campos del formulario, se toman del objetoDatosMapeados que viene del componente padre
  const initialValues = {
    gerenteOperaciones: objetoDatosMapeados['Gerente Operaciones'],
    gerenteProduccion: objetoDatosMapeados['Gerencia Produccion y Comercializacion'],
    gerencia: objetoDatosMapeados['Gerencia'],
    juez: objetoDatosMapeados['Juez'],
    presentador: objetoDatosMapeados['Presentador del Sorteo'],
    prompter: objetoDatosMapeados['Prompter'],
    equipoComputo: objetoDatosMapeados['Equipo de Computo'],
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  // Etiqueta de los participantes
  const [labelsParticipantes, setLabelsParticipantes] = useState(Object.keys(objetoDatosMapeados));
  // Valores de los participantes
  const [datosParticipantes, setDatosParticipantes] = useState(agregaValoresDropdown());
  const [dropdownValues, setDropdownValues] = useState([]);
  const [confirmationAction, setConfirmationAction] = useState(() => { });

  function agregaValoresDropdown() {
    const valores = [...Object.values(objetoDatosMapeados)];
    valores.push(...OPCIONES_AGREGAR);
    return valores;
  }

  // Rutas de las pruebas según tipo de lotería
  const navigateToPruebas = (tipoLoteria) => {
    switch (tipoLoteria) {
      case 'LTT':
        return ('/MarchamoLotto');
      case 'NT':
        return ('/MarchamoNuevosTiempos');
      case '3M':
        return ('/Marchamo3Monazos');
      case 'LN':
        return ('/SeriesEnJuego');
      case 'LP':
        return ('/SeriesEnJuego');
      default:
        return ('/ChooseLottery');
    }
  }

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
    navigate(navigateToPruebas(tipoLoteria));
  }

  function handleCloseFailModal() {
    setShowFailModal(false);
  }

  const handleConfirmation = async (confirmed) => {
    if (!confirmed) {
      setShowConfirmation(false);
      return;
    }
    await confirmationAction();
    setShowConfirmation(false);
  }

  const handleShowConfirmation = async (action) => {
    setShowConfirmation(true);
    setConfirmationAction(() => () => {
      action();
    });
  }

  useEffect(() => {
    const usuario = sessionStorage.getItem('name');
    if (!usuario) {
      sessionStorage.clear();
      navigate('/');
    }
    handleObtenerParticipantes();
    labelsParticipantes.forEach(label => {
      const llave = mapLabel(label);
      const val = objetoDatosMapeados[label];
      setFormData(prevFormData => ({
        ...prevFormData,
        [llave]: val
      }));
    });
  }, []);

  // Mapea las etiquetas de los participantes a las etiquetas del formulario
  const mapLabel = label => {
    switch (label) {
      case 'Gerente Operaciones':
        return 'GOperaciones';
      case 'Gerencia Produccion y Comercializacion':
        return 'GProduccionYComercializacion';
      case 'Gerencia':
        return 'Gerencia';
      case 'Juez':
        return 'Juez';
      case 'Presentador del Sorteo':
        return 'PresentadorDelSorteo';
      case 'Prompter':
        return 'Prompter';
      case 'Equipo de Computo':
        return 'EquipoDeComputo';
      default:
        return '';
    }
  }

  const setParticipanteForm = (label, value) => {
    const labelMapped = mapLabel(label);
    setFormData({ ...formData, [labelMapped]: value });
  }

  const handleObtenerParticipantes = async () => {
    try {
      if (!idSorteo) {
        const lottery = JSON.parse(sessionStorage.getItem('lottery'));
        idSorteo = lottery?.idInterno;
      }
      const response = await obtenerDatosAdministracion(idSorteo);
      // Etiquetas de los participantes
      const labels = Object.keys(response);
      // Valores de los participantes
      const datos = Object.values(response);
      setLabelsParticipantes(labels);
      setDatosParticipantes(datos);
      const dropdowns = labelsParticipantes.map((label, index) => {
        return (
          <div className="col-12 col-md-6 m-4" key={index}>
            <label htmlFor={label}>{label}</label>
            <ParticipantesDropdown participantes={datosParticipantes} value={objetoDatosMapeados[label]} label={label} setParticipanteForm={setParticipanteForm} />
          </div>
        )
      });
      setDropdownValues(dropdowns);

    } catch (error) {

    }
  }

  const handleSubmit = async (values) => {
    try {
      setShowLoadingModal(true);
      const response = await insertDatosAdministracion(values);
      setShowLoadingModal(false);
      if (response.status === 200) {
        setShowLoadingModal(false);
        setMensaje("Datos de Participantes guardados exitosamente");
        setTitulo("¡Operación Exitosa!");
        setDatosEnviados(true);
        setShowSuccessModal(true);
      } else {
        setShowLoadingModal(false);
      }
    } catch (error) {
      setShowLoadingModal(false);
      setMensaje(`Error al guardar los Datos de Participantes. ${error.message}`);
      setTitulo("¡Operación Fallida!");
      setDatosEnviados(false);
      setShowFailModal(true);
    }
  }

  return (
    <>
      <div className="container">
        <Formik
          initialValues={formData}
          onSubmit={
            async () => {
              await handleShowConfirmation(() => handleSubmit(formData));
            }
          }
        >
          {({ isSubmitting, isValidating }) => (
            <div className='container-fluid col'>
              <Form>
                <div className="row">
                  <div className="col-8">
                    {
                      dropdownValues.map(dropdown => dropdown)
                    }
                  </div>
                  <div className='col-2'>
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                      <button className="btn mt-5 mb-5" name='obtenerDatos' type="button" onClick={handleObtenerParticipantes}>Obtener Participantes</button>
                      <button className="btn mt-5 mb-5" disabled={isSubmitting || isValidating || datosEnviados} type="submit" >Registar Datos de Participantes</button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <SuccessModal
        show={showSuccessModal}
        titulo={titulo}
        mensaje={mensaje}
        handleClose={handleCloseSuccessModal}
      />
      <LoadingModal
        show={showLoadingModal}
        titulo='Guardando Datos de Participantes'
        mensaje='Por favor espere...'
      />
      <FailModal
        show={showFailModal}
        titulo={titulo}
        mensaje={mensaje}
        handleClose={handleCloseFailModal}
      />
      <ConfirmationModal
        show={showConfirmation}
        titulo='Confirmación'
        mensaje='¿Está seguro que desea registrar los datos de los participantes?'
        handleConfirmation={handleConfirmation}
      />
    </>
  );
}

export default DatosParticipantes;
