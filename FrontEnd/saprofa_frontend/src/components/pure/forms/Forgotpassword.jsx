import React from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { getMail } from '../../../services/axiosService';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Schema for the form
 * @type {Yup.ObjectSchema<any>}
 * username: required, string
*/
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el número de cédula o residencia')
});

const ForgotPassword = () => {

    /**
     * Default values for the form
     * @type {{username: string}}
     */
    const initialValues = {
        username: ''
    }

    const navigate = useNavigate();
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={
                    async (values) => {
                        try {
                            const response = await getMail(values);
                            navigate('/ConfirmationCodeModal', { state: { code: response.data, username: values.username } });
                        } catch (error) {
                            if (error.response.status === 500) {
                                console.log('Server error:', error);
                            }
                        }
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
                                {errors.username && touched.username && (
                                    <div style={{ color: "red" }}>
                                        <ErrorMessage name="username" />
                                    </div>
                                )}
                            </div>
                            <br></br>
                            <div className='button-field'>
                                <button type="submit" className='btn'>Enviar</button>
                                {isSubmitting ? <p>Submitting...</p> : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className='mt-3'>
                <Link to='/'>¿Ya tienes una cuenta? Inicia sesión</Link>
            </div>
            <div className='mt-3'>
                <Link to='/Register' className='link'>¿No tienes una cuenta? Registrarse</Link>
            </div>
        </div >
    );
}
export default ForgotPassword;
