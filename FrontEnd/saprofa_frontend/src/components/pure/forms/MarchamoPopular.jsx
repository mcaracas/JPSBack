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
    aperturaS1 : Yup.number().required('El campo es requerido'),
    cierreS : Yup.number().required('El campo es requerido'),
    aperturaS2 : Yup.number().required('El campo es requerido'),
    aperturaS3 : Yup.number().required('El campo es requerido'),
    aperturaS4 : Yup.number().required('El campo es requerido'),
    aperturaN: Yup.number().required('El campo es requerido'),
    cierreN: Yup.number().required('El campo es requerido'),
    aperturaAcumFich: Yup.number().required('El campo es requerido'),
    cierreAcumFich: Yup.number().required('El campo es requerido'),
    aperturaAcumTula: Yup.number().required('El campo es requerido'),
    cierreAcumTula: Yup.number().required('El campo es requerido')

});

const MarchamoPopular = (marchamoApertura) => {
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
                                        <th colSpan={3}>Numero de marchamo y valija </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Apertura</th>
                                        <th>Cierre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th rowSpan={4}>Series</th>
                                        <td >JPS-SLT-S-0000 <Field id='aperturaS1' name='aperturaS1' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS1 && touched.aperturaS1 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS1'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td rowSpan={4}>JPS-SLT-S-0000 <Field id='cierreS' name='cierreS' type='number' className='form-control'/>
                                            {
                                                errors.cierreS && touched.cierreS && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreS'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS2' name='aperturaS2' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS2 && touched.aperturaS2 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS2'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS3' name='aperturaS3' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS3 && touched.aperturaS3 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS3'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS4' name='aperturaS4' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS4 && touched.aperturaS4 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS4'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Numeros</th>
                                        <td>JPS-SLT-N-0000 <Field id='aperturaN' name='aperturaN' type='number' className='form-control'/>
                                            {
                                                errors.aperturaN && touched.aperturaN && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLT-N-0000 <Field id='cierreN' name='cierreN' type='number' className='form-control'/>
                                            {
                                                errors.cierreN && touched.cierreN && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Acumulado</th>
                                        <td>
                                            JPS-OTROS 000 <Field id='aperturaAcumFich' name='aperturaAcumFich' type='number' className='form-control'/> fichero<br/>
                                            {
                                                errors.aperturaAcumFich && touched.aperturaAcumFich && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='aperturaAcumTula' name='aperturaAcumTula' type='number' className='form-control'/> tula
                                            {
                                                errors.aperturaAcumTula && touched.aperturaAcumTula && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaAcumTula'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                        </td>
                                        <td colSpan={2}>
                                        JPS-OTROS 000 <Field id='cierreAcumFich' name='cierreAcumFich' type='number' className='form-control'/> fichero<br/>
                                            {
                                                errors.cierreAcumFich && touched.cierreAcumFich && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='cierreAcumTula' name='cierreAcumTula' type='number' className='form-control'/> tula
                                            {
                                                errors.cierreAcumTula && touched.cierreAcumTula && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreAcumTula'></ErrorMessage>
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


MarchamoPopular.propTypes = {
    marchamoApertura: PropTypes.string.isRequired,
};


export default MarchamoPopular;
