import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import '../../../styles/pruebas/pruebasForms.sass'

// TODO: check props to receive and information to send to Backend

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * valija: string, required
 * all the other fields must be number and required
 */

const pruebasSchema = Yup.object().shape(
    {
        valija : Yup.string().required('Valija requerida'),
        bolita1 : Yup.number().required('Campo requerido'),
        bolita2 : Yup.number().required('Campo requerido'),
        bolita3 : Yup.number().required('Campo requerido'),
        bolita4 : Yup.number().required('Campo requerido'),
        bolita5 : Yup.number().required('Campo requerido'),
        bolita6 : Yup.number().required('Campo requerido'),
        bolita7 : Yup.number().required('Campo requerido'),
        bolita8 : Yup.number().required('Campo requerido'),
        bolita9 : Yup.number().required('Campo requerido')
    }
);


const Valija3Monazos = () => {
    return (
        <div className='container'>
            <Formik
                initialValues={{}}
                validationSchema={pruebasSchema}
                onSubmit={()=>{}}
                >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <div className='container'>
                            <h1>Pruebas 3 Monazos</h1>
                            <Form>
                                <div className='row'>
                                    <table className='table table-bordered align-middle col'>
                                        <thead>
                                            <tr>
                                                <th colSpan={11}>Pruebas realizadas antes del sorte<br/> Números favorecidos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Valija <br/><Field id='valija' name='valija' type='text' className='form-control'/>
                                                        {
                                                            errors.valija && touched.valija && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='valija'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </th>
                                                <td>
                                                    <div className='row'>
                                                        <Field id='bolita1' name='bolita1' type='number' className='form-control col m-4'/>
                                                        <i className='bi bi-x-square-fill col-1 me-3' style={{ color: 'red' }}></i>
                                                    </div>
                                                        {
                                                            errors.bolita1 && touched.bolita1 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita1'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td>
                                                <div className='row'>
                                                    <Field id='bolita2' name='bolita2' type='number' className='form-control col m-4'/>
                                                    <i className='bi bi-x-square-fill col-1 me-3' style={{ color: 'red' }}></i>
                                                </div>
                                                        {
                                                            errors.bolita2 && touched.bolita2 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita2'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                {/* <td><Field id='bolita3' name='bolita3' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita3 && touched.bolita3 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita3'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td> */}
                                                {/* <td><Field id='bolita4' name='bolita4' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita4 && touched.bolita4 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita4'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita5' name='bolita5' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita5 && touched.bolita5 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita5'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita6' name='bolita6' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita6 && touched.bolita6 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita6'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita7' name='bolita7' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita7 && touched.bolita7 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita7'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita8' name='bolita8' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita8 && touched.bolita8 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita8'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita9' name='bolita9' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita9 && touched.bolita9 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita9'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='button-field col-1'>
                                        <button type='button' className='btn btn-success btn-sm'>Agregar Prueba</button>
                                        {isSubmitting ? <p>Submitting...</p> : null}
                                    </div>
                                </div>
                                <div className='button-field'>
                                    <button type="submit" className='btn'>Registrar Pruebas</button>
                                    {isSubmitting ? <p>Submitting...</p> : null}
                                </div>
                            </Form>
                        </div>
                    )}
            </Formik>
        </div>
    );
};


Valija3Monazos.propTypes = {

};


export default Valija3Monazos;
