import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el nombre de usuario'),
    password: Yup.string().min(8, 'La contraseña debe tener un minimo de 8 caracteres').required('Debe ingresar la contraseña')
});


const LoginForm = () => {

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
                    await new Promise(r => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                }}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <div className='username-field'>
                                <label className='lbl' htmlFor="username">Usuario</label>
                                <br></br>
                                <Field name="username" type="text" id="username"
                                    placeholder="Numero de Cédula o Residencia"
                                    className="inp" />
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
                                {errors.password && touched.password && (
                                    <div style={{ color: "red" }}>
                                        <ErrorMessage name="password" />
                                    </div>
                                )}
                            </div>
                            <br></br>
                            <div className='button-field'>
                                <button type="submit" className='btn'>Iniciar Sesión</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;
