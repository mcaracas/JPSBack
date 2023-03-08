import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/**
 * Schema for the form
 * @type {Yup.ObjectSchema<any>}
 * username: required, string
 */
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el número de cédula o residencia'),
});

/**
 * Default values for the form
 * @type {{username: string}}
 */
const initialValues = {
    username: '',
};

const MyForm = ({ errors, touched, isSubmitting }) => (
    <Form>
        <div className="form-group">
            <div className='username-field'>
                <label className='lbl' htmlFor="username">Cédula</label>
                <br></br>
                <Field name="username" type="string" id="username" placeholder="L0XXXXXXXXX" className="inp" />
                {errors.username && touched.username && (
                    <div style={{ color: 'red' }}>
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
);

MyForm.propTypes = {
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};

const Username = ({petition}) => {
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values, { petition ,setSubmitting }) => {
                    petition(values);
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {(props) => <MyForm {...props} />}
            </Formik>
        </div>
    );
};

export default Username;
