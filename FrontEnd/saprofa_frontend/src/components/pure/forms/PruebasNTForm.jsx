import React, { useEffect, useState } from "react";
import { Formik, FieldArray, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { insertListaPrueba } from '../../../services/axiosService';
import SuccessModal from "../../modals/SuccessModal";
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';

// TODO: Esto se debe recibir desde el Backend para ser dinámico
const CANT_BOLITAS = 1;
const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;
const idDatoSorteo = lottery?.idInterno;

const validationSchema = Yup.object().shape({
  pruebas: Yup.array().of(
    Yup.object().shape({
      valija: Yup.string().required("Valija es requerida"),
      resultados: Yup.array().of(
        Yup.object().shape({
          numero: Yup.string(),
          tipoBolita: Yup.string(),
        }))
    })
  ).min(1, 'Debes agregar al menos una prueba').default(() => [{}])
});

const createResultados = cant => {
  const resultados = [];
  for (let i = 0; i < cant; i++) {
    resultados.push({
      numero: '',
      tipoBolita: 'B',
    });
  }
  return resultados;
};

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Número requerido';
  } else if (!/^([0-9]|[1-9][0-9]|99|0[0-9])$/.test(value)) {
    error = 'Debe ser un número entre 00 y 99';
}
  return error;
}

const pruebaInicial = {
  valija: "A",
  resultados: createResultados(CANT_BOLITAS),
};

const initialValues = {
  pruebas: [pruebaInicial],
};

const bolitaOptions = [
  { value: 'B', label: 'B' },
  { value: 'R', label: 'R' },
];

const valijaOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
];

