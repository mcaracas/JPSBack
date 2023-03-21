import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState, useRef } from 'react';
import { getDatosParticipantes, insertDatosAdministracion } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';


const initialValues = {
  id : '',
  GOperaciones: '',
  GProduccionYComercializacion: '',
  Gerencia: '',
  Juez: '',
  PresentadorDelSorteo: '',
  Prompter: '',
  EquipoDeComputo: ''
};

// check the props. should include num_sorteo, tipo_loteria
const DatosParticipantes = ({ idSorteo }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const formRef = useRef(null);

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
  }

  const obtenerDatosAdministracion = async (idSorteo) => {
    try{
      // TODO: wait for the endpoint to receive the idSorteo, 
      // TODO: meanwhile is receiving all data, it has to retrieve data from administracion
      const response = await getDatosParticipantes(1);
      // el BE devuelve un array con todos los datos porque no se esta pidiendo un id especifico
      const datos = response.data[6];
      const datosMapeados = {
        // id: datos.id_datos_previos, has to be added by session storage
        GOperaciones: datos.gerenteOperaciones,
        GProduccionYComercializacion: datos.gerenteProduccion,
        Gerencia: datos.gerencia,
        Juez: datos.juez,
        PresentadorDelSorteo: datos.presentador,
        Prompter: datos.prompter,
        EquipoDeComputo: datos.equipoComputo ,
      };
      console.log("datosMapeados: ",datosMapeados);
      setFormData({...datosMapeados});
      if (datos) {
          const formValues = { ...datosMapeados };
          formRef.current.setValues(formValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="container">
      <Formik
        initialValues={formData}
        validate={values => {
          const errors = {};
          if (!values.GOperaciones) {
            errors.GOperaciones = 'Este campo es requerido';
          }
          if (!values.GProduccionYComercializacion) {
            errors.GProduccionYComercializacion = 'Este campo es requerido';
          }
          if (!values.Gerencia) {
            errors.Gerencia = 'Este campo es requerido';
          }
          if (!values.Juez) {
            errors.Juez = 'Este campo es requerido';
          }
          if (!values.PresentadorDelSorteo) {
            errors.PresentadorDelSorteo = 'Este campo es requerido';
          }
          if (!values.Prompter) {
            errors.Prompter = 'Este campo es requerido';
          }
          if (!values.EquipoDeComputo) {
            errors.EquipoDeComputo = 'Este campo es requerido';
          }

          return errors;
        }}
        onSubmit={ async (values, { setSubmitting, handleFormSubmit }) => {
          try{
            const response = await insertDatosAdministracion({
              gerenteOperaciones : values.GOperaciones,
              gerenteProduccion :  values.GProduccionYComercializacion,
              gerencia : values.Gerencia,
              juez : values.Juez,
              presentador : values.PresentadorDelSorteo,
              prompter : values.Prompter,
              equipoComputo : values.EquipoDeComputo,
            });
            if(response.status === 200){
              setSubmitting(false);
              setDatosEnviados(true);
              setMensaje("Datos de Participantes guardados exitosamente");
              setTitulo("Datos de Participantes");
              //alert("Datos de administracion guardados");
              setShowSuccessModal(true);
              console.log("Datos de administracion guardados",values);
            }
          } catch (error) {
            console.log(error);
          }
        }}
        innerRef={formRef}
      >
        {({ errors, isSubmitting, isValidating }) => (
          <div className='container-fluid col'>
            <Form>
              <div className="row">
                <div className="col-8">
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Por G. Operaciones</h5>
                    <Field className="form-control" name="GOperaciones" />
                    <ErrorMessage name="GOperaciones" component={() => {
                      return <div className='error'>{errors.GOperaciones}</div>
                    }}/>
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Por G. Produccion y Comercializacion</h5>
                    <Field className="form-control" name="GProduccionYComercializacion" />
                    <ErrorMessage name="GProduccionYComercializacion" component={() => {
                      return <div className='error'>{errors.GProduccionYComercializacion}</div>
                    }}/> 
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Por Gerencia</h5>
                    <Field className="form-control" name="Gerencia" />
                    <ErrorMessage name="Gerencia" component={() => {
                      return <div className='error'>{errors.Gerencia}</div>
                    }}/>
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Por Juez</h5>
                    <Field className="form-control" name="Juez" />
                    <ErrorMessage name="Juez" component={() => {
                      return <div className='error'>{errors.Juez}</div>
                    }}/>
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Presentador del Sorteo</h5>
                    <Field className="form-control" name="PresentadorDelSorteo" />
                    <ErrorMessage name="PresentadorDelSorteo" component={() => {
                      return <div className='error'>{errors.PresentadorDelSorteo}</div>
                    }}/>
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Prompter</h5>
                    <Field className="form-control" name="Prompter" />
                    <ErrorMessage name="Prompter" component={() => {
                      return <div className='error'>{errors.Prompter}</div>
                    }}/>
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5 className='text-start'>Equipo de Computo</h5>
                    <Field className="form-control" name="EquipoDeComputo" />
                    <ErrorMessage name="EquipoDeComputo" component={() => {
                      return <div className='error'>{errors.EquipoDeComputo}</div>
                    }}/>
                  </div>
                </div>
                <div className='col-2'>
                  <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                    <button className="btn mt-5 mb-5" name='obtenerDatos' type="button" onClick={()=>obtenerDatosAdministracion(idSorteo)}>Obtener Participantes</button>
                    <button className="btn mt-5 mb-5" disabled={isSubmitting || isValidating || datosEnviados} type="submit" onClick={()=>{insertDatosAdministracion()}}>Registar Datos de Participantes</button>
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
      handleClose={handleCloseSuccessModal}
      titulo = {titulo}
      mensaje = {mensaje}
      />
    </>
  );
}

export default DatosParticipantes;
