import React, { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService';
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
	aperturaNT: Yup.number().required('Este campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	aperturaNTR: Yup.number().required('Este campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	cierreNT: Yup.number().required('Este campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	cierreNTR: Yup.number().required('Este campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	contingencia1NT: Yup.number().max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	contingencia2NT: Yup.number().max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
	contingenciaNTR: Yup.number().max(9999, 'El número debe ser de 4 dígitos').min(1000, 'El número debe ser de 4 dígitos'),
});

let marchamoDefault = {
	idSorteo: idDatoSorteo,
	tipo: 'Apertura',
	valija: '',
	tipoMarchamo: 'ElectronicaNT',
	numeroMarchamo: '1525',
}


const buildMarchamoList = (values) => {

	return [
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLE-000${values.aperturaNT}`,
		},
		{
			...marchamoDefault,
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLE-000${values.cierreNT}`,
		},
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLE-000${values.aperturaNTR}`,
		},
		{
			...marchamoDefault,
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLE-000${values.cierreNTR}`,
		},
		{
			...marchamoDefault,
			tipo: 'Contingencia',
			numeroMarchamo: values.contingencia ? `JPS-SLE-000${values.contingencia1NT} ` : null,
		},
		{
			...marchamoDefault,
			tipo: 'Contingencia',
			numeroMarchamo: values.contingencia ? `JPS-SLE-000${values.contingencia2NT} ` : null,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'ElectronicaNTR',
			tipo: 'Contingencia',
			numeroMarchamo: values.contingencia ? `JPS-SLE-000${values.contingenciaNTR} ` : null,
		}
	]
}

const MarchamoNuevosTiempos = () => {

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
						isValidating,
						isSubmitting,
						handleChange,
						handleBlur }) => (
						<Form>
							<table className='table table-bordered align-middle'>
								<thead>
									<tr>
										<th colSpan={5} >
											<h3>Numero de marchamos utilizados para los ficheros</h3>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr style={{ fontWeight: 'bold' }}>
										<td rowSpan={3} className='text-center'><h4>Marchamos</h4></td>
										<td style={{ color: 'red' }}><h4>Nuevos Tiempos</h4></td>
										<td style={{ color: 'red' }}><h4>Nuevos Tiempos Reventados</h4></td>
									</tr>
									<tr style={{ fontWeight: 'bold' }}>
										<td><h4>Ficheros en Uso</h4></td>
										<td><h4>Ficheros en Uso</h4></td>
									</tr>
									<tr style={{ fontWeight: 'bold' }}>
										<td><h4>Plástico</h4></td>
										<td><h4>Plástico</h4></td>
									</tr>
									<tr>
										<td><h4>Apertura</h4></td>
										<td>
											<label htmlFor="aperturaNT" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
												<div className="required-icon">
													{!touched.aperturaNT && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='aperturaNT' name='aperturaNT' type='number' className='form-control' />
											{errors.aperturaNT && touched.aperturaNT && (
												<div className='error'>
													<ErrorMessage name='aperturaNT'></ErrorMessage>
												</div>
											)}
										</td>
										<td>
											<label htmlFor="aperturaNTR" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
												<div className="required-icon">
													{!touched.aperturaNTR && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='aperturaNTR' name='aperturaNTR' type='number' className='form-control' />
											{errors.aperturaNTR && touched.aperturaNTR && (
												<div className='error'>
													<ErrorMessage name='aperturaNTR'></ErrorMessage>
												</div>
											)}
										</td>
									</tr>
									<tr>
										<td><h4>Cierre</h4></td>
										<td>
											<label htmlFor="cierreNT" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
												<div className="required-icon">
													{!touched.cierreNT && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='cierreNT' name='cierreNT' type='number' className='form-control' />
											{
												errors.cierreNT && touched.cierreNT &&
												(
													<div className='error'>
														<ErrorMessage name='cierreNT'></ErrorMessage>
													</div>
												)
											}
										</td>
										<td>
											<label htmlFor="cierreNTR" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
												<div className="required-icon">
													{!touched.cierreNTR && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='cierreNTR' name='cierreNTR' type='number' className='form-control' />
											{
												errors.cierreNTR && touched.cierreNTR &&
												(
													<div className='error'>
														<ErrorMessage name='cierreNTR'></ErrorMessage>
													</div>
												)
											}
										</td>
									</tr>
									<tr>
										<td><h4>Contingencia</h4></td>
										<td>
											<label htmlFor="contingencia1NT" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
											</label>
											<Field id='contingencia1NT' name='contingencia1NT' type='number' className='form-control' />
											{
												errors.contingencia1NT && touched.contingencia1NT &&
												(
													<div className='error'>
														<ErrorMessage name='contingencia1NT'></ErrorMessage>
													</div>
												)

											}
											<label htmlFor="contingencia2NT" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
											</label>
											<Field id='contingencia2NT' name='contingencia2NT' type='number' className='form-control' />
											{
												errors.contingencia2NT && touched.contingencia2NT &&
												(
													<div className='error'>
														<ErrorMessage name='contingencia2NT'></ErrorMessage>
													</div>
												)
											}
										</td>
										<td>
										<label htmlFor="contingenciaNTR" className="label-with-icon">
												<span className="label-text">JPS-SLE-0000</span>
											</label> 
										<Field id='contingenciaNTR' name='contingenciaNTR' type='number' className='form-control' />
											{
												errors.contingenciaNTR && touched.contingenciaNTR &&
												(
													<div style={{ color: 'red' }}>
														<ErrorMessage name='contingenciaNTR'></ErrorMessage>
													</div>
												)
											}
										</td>
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

export default MarchamoNuevosTiempos;
