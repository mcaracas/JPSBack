import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { getDatosParticipantes } from '../../../services/axiosService';


// check the props. should include num_sorteo, tipo_loteria
const DatosParticipantes = ({ num_sorteo, tipo_loteria }) => {
  const obtenerDatosAdministracion = (idSorteo) => {
    // TODO: check the value returned by the endpoint
    const datos = getDatosParticipantes(idSorteo);
    setGOperaciones(datos.GOperaciones);
    setGProduccionYComercializacion(datos.GProduccionYComercializacion);
    setGerencia(datos.Gerencia);
    setJuez(datos.Juez);
    setPresentadorDelSorteo(datos.PresentadorDelSorteo);
    setPrompter(datos.Prompter);
    setEquipoDeComputo(datos.EquipoDeComputo);
  }

  const getIdSorteo = () => {
    return `${tipo_loteria}${num_sorteo}`;
  };

  const [GOperaciones, setGOperaciones] = useState('');
  const [GProduccionYComercializacion, setGProduccionYComercializacion] = useState('');
  const [Gerencia, setGerencia] = useState('');
  const [Juez, setJuez] = useState('');
  const [PresentadorDelSorteo, setPresentadorDelSorteo] = useState('');
  const [Prompter, setPrompter] = useState('');
  const [EquipoDeComputo, setEquipoDeComputo] = useState('');

  return (
    <div className="container">
      <Formik
        initialValues={{
          GOperaciones: '',
          GProduccionYComercializacion: '',
          Gerencia: '',
          Juez: '',
          PresentadorDelSorteo: '',
          Prompter: '',
          EquipoDeComputo: ''
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
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
                    <button className="btn mt-5 mb-5" onClick={obtenerDatosAdministracion(getIdSorteo())}>Obtener Participantes</button>
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