const PruebasNTForm = () => {

  const [valija, setValija] = useState("A");
  const [pruebas, setPruebas] = useState(initialValues.pruebas);
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(() => { });
  const navigate = useNavigate();

  useEffect(() => {
		const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
	});

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
    navigate('/MarchamoNuevosTiempos');
  }

  function handleCloseFailModal() {
    setShowFailModal(false);
  }

  const handleConfirmation = async(confirmed) => {
    if (!confirmed) {
      setShowConfirmation(false);
      return;
    }
    await confirmationAction();
    setShowConfirmation(false);
  }

  const handleShowConfirmation = async(action) => {
    setShowConfirmation(true);
    setConfirmationAction(() => () => {
      action();
    });
  }

  const insertaPrueba = (formik) => {
    const newPrueba = {
      valija: valija,
      resultados: createResultados(CANT_BOLITAS),
    };
    const newPruebas = structuredClone(pruebas);
    newPruebas.push(newPrueba);
    setPruebas(newPruebas);
  };

  const eliminarPrueba = (idx) => {
    const newPruebas = structuredClone(pruebas);
    newPruebas.splice(idx, 1);
    setPruebas(newPruebas);
  };

  const handleSelectChange = (event) => {
    const selectedValija = event.target.value;
    if (selectedValija !== undefined) {
      setValija(selectedValija);
    }
  };

  const handleTipoBolitaChange = (event, idxPrueba, idxResultado) => {
    const selectedTipoBolita = event.target.value;
    if (selectedTipoBolita) {
      const newPruebas = JSON.parse(JSON.stringify(pruebas));
      newPruebas[idxPrueba].resultados[idxResultado].tipoBolita = selectedTipoBolita;
      setPruebas(newPruebas);
    }
  };

  const handlePruebaChange = (value, idxPrueba, idxResultado) => {
    const newPruebas = JSON.parse(JSON.stringify(pruebas));
    newPruebas[idxPrueba].resultados[idxResultado].numero = value;
    setPruebas(newPruebas);
  };

  const formatListaPruebas = pruebas => {
    const list = pruebas.flatMap(prueba => {
      return prueba.resultados.map(resultado => {
        return {
          valija,
          idDatoSorteo,
          numero: resultado.numero,
          bolita: resultado.tipoBolita,
        };
      });
    });
    return list;
  }
  
  const handleSubmit = async () => {
    try {
      const listaSubmit = formatListaPruebas(pruebas);
      setShowLoadingModal(true);
      const response = await insertListaPrueba(listaSubmit);
      setShowLoadingModal(false);
      if (response.status === 200) {
        setShowLoadingModal(false);
        setMensaje("Pruebas guardadas exitosamente");
        setTitulo("¡Operación Exitosa!");
        setDatosEnviados(true);
        setShowSuccessModal(true);
      } else {
        setShowLoadingModal(false);
        console.log('error');
      }
    } catch (error) {
      setShowLoadingModal(false);
      setMensaje(`Error al guardar las pruebas. ${error.message}`);
      setTitulo("¡Operación Fallida!");
      setDatosEnviados(false);
      setShowFailModal(true);
    }
  };

  return (
    <>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            async (values) => {
              await handleShowConfirmation(() => handleSubmit());
            }
          }>
          {(formik, isSubmitting, isValidating, touched) => (
            <div className='container-fluid'>
              <Form onSubmit={formik.handleSubmit}>
                <div className='row'>
                  <table className='table table-bordered align-middle mt-5'>
                    <thead>
                      <tr>
                        <th colSpan={2}><h3>Pruebas realizadas antes del sorteo<br /> Números favorecidos</h3></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className='col-2'>
                          <label htmlFor="valija">Valija</label>
                          <select
                            className='form-control mx-auto'
                            id='valija'
                            name='valija'
                            value={valija}
                            onChange={handleSelectChange}
                          >
                            {valijaOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </th>
                        <FieldArray
                          name="pruebas"
                          render={(arrayHelpers) => (
                            <td>
                              {pruebas.length > 0 &&
                                pruebas.map((prueba, idxPrueba) => (
                                  <div key={idxPrueba} className="row justify-content-center mb-5">
                                    <h5>Prueba {idxPrueba + 1}</h5>
                                    <div className="row">
                                      {prueba.resultados.map((resultado, idxResultado) => (
                                        <div key={idxResultado} className="col">
                                          <label htmlFor="tipoBolita">Bolita</label>
                                          <select
                                            className='form-control mx-auto'
                                            id='tipoBolita'
                                            name='tipoBolita'
                                            value={resultado.tipoBolita}
                                            onChange={(event) => handleTipoBolitaChange(event, idxPrueba, idxResultado)}
                                          >
                                            {bolitaOptions.map(option => (
                                              <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                          </select>
                                          <label htmlFor="resultado">Resultado</label>
                                          <Field
                                            name={`pruebas[${idxPrueba}].resultados[${idxResultado}]`}
                                            value={resultado.numero}
                                            className='form-control mx-auto'
                                            validate={() => validateNumber(resultado.numero)}
                                            onChange={(event) => handlePruebaChange(event.currentTarget.value, idxPrueba, idxResultado)}
                                          />
                                          {formik.errors && formik.touched?.pruebas?.[idxPrueba]?.resultados?.[idxResultado] &&
                                            <div className='error'>{formik.errors?.pruebas?.[idxPrueba]?.resultados?.[idxResultado]}</div>
                                          }
                                        </div>
                                      ))}
                                      <i
                                        className='bi bi-x-square-fill col-1 closeX'
                                        onClick={() => eliminarPrueba(idxPrueba)}
                                      />
                                    </div>
                                  </div>
                                ))}
                              <button
                                type="button"
                                className=" row btn btn-success mb-5"
                                onClick={() => insertaPrueba(formik)}
                              >
                                Agregar Prueba
                              </button>
                            </td>
                          )}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='button-field'>
                  <button type="submit" className='btn mt-5' disabled={isSubmitting || isValidating || datosEnviados}>Registrar Pruebas</button>
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
        titulo='Guardando Pruebas'
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
        mensaje='¿Está seguro que desea registrar las pruebas?'
        handleConfirmation={handleConfirmation}
      />
    </>
  );
};

export default PruebasNTForm;
