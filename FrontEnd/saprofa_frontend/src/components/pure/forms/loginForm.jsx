import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getHoraIngreso, login } from '../../../services/axiosService';
import { Link, useNavigate } from 'react-router-dom';
/**
 * Schema for the form
 * @type {Yup.ObjectSchema<any>}
 * username: required, string
 * password: required, string, 8 caracters minimum
 */
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el número de cédula o residencia'),
    password: Yup.string().min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
    .matches(/[0-9]/, 'La clave requiere como mínimo un número')
    .matches(/[a-z]/, 'La clave requiere una letra minúscula')
    .matches(/[A-Z]/, 'La clave requiere una letra mayúscula')
    .matches(/[^\w]/, 'La clave requiere un caracter especial')
    .required('Debe ingresar la contraseña, recuerde la contraseña contiene al menos una letra mayúscula, una minúscula, un número y un cáracter especial.'),
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

    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    login(values) //Using axios to make the request
                        .then((response) => {   // If login is successful
                            getHoraIngreso()    // Get the current date and time
                                .then((response) => {
                                    sessionStorage.setItem('HoraIngreso',response.data); // Save login time in session storage
                                    navigate('/ChooseLottery');// Redirect to chooseLottery page
                                })
                        }).catch((error) => {   // If login fails
                            sessionStorage.removeItem('HoraIngreso'); // Remove login time from session storage
                            console.log('Error: ', error);
                            if (error.response.status === 401) {    // If the error is 401 (Unauthorized)
                                console.log('Error: ', error);
                            } else if (error.response.status === 400) { // Invalid credentials
                                alert('Usuario o contraseña incorrectos');
                            } else if(error.response.status === 500){   // Server error
                                console.log('Server error:', error);
                            }
                        }
                        );
                }}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <div className='username-field'>
                                <label className='lbl' htmlFor="username">Cédula</label>
                                <br></br>
                                <Field name="username" type="string" id="username"
                                    placeholder="L0XXXXXXXXX"
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
            <div className='mt-3'>
                <Link to='/Register' className='link'>¿No tienes una cuenta? Registrarse</Link>
            </div>
        </div>
    );
}

export default LoginForm;
