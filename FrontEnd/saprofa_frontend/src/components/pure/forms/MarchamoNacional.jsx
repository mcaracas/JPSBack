import React, { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import './../../../styles/icon.scss';
import SuccessModal from "../../modals/SuccessModal";
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';
import { parametros } from '../../../utils/config/marchamos';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;
const idDatoSorteo = lottery?.idInterno;

// cantidad maxima de digitos para el numero de marchamo
const CANT_MAXIMA_DIGITOS = 4;

// Expresion regular para validar que el numero de marchamo sea de 5 digitos
const regex = new RegExp(`^[0-9]{${CANT_MAXIMA_DIGITOS}}$`);

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 */

const marchamoSchema = Yup.object().shape({
  aperturaS1: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  cierreS: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaS2: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaS3: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaS4: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaN: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  cierreN: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaP: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  cierreP: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaAcumFich: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  cierreAcumFich: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  aperturaAcumTula: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  cierreAcumTula: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
  noJuegan: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`),

});

let marchamoDefault = {
  idSorteo: idDatoSorteo,
  tipo: 'Apertura',
  valija: '',
  tipoMarchamo: 'Serie',
  numeroMarchamo: '1525',
}


const MarchamoNacional = (id) => {
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(() => { });
  const [checked, setChecked] = useState(false);
  const [nomenclatura, setNomenclatura] = useState('');
  const navigate = useNavigate();

  const buildMarchamoList = (values) => {

    return [
      {
        ...marchamoDefault,
        numeroMarchamo: `${nomenclatura['SERIE']}${values.aperturaS1}`,
      }
      ,
      {
        ...marchamoDefault,
        numeroMarchamo: `${nomenclatura['SERIE']}${values.aperturaS2}`,
      }
      ,
      {
        ...marchamoDefault,
        numeroMarchamo: `${nomenclatura['SERIE']}${values.aperturaS3}`,
      }
      ,
      {
        ...marchamoDefault,
        numeroMarchamo: `${nomenclatura['SERIE']}${values.aperturaS4}`,
      }
      ,
      {
        ...marchamoDefault,
        tipo: 'Cierre',
        numeroMarchamo: `${nomenclatura['SERIE']}${values.cierreS}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'Numero',
        numeroMarchamo: `${nomenclatura['NUMERO']}${values.aperturaN}`,
      }
      ,
      {
        ...marchamoDefault,
        tipo: 'Cierre',
        tipoMarchamo: 'Numero',
        numeroMarchamo: `${nomenclatura['NUMERO']}${values.cierreN}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'Premio',
        numeroMarchamo: `${nomenclatura['PREMIO']}${values.aperturaP}`,
      }
      ,
      {
        ...marchamoDefault,
        tipo: 'Cierre',
        tipoMarchamo: 'Premio',
        numeroMarchamo: `${nomenclatura['PREMIO']}${values.cierreP}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'AcumuladoFichero',
        numeroMarchamo: `${nomenclatura['OTROS']}${values.aperturaAcumFich}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'AcumuladoFichero',
        tipo: 'Cierre',
        numeroMarchamo: `${nomenclatura['OTROS']}${values.cierreAcumFich}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'AcumuladoTula',
        numeroMarchamo: `${nomenclatura['OTROS']}${values.aperturaAcumTula}`,
      }
      ,
      {
        ...marchamoDefault,
        tipoMarchamo: 'AcumuladoTula',
        tipo: 'Cierre',
        numeroMarchamo: `${nomenclatura['OTROS']}${values.cierreAcumTula}`,
      },
      {
        ...marchamoDefault,
        tipoMarchamo: 'NoJuegan',
        tipo: 'Cierre',
        numeroMarchamo: values.noJuegan ? `${nomenclatura['SERIE']}${values.noJuegan}` : null,
      },
    ];
  }

  async function obtenerParametros() {
    const response = await parametros();
		setNomenclatura(response);
  };

  useEffect(() => {
    const usuario = sessionStorage.getItem('name');
    if (!usuario) {
      sessionStorage.clear();
      navigate('/');
    }
    obtenerParametros();
  }, [navigate]);

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    isChecked ? setChecked(true) : setChecked(false);
  }

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
    navigate('/CompararVentas');
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

  const handleSubmit = async (values) => {
    try {
      const marchamoList = buildMarchamoList(values);
      setShowLoadingModal(true);
      const response = await insertMarchamo(marchamoList);
      setShowLoadingModal(false);
      if (response.status === 200) {
        setShowLoadingModal(false);
        setMensaje("Marchamos guardados exitosamente");
        setTitulo("¡Operación Exitosa!");
        setDatosEnviados(true);
        setShowSuccessModal(true);
      } else {
        setShowLoadingModal(false);
      }
    } catch (error) {
      setShowLoadingModal(false);
      setMensaje(`Error al guardar los marchamos. ${error.message}`);
      setTitulo("¡Operación Fallida!");
      setDatosEnviados(false);
      setShowFailModal(true);
    }
  }

  return (
    <>
      <div className='container'>
        <Formik
          initialValues={{}}
          validationSchema={marchamoSchema}
          onSubmit={
            async (values) => {
              await handleShowConfirmation(() => handleSubmit(values));
            }
          }>
          {({ values,
            touched,
            errors,
            isSubmitting,
            isValidating,
            handleChange,
            handleBlur }) => (
            <Form>
              <table className='table table-bordered align-middle'>
                <thead className='thead-dark'>
                  <tr>
                    <th colSpan={4}><h3>Numero de marchamo y valija</h3></th>
                  </tr>
                  <tr>
                    <th rowSpan={2}></th>
                    <th rowSpan={2}><h4>Apertura</h4></th>
                    <th colSpan={2}><h4>Cierre</h4></th>
                  </tr>
                  <tr>
                    <th>Conteo de bolitas</th>
                    <th>Marchamo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th rowSpan={4}><h4>Series</h4></th>
                    <td>
                      <label htmlFor="aperturaS1" className="label-with-icon">
                        <span className="label-text">{nomenclatura['SERIE']}</span>
                        <div className="required-icon">
                          {!touched.aperturaS1 && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaS1' name='aperturaS1' type='number' className='form-control' />
                      {errors.aperturaS1 && touched.aperturaS1 && (
                        <div className='error'>
                          <ErrorMessage name='aperturaS1'></ErrorMessage>
                        </div>
                      )}
                    </td>
                    <td rowSpan={4}></td>
                    <td rowSpan={2}>
                      <label htmlFor="cierresS" className="label-with-icon">
                        <span className="label-text">{nomenclatura['SERIE']}</span>
                        <div className="required-icon">
                          {!touched.cierresS && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='cierreS' name='cierreS' type='number' className='form-control' />
                      {
                        errors.cierreS && touched.cierreS &&
                        (
                          <div className='error'>
                            <ErrorMessage name='cierreS'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="aperturaS2" className="label-with-icon">
                        <span className="label-text">{nomenclatura['SERIE']}</span>
                        <div className="required-icon">
                          {!touched.aperturaS2 && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaS2' name='aperturaS2' type='number' className='form-control' />
                      {
                        errors.aperturaS2 && touched.aperturaS2 &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaS2'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="aperturaS3" className="label-with-icon">
                        <span className="label-text">{nomenclatura['SERIE']}</span>
                        <div className="required-icon">
                          {!touched.aperturaS3 && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaS3' name='aperturaS3' type='number' className='form-control' />
                      {
                        errors.aperturaS3 && touched.aperturaS3 &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaS3'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                    <td rowSpan={2}>
                      <span>{nomenclatura['SERIE']}</span>
                      <br />No juegan
                      <div className='row'>
                        <div className='col'>
                          <input id='noJueganCheckBox' name='noJueganCheckBox' onChange={handleCheck} type='checkbox' className='check' /> <br />
                          ¿Hay series que no juegan?
                        </div>
                        {checked && <Field id='noJuegan' name='noJuegan' type='number' className='form-control me-5' />}
                        {
                          errors.noJuegan && touched.noJuegan &&
                          (
                            <div className='error'>
                              <ErrorMessage name='noJuegan'></ErrorMessage>
                            </div>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="aperturaS4" className="label-with-icon">
                        <span className="label-text">{nomenclatura['SERIE']}</span>
                        <div className="required-icon">
                          {!touched.aperturaS4 && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaS4' name='aperturaS4' type='number' className='form-control' />
                      {
                        errors.aperturaS4 && touched.aperturaS4 &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaS4'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <th><h4>Numeros</h4></th>
                    <td>
                      <label htmlFor="aperturaN" className="label-with-icon">
                        <span className="label-text">{nomenclatura['NUMERO']}</span>
                        <div className="required-icon">
                          {!touched.aperturaN && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaN' name='aperturaN' type='number' className='form-control' />
                      {
                        errors.aperturaN && touched.aperturaN &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaN'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                    <td></td>
                    <td>
                      <label htmlFor="cierreN" className="label-with-icon">
                        <span className="label-text">{nomenclatura['NUMERO']}</span>
                        <div className="required-icon">
                          {!touched.cierreN && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='cierreN' name='cierreN' type='number' className='form-control' />
                      {
                        errors.cierreN && touched.cierreN &&
                        (
                          <div className='error'>
                            <ErrorMessage name='cierreN'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <th><h4>Premios</h4></th>
                    <td>
                      <label htmlFor="aperturaP" className="label-with-icon">
                        <span className="label-text">{nomenclatura['PREMIO']}</span>
                        <div className="required-icon">
                          {!touched.aperturaP && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaP' name='aperturaP' type='number' className='form-control' />
                      {
                        errors.aperturaP && touched.aperturaP &&
                        (
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='aperturaP'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                    <td></td>
                    <td>
                      <label htmlFor="cierreP" className="label-with-icon">
                        <span className="label-text">{nomenclatura['PREMIO']}</span>
                        <div className="required-icon">
                          {!touched.cierreP && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='cierreP' name='cierreP' type='number' className='form-control' />
                      {
                        errors.cierreP && touched.cierreP &&
                        (
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='cierreP'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  <tr>
                    <th><h4>Acumulado</h4></th>
                    <td>
                      <label htmlFor="aperturaAcumFich" className="label-with-icon">
                        <span className="label-text">{nomenclatura['OTROS']}</span>
                        <div className="required-icon">
                          {!touched.aperturaAcumFich && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaAcumFich' name='aperturaAcumFich' type='number' className='form-control' /> fichero<br />
                      {
                        errors.aperturaAcumFich && touched.aperturaAcumFich &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaAcumFich'></ErrorMessage>
                          </div>
                        )
                      }
                      <label htmlFor="aperturaAcumTula" className="label-with-icon">
                        <span className="label-text">{nomenclatura['OTROS']}</span>
                        <div className="required-icon">
                          {!touched.aperturaAcumTula && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='aperturaAcumTula' name='aperturaAcumTula' type='number' className='form-control' /> tula
                      {
                        errors.aperturaAcumTula && touched.aperturaAcumTula &&
                        (
                          <div className='error'>
                            <ErrorMessage name='aperturaAcumTula'></ErrorMessage>
                          </div>
                        )
                      }
                    </td>
                    <td colSpan={2}>
                      <label htmlFor="cierreAcumFich" className="label-with-icon">
                        <span className="label-text">{nomenclatura['OTROS']}</span>
                        <div className="required-icon">
                          {!touched.cierreAcumFich && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='cierreAcumFich' name='cierreAcumFich' type='number' className='form-control' /> fichero<br />
                      {
                        errors.cierreAcumFich && touched.cierreAcumFich &&
                        (
                          <div className='error'>
                            <ErrorMessage name='cierreAcumFich'></ErrorMessage>
                          </div>
                        )
                      }
                      <label htmlFor="cierreAcumTula" className="label-with-icon">
                        <span className="label-text">{nomenclatura['OTROS']}</span>
                        <div className="required-icon">
                          {!touched.cierreAcumTula && <AiOutlineExclamationCircle />}
                        </div>
                      </label>
                      <Field id='cierreAcumTula' name='cierreAcumTula' type='number' className='form-control' /> tula
                      {
                        errors.cierreAcumTula && touched.cierreAcumTula &&
                        <div className='error'>{errors.cierreAcumTula}</div>
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='button-field'>
                <button type="submit" className='btn' disabled={isSubmitting || isValidating || datosEnviados}>Registrar Marchamos</button>
              </div>
            </Form>
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
        titulo='Guardando Marchamos'
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

export default MarchamoNacional;
