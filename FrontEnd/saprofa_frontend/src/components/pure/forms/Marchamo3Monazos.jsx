import React, { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService'
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import './../../../styles/icon.scss';
import SuccessModal from "../../modals/SuccessModal";
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useNavigate } from 'react-router-dom';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;
const idDatoSorteo = lottery?.idInterno;

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 * except for contingencia, this is optional
 */
const marchamoSchema = Yup.object().shape({
    aperturaValjA: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
    aperturaValjB: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
    cierrejValjA: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
    cierrejValjB: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
    contingencia: Yup.number().max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
});

let marchamoDefault = {
    idSorteo: idDatoSorteo,
    tipo: 'Apertura',
    valija: 'A',
    tipoMarchamo: 'Electronica',
    numeroMarchamo: '1525',
}


const buildMarchamoList = (values) => {

    return [
        {
            ...marchamoDefault,
            numeroMarchamo: `JPS-SLE-000${values.aperturaValjA}`,
        }
        ,
        {
            ...marchamoDefault,
            tipo: 'Cierre',
            numeroMarchamo: `JPS-SLE-000${values.cierrejValjA}`,
        }
        ,
        {
            ...marchamoDefault,
            valija: 'B',
            numeroMarchamo: `JPS-SLE-000${values.aperturaValjB}`,
        }
        ,
        {
            ...marchamoDefault,
            tipo: 'Cierre',
            valija: 'B',
            numeroMarchamo: `JPS-SLE-000${values.cierrejValjB}`,
        }
        ,
        {
            ...marchamoDefault,
            tipo: 'Contingencia',
            numeroMarchamo: values.contingencia ? `JPS-SLE-000${values.contingencia} ` : null,
        }
    ];
}

const Marchamo3Monazos = (id) => {

    const [datosEnviados, setDatosEnviados] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });
    const navigate = useNavigate();

    useEffect(() => {
		const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
	});

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/CierreApuestas');
    }

    function handleCloseFailModal() {
        setShowFailModal(false);
    }

    const handleConfirmation = async (confirmed) => {
        if (!confirmed) {
            setShowConfirmation(false);
            return;
        }
        await confirmationAction();
        setShowConfirmation(false);
    }

    const handleShowConfirmation = async (action) => {
        setShowConfirmation(true);
        setConfirmationAction(() => () => {
            action();
        });
    }

    const handleSubmit = async (values) => {
        try {
            const marchamoList = buildMarchamoList(values);
            setShowLoadingModal(true);
            const response = await insertMarchamo(marchamoList);
            setShowLoadingModal(false);
            if (response.status === 200) {
                setShowLoadingModal(false);
                setMensaje("Marchamos guardados exitosamente");
                setTitulo("¡Operación Exitosa!");
                setDatosEnviados(true);
                setShowSuccessModal(true);
            } else {
                setShowLoadingModal(false);
            }
        } catch (error) {
            setShowLoadingModal(false);
            setMensaje(`Error al guardar los marchamos. ${error.message}`);
            setTitulo("¡Operación Fallida!");
            setDatosEnviados(false);
            setShowFailModal(true);
        }
    }

    return (
        <>
            <div className='container'>
                <Formik
                    initialValues={{}}
                    validationSchema={marchamoSchema}
                    onSubmit={
                        async (values) => {
                            await handleShowConfirmation(() => handleSubmit(values));
                        }
                    }>
                    {({ values,
                        touched,
                        errors,
                        isSubmitting,
                        isValidating,
                        handleChange,
                        handleBlur }) => (
                        <Form>
                            <table className='table table-bordered align-middle'>
                                <thead>
                                    <tr>
                                        <th colSpan={5}><h3>Número de marchamos para los ficheros</h3></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th colSpan={2}><h3>Apertura</h3></th>
                                        <th colSpan={2}><h3>Cierre</h3></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th><h4>Valija A</h4></th>
                                        <th><h4>Valija B</h4></th>
                                        <th><h4>Valija A</h4></th>
                                        <th><h4>Valija B</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h4>Plástico</h4></td>
                                        <td>
                                            <label htmlFor="aperturaValjA" className="label-with-icon">
                                                <span className="label-text">JPS-SLE-0000</span>
                                                <div className="required-icon">
                                                    {!touched.aperturaValjA && <AiOutlineExclamationCircle />}
                                                </div>
                                            </label>
                                            <Field id='aperturaValjA' name='aperturaValjA' type='number' className='form-control' />
                                            {errors.aperturaValjA && touched.aperturaValjA && (
                                                <div className='error'>
                                                    <ErrorMessage name='aperturaValjA'></ErrorMessage>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <label htmlFor="aperturaValjB" className="label-with-icon">
                                                <span className="label-text">JPS-SLE-0000</span>
                                                <div className="required-icon">
                                                    {!touched.aperturaValjB && <AiOutlineExclamationCircle />}
                                                </div>
                                            </label>
                                            <Field id='aperturaValjB' name='aperturaValjB' type='number' className='form-control' />
                                            {errors.aperturaValjB && touched.aperturaValjB && (
                                                <div className='error'>
                                                    <ErrorMessage name='aperturaValjB'></ErrorMessage>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <label htmlFor="cierrejValjA" className="label-with-icon">
                                                <span className="label-text">JPS-SLE-0000</span>
                                                <div className="required-icon">
                                                    {!touched.cierrejValjA && <AiOutlineExclamationCircle />}
                                                </div>
                                            </label>
                                            <Field id='cierrejValjA' name='cierrejValjA' type='number' className='form-control' />
                                            {
                                                errors.cierrejValjA && touched.cierrejValjA &&
                                                (
                                                    <div className='error'>
                                                        <ErrorMessage name='cierrejValjA'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <label htmlFor="cierrejValjB" className="label-with-icon">
                                                <span className="label-text">JPS-SLE-0000</span>
                                                <div className="required-icon">
                                                    {!touched.cierrejValjB && <AiOutlineExclamationCircle />}
                                                </div>
                                            </label>
                                            <Field id='cierrejValjB' name='cierrejValjB' type='number' className='form-control' />
                                            {
                                                errors.cierrejValjB && touched.cierrejValjB &&
                                                (
                                                    <div className='error'>
                                                        <ErrorMessage name='cierrejValjB'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4>Contingencia</h4></td>
                                        <td colSpan={2}>JPS-SLE-000 <Field id='contingencia' name='contingencia' type='number' className='form-control' /></td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='button-field'>
                                <button type="submit" className='btn' disabled={isSubmitting || isValidating || datosEnviados}>Registrar Marchamos</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando Marchamos'
                mensaje='Por favor espere...'
            />
            <FailModal
                show={showFailModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseFailModal}
            />
            <ConfirmationModal
                show={showConfirmation}
                titulo='Confirmación'
                mensaje='¿Está seguro que desea registrar las pruebas?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
};

export default Marchamo3Monazos;
