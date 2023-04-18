import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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
	aperturaS1: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	cierreS: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaS2: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaS3: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaS4: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaN: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	cierreN: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaAcumFich: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	cierreAcumFich: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	aperturaAcumTula: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	cierreAcumTula: Yup.number().required('El campo es requerido').max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0'),
	noJuegan: Yup.number().max(9999, 'El número debe ser de 4 dígitos').min(1, 'El número no puede ser menor que 0')

});

let marchamoDefault = {
	idSorteo,
	tipo: 'Apertura',
	valija: '',
	tipoMarchamo: 'Serie',
	numeroMarchamo: '1525',
}


const buildMarchamoList = (values) => {

	return [
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLT-S-0000${values.aperturaS1}`,
		},
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLT-S-0000${values.aperturaS2}`,
		},
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLT-S-0000${values.aperturaS3}`,
		},
		{
			...marchamoDefault,
			numeroMarchamo: `JPS-SLT-S-0000${values.aperturaS4}`,
		},
		{
			...marchamoDefault,
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLT-S-0000${values.cierreS}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'Numero',
			numeroMarchamo: `JPS-SLT-N-0000${values.aperturaN}`,
		},
		{
			...marchamoDefault,
			tipo: 'Cierre',
			tipoMarchamo: 'Numero',
			numeroMarchamo: `JPS-SLT-N-0000${values.cierreN}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'AcumuladoFichero',
			numeroMarchamo: `JPS-SLT-OTROS 000${values.aperturaAcumFich}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'AcumuladoFichero',
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLT-OTROS 000${values.cierreAcumFich}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'AcumuladoTula',
			numeroMarchamo: `JPS-SLT-OTROS 000${values.aperturaAcumTula}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'AcumuladoTula',
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLT-OTROS 000${values.cierreAcumTula}`,
		},
		{
			...marchamoDefault,
			tipoMarchamo: 'noJuegan',
			tipo: 'Cierre',
			numeroMarchamo: `JPS-SLT-OTROS 000${values.noJuegan}`,
		},
	];
}

const MarchamoPopular = () => {
	const [checked, setChecked] = useState(false);

	const handleCheck = (e) => {
		const isChecked = e.target.checked;
		isChecked ? setChecked(true) : setChecked(false);
	}

	return (
		<div className='container'>
			<Formik
				initialValues={{}}
				validationSchema={marchamoSchema}
				onSubmit={async (values) => {
					try {
						const marchamoList = buildMarchamoList(values);
						const response = await insertMarchamo(marchamoList);
						if (response.status === 200) {
							alert('Marchamos guardados con éxito');
						} else {
							throw new Error('Marchamo no insertado');
						}
					} catch (error) {
						alert(`Algo salió mal: ${error}`);
					}
				}}
			>
				{({ values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur }) => (
					<Form>
						<table className='table table-bordered align-middle'>
							<thead className='thead-dark'>
								<tr>
									<th colSpan={3}><h3>Numero de marchamo y valija</h3></th>
								</tr>
								<tr>
									<th></th>
									<th><h4>Apertura</h4></th>
									<th><h4>Cierre</h4></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th rowSpan={4}><h4>Series</h4></th>
									<td>
										<label htmlFor="aperturaS1" className="label-with-icon">
											<span className="label-text">JPS-SLT-S-0000</span>
											<div className="required-icon">
												{!touched.aperturaS1 && <AiOutlineExclamationCircle />}
											</div>
										</label>
										<Field id='aperturaS1' name='aperturaS1' type='number' className='form-control' />
										{errors.aperturaS1 && touched.aperturaS1 && (
											<div className='error'>
												<ErrorMessage name='aperturaS1'></ErrorMessage>
											</div>
										)}
									</td>
									<td rowSpan={2}>
										<label htmlFor="cierresS" className="label-with-icon">
											<span className="label-text">JPS-SLT-S-0000</span>
											<div className="required-icon">
												{!touched.cierresS && <AiOutlineExclamationCircle />}
											</div>
										</label>
										<Field id='cierreS' name='cierreS' type='number' className='form-control' />
										{
											errors.cierreS && touched.cierreS &&
											(
												<div className='error'>
													<ErrorMessage name='cierreS'></ErrorMessage>
												</div>
											)
										}
									</td>
								</tr>
								<tr>
									<td>
										<label htmlFor="aperturaS2" className="label-with-icon">
											<span className="label-text">JPS-SLT-S-0000</span>
											<div className="required-icon">
												{!touched.aperturaS2 && <AiOutlineExclamationCircle />}
											</div>
										</label>
										<Field id='aperturaS2' name='aperturaS2' type='number' className='form-control' />
										{
											errors.aperturaS2 && touched.aperturaS2 &&
											(
												<div className='error'>
													<ErrorMessage name='aperturaS2'></ErrorMessage>
												</div>
											)
										}
									</td>
								</tr>
								<tr>
									<td>
										<label htmlFor="aperturaS3" className="label-with-icon">
											<span className="label-text">JPS-SLT-S-0000</span>
											<div className="required-icon">
												{!touched.aperturaS3 && <AiOutlineExclamationCircle />}
											</div>
										</label>
										<Field id='aperturaS3' name='aperturaS3' type='number' className='form-control' />
										{
											errors.aperturaS3 && touched.aperturaS3 &&
											(
												<div className='error'>
													<ErrorMessage name='aperturaS3'></ErrorMessage>
												</div>
											)
										}
									</td>
									<td rowSpan={2}>
										<span>JPS-SLT-S-0000</span>
										<br />No juegan
										<div className='row'>
											<div className='col'>
												<input id='noJueganCheckBox' name='noJueganCheckBox' onChange={handleCheck} type='checkbox' className='check' /> <br />
												¿Hay series que no juegan?
											</div>
											{checked && <Field id='noJuegan' name='noJuegan' type='number' className='form-control me-5' />}
											{
												errors.noJuegan && touched.noJuegan &&
												(
													<div className='error'>
														<ErrorMessage name='noJuegan'></ErrorMessage>
													</div>
												)
											}
										</div>
									</td>
								</tr>
								<tr>
								<td>
                    <label htmlFor="aperturaS4" className="label-with-icon">
                      <span className="label-text">JPS-SLT-S-0000</span>
                      <div className="required-icon">
                        {!touched.aperturaS4 && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='aperturaS4' name='aperturaS4' type='number' className='form-control' />
                    {
                      errors.aperturaS4 && touched.aperturaS4 &&
                      (
                        <div className='error'>
                          <ErrorMessage name='aperturaS4'></ErrorMessage>
                        </div>
                      )
                    }
                  </td>
                </tr>
                <tr>
                  <th><h4>Numeros</h4></th>
                  <td>
                    <label htmlFor="aperturaN" className="label-with-icon">
                      <span className="label-text">JPS-SLT-N-0000</span>
                      <div className="required-icon">
                        {!touched.aperturaN && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='aperturaN' name='aperturaN' type='number' className='form-control' />
                    {
                      errors.aperturaN && touched.aperturaN &&
                      (
                        <div className='error'>
                          <ErrorMessage name='aperturaN'></ErrorMessage>
                        </div>
                      )
                    }
                  </td>                  
                  <td>
                    <label htmlFor="cierreN" className="label-with-icon">
                      <span className="label-text">JPS-SLT-N-0000</span>
                      <div className="required-icon">
                        {!touched.cierreN && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='cierreN' name='cierreN' type='number' className='form-control' />
                    {
                      errors.cierreN && touched.cierreN &&
                      (
                        <div className='error'>
                          <ErrorMessage name='cierreN'></ErrorMessage>
                        </div>
                      )
                    }
                  </td>
								</tr>
								<tr>
								<th><h4>Acumulado</h4></th>
                  <td>
                    <label htmlFor="aperturaAcumFich" className="label-with-icon">
                      <span className="label-text">JPS-OTROS-0000</span>
                      <div className="required-icon">
                        {!touched.aperturaAcumFich && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='aperturaAcumFich' name='aperturaAcumFich' type='number' className='form-control' /> fichero<br />
                    {
                      errors.aperturaAcumFich && touched.aperturaAcumFich &&
                      (
                        <div className='error'>
                          <ErrorMessage name='aperturaAcumFich'></ErrorMessage>
                        </div>
                      )
                    }
                    <label htmlFor="aperturaAcumTula" className="label-with-icon">
                      <span className="label-text">JPS-OTROS-0000</span>
                      <div className="required-icon">
                        {!touched.aperturaAcumTula && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='aperturaAcumTula' name='aperturaAcumTula' type='number' className='form-control' /> tula
                    {
                      errors.aperturaAcumTula && touched.aperturaAcumTula &&
                      (
                        <div className='error'>
                          <ErrorMessage name='aperturaAcumTula'></ErrorMessage>
                        </div>
                      )
                    }
                  </td>
                  <td colSpan={2}>
                    <label htmlFor="cierreAcumFich" className="label-with-icon">
                      <span className="label-text">JPS-OTROS-0000</span>
                      <div className="required-icon">
                        {!touched.cierreAcumFich && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='cierreAcumFich' name='cierreAcumFich' type='number' className='form-control' /> fichero<br />
                    {
                      errors.cierreAcumFich && touched.cierreAcumFich &&
                      (
                        <div className='error'>
                          <ErrorMessage name='cierreAcumFich'></ErrorMessage>
                        </div>
                      )
                    }
                    <label htmlFor="cierreAcumTula" className="label-with-icon">
                      <span className="label-text">JPS-OTROS-0000</span>
                      <div className="required-icon">
                        {!touched.cierreAcumTula && <AiOutlineExclamationCircle />}
                      </div>
                    </label>
                    <Field id='cierreAcumTula' name='cierreAcumTula' type='number' className='form-control' /> tula
                    {
                      errors.cierreAcumTula && touched.cierreAcumTula &&
                      (
                        <div className='error'>
                          <ErrorMessage name='cierreAcumTula'></ErrorMessage>
                        </div>
                      )
                    }
                  </td>
								</tr>
							</tbody>
						</table>
						<div className='button-field'>
							<button type="submit" className='btn'>Registrar Marchamos</button>
							{isSubmitting ? <p>Submitting...</p> : null}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MarchamoPopular;
