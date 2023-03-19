import React, { useState } from "react";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import { insertListaPrueba } from '../../../services/axiosService';
import SuccessModal from "../../modals/SuccessModal";

// TODO: Esto se debe recibir desde el Backend para ser dinámico
const CANT_BOLITAS = 3;
const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;
const idDatoSorteo = lottery?.idInterno;

const createPruebasObj = cant => {
  return Array(CANT_BOLITAS).fill({ numero: '' });
};

const pruebaInicial = {
  valija: "A",
  resultados: createPruebasObj(CANT_BOLITAS),
};

const initialValues = {
  pruebas: [pruebaInicial],
};

const valijaOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
];

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Número requerido';
  } else if (!/^[0-9]$/.test(value)) {
    error = 'Debe ser un número entre 0 y 9';
  }
  return error;
}

const Pruebas3MonazosForm = () => {

  const [valija, setValija] = useState("A");
  const [pruebas, setPruebas] = useState(initialValues.pruebas);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
  }

  const insertaPrueba = (formik) => {
    const newPrueba = {
      valija: valija,
      resultados: createPruebasObj(CANT_BOLITAS),
    };
    setPruebas([...pruebas, newPrueba]);
    formik.setFieldValue('pruebas', [...pruebas, newPrueba]); // update formik values
    console.log(pruebas);
  };

  const eliminarPrueba = (idx) => {
    const newPruebas = [...pruebas];
    newPruebas.splice(idx, 1);
    setPruebas(newPruebas);
  };

  const handleSelectChange = (event) => {
    const selectedValija = event.target.value;
    if (selectedValija !== undefined) {
      setValija(selectedValija);
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
        };
      });
    });
    return list;
  }

  return (
    <>
      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={
            async (values) => {
              try {
                const listaSubmit = formatListaPruebas(pruebas);
                console.log('toSubmit: ', listaSubmit)
                const response = await insertListaPrueba(listaSubmit);
                if (response.status === 200) {
                  setMensaje("Pruebas guardadas exitosamente");
                  setTitulo("¡Operación Exitosa!");
                  setDatosEnviados(true);
                  setShowSuccessModal(true);
                } else {
                  console.log('error');
                }
              } catch (error) {
                console.log(error);
              }
            }
          }>
          {( formik, isSubmitting, isValidating ) => (
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
                                    {prueba.resultados.map((resultado, idxResultado) => (
                                      <div key={idxResultado} className="col">
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
        handleClose={handleCloseSuccessModal}
        titulo={titulo}
        mensaje={mensaje}
      />
    </>
  );
};

export default Pruebas3MonazosForm;
