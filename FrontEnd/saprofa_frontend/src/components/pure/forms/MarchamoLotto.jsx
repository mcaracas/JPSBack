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
import { parametros } from '../../../utils/config/marchamos';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;
const idDatoSorteo = lottery?.idInterno;

// cantidad maxima de digitos para el numero de marchamo
const CANT_MAXIMA_DIGITOS = 5;

// Expresion regular para validar que el numero de marchamo sea de 5 digitos
const regex = new RegExp(`^[0-9]{${CANT_MAXIMA_DIGITOS}}$`);


/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 * except for contingencia, this is optional
 */

const marchamoSchema = Yup.object().shape({
	apertura: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
	cierre: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`).required('El campo es requerido'),
	contingencia: Yup.string().matches(regex, `El número debe ser de ${CANT_MAXIMA_DIGITOS} dígitos`),
});

let marchamoDefault = {
	idSorteo: idDatoSorteo,
	tipo: 'Apertura',
	valija: '',
	tipoMarchamo: 'Electronica',
	numeroMarchamo: '1525',
}

const MarchamoLotto = (id) => {

	const [datosEnviados, setDatosEnviados] = useState(false);
	const [titulo, setTitulo] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showLoadingModal, setShowLoadingModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [confirmationAction, setConfirmationAction] = useState(() => { });
	const navigate = useNavigate();
	const [nomenclatura, setNomenclatura] = useState('');


	const buildMarchamoList = (values) => {

		return [
			{
				...marchamoDefault,
				numeroMarchamo: `${nomenclatura['ELECTRONICA']}${values.apertura}`,
			}
			,
			{
				...marchamoDefault,
				tipo: 'Cierre',
				numeroMarchamo: `${nomenclatura['ELECTRONICA']}${values.cierre}`,
			}
			,
			{
				...marchamoDefault,
				tipo: 'Contingencia',
				numeroMarchamo: values.contingencia ? `${nomenclatura['ELECTRONICA']}${values.contingencia} ` : null,
			},
		];
	}

	async function obtenerParametros() {
		const response = await parametros();
		setNomenclatura(response);
	};

	useEffect(() => {
		const usuario = sessionStorage.getItem('name');
		if (!usuario) {
			sessionStorage.clear();
			navigate('/');
		}
		obtenerParametros();
	}, [navigate]);

	function handleCloseSuccessModal() {
		setShowSuccessModal(false);
		navigate('/PruebasLotto');
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
								<thead className='thead-dark'>
									<tr>
										{/* <th rowSpan={2} colSpan={2}>Número de Acta donde se consigna el resultado oficial del sorteo, suscrita por los fiscalizadores del Sorteo</th> */}
										<th colSpan={3}>Número de marchamo para el fichero</th>
									</tr>
									<tr>
										<th></th>
										<th><h4>Ficheros en uso</h4></th>
										<th><h4>Ficheros de contingencia</h4></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<h4>Apertura</h4>
										</td>
										<td>
											<label htmlFor="apertura" className="label-with-icon">
												<span className="label-text">{nomenclatura['ELECTRONICA']}</span>
												<div className="required-icon">
													{!touched.apertura && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='apertura' name='apertura' type='number' className='form-control' />
											{errors.apertura && touched.apertura && (
												<div className='error'>
													<ErrorMessage name='apertura'></ErrorMessage>
												</div>
											)}
										</td>
										<td rowSpan={2}>
											<label htmlFor="contingencia" className="label-with-icon">
												<span className="label-text">{nomenclatura['ELECTRONICA']}</span>
											</label>
											<Field id='contingencia' name='contingencia' type='number' className='form-control' />
											{errors.contingencia && touched.contingencia && (
												<div className='error'>
													<ErrorMessage name='contingencia'></ErrorMessage>
												</div>
											)}
										</td>
									</tr>
									<tr>
										<td>
											<h4>Cierre</h4>
										</td>
										<td>
											<label htmlFor="cierre" className="label-with-icon">
												<span className="label-text">{nomenclatura['ELECTRONICA']}</span>
												<div className="required-icon">
													{!touched.cierre && <AiOutlineExclamationCircle />}
												</div>
											</label>
											<Field id='cierre' name='cierre' type='number' className='form-control' />
											{
												errors.cierre && touched.cierre &&
												(
													<div className='error'>
														<ErrorMessage name='cierre'></ErrorMessage>
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

export default MarchamoLotto;
