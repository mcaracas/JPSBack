import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { actaFiscalizacion } from '../../../services/axiosService';
import * as Yup from 'yup';

/**
* @type {Yup.ObjectSchema<any>}
 */
const getFirma = () => {
    const session = JSON.parse(sessionStorage.getItem('session'));
    return session.nombre + ' ' + session.apellido;
}

const validationSchema = Yup.object().shape({
    procesosConformeEstablecido: Yup.boolean(),
    otrasObservaciones: Yup.string().when('procesosConformeEstablecido', {
        is: true,
        then: Yup.string().required('Este campo es obligatorio'),
        otherwise: Yup.string().nullable(),
    }),
});


const handleSubmit = async (values) => {
    try {
        // Call an API or perform some asynchronous action here
        await actaFiscalizacion(values);
        console.log(values);
        // Display success message
        alert('Form submitted successfully!');
    } catch (error) {
        // Display error message
        alert('Error submitting form. Please try again.');
    }
};

const ConclusionesFiscalizacion = () => {
    return (
        <div className="fiscalizacion-container">
            <div className="fiscalizacion-header">
                <b>AUDITORÍA INTERNA</b>
                <br />
                <b>ACTA DE FISCALIZACIÓN</b>
                <br />
                <b>SORTEO:</b>
                <br />
            </div>

            <Formik
                initialValues={{ procesosConformeEstablecido: '', otrasObservaciones: '', detalles: '', recomendaciones: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <h5>Conclusiones de la fiscalización</h5>
                        <label>
                            Los procesos se realizaron conforme lo establecido:
                            <Field type="checkbox" name="procesosConformeEstablecido" value="si" />
                        </label>
                        <label>
                            Otras:
                            <Field type="text" name="otrasObservaciones" />
                            <ErrorMessage name="otrasObservaciones" />
                        </label>

                        <h6>Detallar:</h6>
                        <label>
                            <Field component="textarea" name="detalles" rows="4" cols="50" />
                        </label>

                        <h5>Recomendaciones de la fiscalización</h5>
                        <label>
                            Ninguna
                            <Field type="checkbox" name="recomendaciones" value="ninguna" />
                        </label>
                        <label>
                            Los resultados evidenciados en el sorteo serán analizados para ser eventualmente valorados en la formulación de un oficio de advertencia/asesoría o bien un informe de auditoría
                            <Field component="textarea" name="resultadosSorteo" rows="4" cols="50" />
                        </label>

                        <h5>Marcas de Auditoría:</h5>
                        <ul>
                            <li>
                                <label>
                                    √ Cotejado con el documento
                                </label>
                            </li>
                            <li>
                                <label>
                                    N/A: No aplica
                                </label>
                            </li>
                        </ul>

                        <p>Fiscalizador de la Auditoría Interna</p>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ConclusionesFiscalizacion;
