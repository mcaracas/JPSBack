import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../../services/axiosService';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getParametero } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';
/**
 * Schema for the form
 * @type {Yup.ObjectSchema<any>}
 * username: required, string
 * password: required, string, 8 caracters minimum
 */
const registerSchema = Yup.object().shape({
    username: Yup.string().required('Debe ingresar el número de cédula o residencia'),
    name: Yup.string().required('Debe ingresar su nombre'),
    password: Yup.string().min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
        .matches(/[0-9]/, 'La clave requiere como mínimo un número')
        .matches(/[a-z]/, 'La clave requiere una letra minúscula')
        .matches(/[A-Z]/, 'La clave requiere una letra mayúscula')
        .matches(/[^\w]/, 'La clave requiere un caracter especial')
        .required('Debe ingresar la contraseña, recuerde la contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un cáracter especial.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Debe confirmar la contraseña')
})

const RegisterForm = () => {

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [item, setItem] = useState()
    const navigate = useNavigate()

    /**
     * Default values for the form
     * @type {{password: string, username: string,confirmPassword: string}}
     */

    const initialValues = {
        username: '',
        name: '',
        password: '',
        confirmPassword: ''
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false)
        navigate('/')
    }

    const getParameteroResponse = async () => {
        try {
            const response = await getParametero()
            setItem(response.data)
            return response
        }
        catch (error) {
            setTitulo('Operación fallida')
            setMensaje('No se obtuvo la nomenclatura')
            setShowSuccessModal(true)
        }
    }

    useEffect(() => {
        getParameteroResponse()
    }, [])

    const handleSubmit = async (values) => {
        try {
            values.username = item.parametroValor + values.username
            await register(values)
            setTitulo('Operación exitosa')
            setMensaje('Registrado exitosamente')
            setShowSuccessModal(true)
        } catch (error) {
            setTitulo('Operación fallida')
            setMensaje('No se pudo guardar del registro')
            setShowSuccessModal(true)
        }
    }
    return (
        <>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <div className='username-field'>
                                    <label className='lbl' htmlFor="username">Cédula</label>
                                    <br></br>
                                    <div className='d-flex'>
                                        {item && <p className='mt-2' style={{ 'fontWeight': 'bold' }}>{item.parametroValor} </p>}
                                        <div className='col'>
                                            <Field name="username" type="string" id="username"
                                                placeholder="Digite el número de cédula o residencia"
                                                className="inp" />
                                            {/* If the username field is touched, but the 
                                            text is not given */}
                                            {errors.username && touched.username && (
                                                <div style={{ color: "red" }}>
                                                    <ErrorMessage name="username" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='name-field'>
                                    <label className='lbl' htmlFor="name">Nombre</label>
                                    <br></br>
                                    <Field name="name" type="string" id="name"
                                        placeholder="Digite su nombre Completo"
                                        className="inp" />
                                    {/* If the name field is touched, but the 
                                    text is not given */}
                                    {errors.name && touched.name && (
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name="name" />
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
                                <div className='confirmPassword-field'>
                                    <label className='lbl' htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <br></br>
                                    <Field name="confirmPassword" type="password" id="confirmPassword"
                                        placeholder="Confirmar Contraseña"
                                        className="inp" />
                                    {/* If the confirmPassword field is touched, but the
                                    text is not given */}
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name="confirmPassword" />
                                        </div>
                                    )}
                                </div>
                                <div className='button-field'>
                                    <br></br>
                                    <button type="submit" className='btn'>Registrar</button>
                                    {isSubmitting ? <p>Submitting...</p> : null}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='mt-3'>
                    <Link to='/'>¿Ya tienes una cuenta? Inicia sesión</Link>
                </div>
            </div>
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
        </>
    )
}

export default RegisterForm
