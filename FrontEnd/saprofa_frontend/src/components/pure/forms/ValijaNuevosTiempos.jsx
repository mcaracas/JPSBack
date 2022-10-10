import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

    const pruebasSchema = Yup.object().shape(
        {
            valija : Yup.string().required('Valija requerida'),
            bolita1 : Yup.number().required('Campo requerido'),
            bolita2 : Yup.number().required('Campo requerido'),
            bolita3 : Yup.number().required('Campo requerido'),
            bolita4 : Yup.number().required('Campo requerido'),
            bolita5 : Yup.number().required('Campo requerido')
        }
    );

const ValijaNuevosTiempos = () => {
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
                    handleBlur
                }) =>(
                    <Form>
                        <table className='table table-bordered align-middle'>
                            <thead>
                                <tr>
                                    <th colSpan={6}>Pruebas de bolitas Nuevos Tiempos y Reventados</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Valija <br/><Field id='valija' name='valija' type='text' className='form-control'/>
                                            {
                                                errors.valija && touched.valija && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='valija'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </th>
                                    <td><Field id='bolita1' name='bolita1' type='number' className='form-control'/>
                                            {
                                                errors.bolita1 && touched.bolita1 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='bolita1'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </td>
                                    <td><Field id='bolita2' name='bolita2' type='number' className='form-control'/>
                                            {
                                                errors.bolita2 && touched.bolita2 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='bolita2'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </td>
                                    <td><Field id='bolita3' name='bolita3' type='number' className='form-control'/>
                                            {
                                                errors.bolita3 && touched.bolita3 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='bolita3'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </td>
                                    <td><Field id='bolita4' name='bolita4' type='number' className='form-control'/>
                                            {
                                                errors.bolita4 && touched.bolita4 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='bolita4'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </td>
                                    <td><Field id='bolita5' name='bolita5' type='number' className='form-control'/>
                                            {
                                                errors.bolita5 && touched.bolita5 && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='bolita5'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default ValijaNuevosTiempos;
