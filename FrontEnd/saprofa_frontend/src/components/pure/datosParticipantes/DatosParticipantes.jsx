import { Formik, Field, Form } from 'formik';
import { useState, useRef } from 'react';
import { getDatosParticipantes } from '../../../services/axiosService';

const initialValues = {
  GOperaciones: '',
  GProduccionYComercializacion: '',
  Gerencia: '',
  Juez: '',
  PresentadorDelSorteo: '',
  Prompter: '',
  EquipoDeComputo: ''
};

// check the props. should include num_sorteo, tipo_loteria
const DatosParticipantes = ({ num_sorteo, tipo_loteria }) => {
  
  const [formData, setFormData] = useState(initialValues);

  const formRef = useRef(null);

  const obtenerDatosAdministracion = async (idSorteo) => {
    // TODO: check the value returned by the endpoint
    try{
      const datos = getDatosParticipantes(1);
      setFormData({...datos});
      if (datos) {
          const formValues = { ...datos };
          formRef.current.setValues(formValues);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getIdSorteo = () => {
    return `${tipo_loteria}${num_sorteo}`;
  };

  return (
    <div className="container">
      <Formik
        initialValues={formData}
        onSubmit={(values) => {
          //Todo: check the endpoint
          // insertDatosAdministracion(values, getIdSorteo());
          console.log(values);
        }}
        innerRef={formRef}
      >
        {({ errors, }) => (
          <div className='container-fluid col'>
            <Form>
              <h2>Representantes</h2>
              <div className="row">
                <div className="col-8">
                  <div className="col-12 col-md-6 m-4">
                    <h5>Por G. Operaciones</h5>
                    <Field className="form-control" name="GOperaciones" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Por G. Produccion y Comercializacion</h5>
                    <Field className="form-control" name="GProduccionYComercializacion" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Por Gerencia</h5>
                    <Field className="form-control" name="Gerencia" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Por Juez</h5>
                    <Field className="form-control" name="Juez" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Presentador del Sorteo</h5>
                    <Field className="form-control" name="PresentadorDelSorteo" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Prompter</h5>
                    <Field className="form-control" name="Prompter" />
                  </div>
                  <div className="col-12 col-md-6 m-4">
                    <h5>Equipo de Computo</h5>
                    <Field className="form-control" name="EquipoDeComputo" />
                  </div>
                </div>
                <div className='col-2'>
                  <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                    <button className="btn mt-5 mb-5" type="button" onClick={()=>obtenerDatosAdministracion(getIdSorteo())}>Obtener Participantes</button>
                    <button className="btn mt-5 mb-5" type="submit">Registar Datos de Participantes</button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default DatosParticipantes;
