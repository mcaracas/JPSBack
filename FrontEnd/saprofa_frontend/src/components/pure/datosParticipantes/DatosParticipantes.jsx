import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import { insertDatosAdministracion } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
import ParticipantesDropdown from './ParticipantesDropdown';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';


const initialValues = {
  GOperaciones: '',
  GProduccionYComercializacion: '',
  Gerencia: '',
  Juez: '',
  PresentadorDelSorteo: '',
  Prompter: '',
  EquipoDeComputo: ''
};

//const nombresParticipantes = [ 'Gerente Operaciones', 'Gerente Producción', 'Gerencia', 'Juez', 'Presentador', 'Prompter', 'Equipo Computo' ];

// check the props. should include num_sorteo, tipo_loteria
const DatosParticipantes = ({ idSorteo, objetoDatosMapeados, obtenerDatosAdministracion }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [labelsParticipantes, setLabelsParticipantes] = useState(Object.keys(objetoDatosMapeados));
  const [datosParticipantes, setDatosParticipantes] = useState(Object.values(objetoDatosMapeados));
  const [dropdownValues, setDropdownValues] = useState([]);
  const [confirmationAction, setConfirmationAction] = useState(() => { });

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
    //TODO: check where to navigate
    navigate('/PruebasLotto');
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
    handleObtenerParticipantes();
    labelsParticipantes.forEach(label => {
      const llave = mapLabel(label);
      const val = objetoDatosMapeados[label];
      console.log("key", llave);
      console.log("val", val);
      setFormData({ ...formData, [llave]: val });
    });
    console.log("formData", formData);
  }, []);

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
      const labels = Object.keys(response);
      const datos = Object.values(response);
      setLabelsParticipantes(labels);
      setDatosParticipantes(datos);
      const dropdowns = labelsParticipantes.map((label, index) => {
        return (
          <div className="col-12 col-md-6 m-4" key={index}>
            <label htmlFor={label}>{label}</label>
            {console.log("objetoDatosMapeados[label]", objetoDatosMapeados[label])}
            {/* <ParticipantesDropdown participantes={datosParticipantes} setFieldValue={setFieldValue} /> */}
            <ParticipantesDropdown participantes={datosParticipantes} value={objetoDatosMapeados[label]} label={label} setParticipanteForm={setParticipanteForm} />
          </div>
        )
      });
      setDropdownValues(dropdowns);

      console.log("datosParticipantes", datosParticipantes);
    } catch (error) {

    }
  }

  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      // setShowLoadingModal(true);
      // const response = await insertDatosAdministracion({
      //   gerenteOperaciones: values.GOperaciones,
      //   gerenteProduccion: values.GProduccionYComercializacion,
      //   gerencia: values.Gerencia,
      //   juez: values.Juez,
      //   presentadorDelSorteo: values.PresentadorDelSorteo,
      //   prompter: values.Prompter,
      //   equipoDeComputo: values.EquipoDeComputo
      // });
      // setShowLoadingModal(false);
      // if (response.status === 200) {
      //   setShowLoadingModal(false);
      //   setMensaje("Datos de Participantes guardados exitosamente");
      //   setTitulo("¡Operación Exitosa!");
      //   setDatosEnviados(true);
      //   setShowSuccessModal(true);
      // } else {
      //   setShowLoadingModal(false);
      // }
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
                      <button className="btn mt-5 mb-5" disabled={isSubmitting || isValidating || datosEnviados} type="submit" onClick={() => { insertDatosAdministracion() }}>Registar Datos de Participantes</button>
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
