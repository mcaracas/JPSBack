import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
        bolita5 : Yup.number().required('Campo requerido')
    }
);

const ValijaNuevosTiempos = () => {
    const navigate = useNavigate();
    useEffect(() => {
		const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
	});
    
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
                    <div className='container'>
                        <h1>Pruebas Nuevos Tiempos</h1>
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
                                                        <div style={{color:'red'}}>
                                                            <ErrorMessage name='valija'></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                        </th>
                                        <td><Field id='bolita1' name='bolita1' type='number' className='form-control'/>
                                                {
                                                    errors.bolita1 && touched.bolita1 && 
                                                    (
                                                        <div style={{color:'red'}}>
                                                            <ErrorMessage name='bolita1'></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                        </td>
                                        <td><Field id='bolita2' name='bolita2' type='number' className='form-control'/>
                                                {
                                                    errors.bolita2 && touched.bolita2 && 
                                                    (
                                                        <div style={{color:'red'}}>
                                                            <ErrorMessage name='bolita2'></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                        </td>
                                        <td><Field id='bolita3' name='bolita3' type='number' className='form-control'/>
                                                {
                                                    errors.bolita3 && touched.bolita3 && 
                                                    (
                                                        <div style={{color:'red'}}>
                                                            <ErrorMessage name='bolita3'></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                        </td>
                                        <td><Field id='bolita4' name='bolita4' type='number' className='form-control'/>
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
                                    </tr>
                                </tbody>
                            </table>
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


export default ValijaNuevosTiempos;
