import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../services/axiosService';

/**
 * Schema for the form
 * @type {Yup.ObjectSchema<any>}
 * username: required, string
 * password: required, string, 8 caracters minimum
 */
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el nombre de usuario'),
    password: Yup.string().min(8, 'La contraseña debe tener un mínimo de 8 caracteres').required('Debe ingresar la contraseña')
});


const LoginForm = () => {

    /**
     * Default values for the form
     * @type {{password: string, username: string}}
     */
    const initialValues = {
        username: '',
        password: ''
    } 
    

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={async (values) => { 
                    login(values.username, values.password) //Using axios to make the request
                        .then((response) => {   // If login is successful
                            console.log('Status Code: ',response.status);
                        }).catch((error) => {   // If login fails
                            //sessionStorage.removeItem('token');
                            console.log('Error: ',error);
                        }
                    );
                }}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <div className='username-field'>
                                <label className='lbl' htmlFor="username">Usuario</label>
                                <br></br>
                                <Field name="username" type="text" id="username"
                                    placeholder="Numero de Cédula o Residencia"
                                    className="inp" />
                                {/* If the username field is touched, but the 
                                    text is not given */}
                                {errors.username && touched.username && (
                                    <div style={{ color: "red" }}>
                                        <ErrorMessage name="username" />
                                    </div>
                                )}
                            </div>
                            <div className='password-field'>
                                <label className='lbl' htmlFor="password">Contraseña</label>
                                <br></br>
                                <Field name="password" type="password" id="password"
                                    placeholder="Contraseña" 
                                    className="inp" />
                                {/* If the password field is touched, but the
                                    text is not given */}
                                {errors.password && touched.password && (
                                    <div style={{ color: "red" }}>
                                        <ErrorMessage name="password" />
                                    </div>
                                )}
                            </div>
                            <br></br>
                            <div className='button-field'>
                                <button type="submit" className='btn'>Iniciar Sesión</button>
                                {isSubmitting ? <p>Submitting...</p> : null}
                            </div>
                            
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;