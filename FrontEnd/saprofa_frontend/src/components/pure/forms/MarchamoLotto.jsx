import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// TODO: check props to receive and information to send to Backend

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 * except for contingencia, this is optional
 */

const marchamoSchema = Yup.object().shape({
    tomoAnterior: Yup.number().required('El campo es requerido'),
    tomoActual: Yup.number().required('El campo es requerido'),
    apertura: Yup.number().required('El campo es requerido'),
    cierre: Yup.number().required('El campo es requerido'),
    contingencia: Yup.number()
});

const MarchamoLotto = () => {
    return (
        <div className='container'>
            <Formik
                initialValues={{}}
                validationSchema={marchamoSchema}
                onSubmit={()=>{}}
                >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <Form>
                            <table className='table table-bordered align-middle'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th rowSpan={2} colSpan={2}>Número de Acta donde se consigna el resultado oficial del sorteo, suscrita por los fiscalizadores del Sorteo</th>
                                        <th colSpan={3}>Número de marchamo para el fichero</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Ficheros en uso</th>
                                        <th>Ficheros de contingencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sorteo anterior</td>
                                        <td>Tomo <Field id='tomoAnterior' name='tomoAnterior' type='number' className='form-control'/>
                                            {
                                                errors.tomoAnterior && touched.tomoAnterior && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='tomoAnterior'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>Apertura</td>
                                        <td>JPS-SLE-000 <Field id='apertura' name='apertura' type='number' className='form-control'/>
                                            {
                                                errors.apertura && touched.apertura && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='apertura'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td rowSpan={2}>JPS-SLE-000 <Field id='contingencia' name='contingencia' type='number' className='form-control'/></td>
                                    </tr>
                                    <tr>
                                        <td>Sorteo actual</td>
                                        <td>Tomo <Field id='tomoActual' name='tomoActual' type='number' className='form-control'/>
                                            {
                                                errors.tomoActual && touched.tomoActual && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='tomoActual'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>Cierre</td>
                                        <td>JPS-SLE-000 <Field id='cierre' name='cierre' type='number' className='form-control'/>
                                            {
                                                errors.cierre && touched.cierre && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierre'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    )}
            </Formik>
        </div>
    );
};


MarchamoLotto.propTypes = {

};


export default MarchamoLotto;
