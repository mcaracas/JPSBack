import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const marchamoSchema = Yup.object().shape({
    aperturaS1 : Yup.number().required('El campo es requerido'),
    cierreS : Yup.number().required('El campo es requerido'),
    aperturaS2 : Yup.number().required('El campo es requerido'),
    aperturaS3 : Yup.number().required('El campo es requerido'),
    aperturaS4 : Yup.number().required('El campo es requerido'),
    aperturaN: Yup.number().required('El campo es requerido'),
    cierreN: Yup.number().required('El campo es requerido'),
    aperturaP: Yup.number().required('El campo es requerido'),
    cierreP: Yup.number().required('El campo es requerido'),
    aperturaAcumFich: Yup.number().required('El campo es requerido'),
    cierreAcumFich: Yup.number().required('El campo es requerido'),
    aperturaAcumTula: Yup.number().required('El campo es requerido'),
    cierreAcumTula: Yup.number().required('El campo es requerido')

});

const MarchamoNacional = ({marchamoApertura}) => {
    return (
        <div>
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
                            <table className='table table-bordered'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th colSpan={4}>Numero de marchamo y valija </th>
                                    </tr>
                                    <tr>
                                        <th rowSpan={2}></th>
                                        <th rowSpan={2}>Apertura</th>
                                        <th colSpan={2}>Cierre</th>
                                    </tr>
                                    <tr>
                                        <th>Conteo de bolitas</th>
                                        <th>Marchamo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th rowSpan={4}>Series</th>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS1' name='aperturaS1' type='number'/>
                                            {
                                                errors.aperturaS1 && touched.aperturaS1 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaS1'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td rowSpan={4}></td>
                                        <td rowSpan={4}>JPS-SLT-S-0000 <Field id='cierreS' name='cierreS' type='number'/>
                                            {
                                                errors.cierreS && touched.cierreS && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierreS'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS2' name='aperturaS2' type='number'/>
                                            {
                                                errors.aperturaS2 && touched.aperturaS2 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaS2'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS3' name='aperturaS3' type='number'/>
                                            {
                                                errors.aperturaS3 && touched.aperturaS3 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaS3'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS4' name='aperturaS4' type='number'/>
                                            {
                                                errors.aperturaS4 && touched.aperturaS4 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaS4'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Numeros</th>
                                        <td>JPS-SLT-N-0000 <Field id='aperturaN' name='aperturaN' type='number'/>
                                            {
                                                errors.aperturaN && touched.aperturaN && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td></td>
                                        <td>JPS-SLT-N-0000 <Field id='cierreN' name='cierreN' type='number'/>
                                            {
                                                errors.cierreN && touched.cierreN && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierreN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Premios</th>
                                        <td>JPS-SLT-P-0000 <Field id='aperturaP' name='aperturaP' type='number'/>
                                            {
                                                errors.aperturaP && touched.aperturaP && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaP'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td></td>
                                        <td>JPS-SLT-P-0000 <Field id='cierreP' name='cierreP' type='number'/>
                                            {
                                                errors.cierreP && touched.cierreP && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierreP'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Acumulado</th>
                                        <td>
                                            JPS-OTROS 000 <Field id='aperturaAcumFich' name='aperturaAcumFich' type='number'/> fichero<br/>
                                            {
                                                errors.aperturaAcumFich && touched.aperturaAcumFich && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='aperturaAcumTula' name='aperturaAcumTula' type='number'/> tula
                                            {
                                                errors.aperturaAcumTula && touched.aperturaAcumTula && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaAcumTula'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                        </td>
                                        <td colSpan={2}>
                                        JPS-OTROS 000 <Field id='cierreAcumFich' name='cierreAcumFich' type='number'/> fichero<br/>
                                            {
                                                errors.cierreAcumFich && touched.cierreAcumFich && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierreAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='cierreAcumTula' name='cierreAcumTula' type='number'/> tula
                                            {
                                                errors.cierreAcumTula && touched.cierreAcumTula && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierreAcumTula'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Custodia de la totalidad de las bolitas en el cuarto de ficheros: hora: _______</p>
                            <p>Hora de finalización: ________</p>
                            <p>Observaciones:</p>
                            <Field id='observaciones' type='textarea'/>
                        </Form>
                    )}
            </Formik>
        </div>
    );
};


MarchamoNacional.propTypes = {
    marchamoApertura : PropTypes.string.isRequired,
};


export default MarchamoNacional;
