import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import PlanPremios from '../PlanPremios';

const ResultadoLoteriaFisica = () => {
    return (
        <div className='container'>
            <Formik
                >
                {({ errors, }) => (
                        <div className='container-fluid'>
                            <Form>
                                <div className='row'>
                                    <table className='table table-bordered align-middle mt-5 col'>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>Resultados del Sorteo<br/> Números favorecidos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className=''>
                                                    <label htmlFor='numero'>Número</label>
                                                    <Field id='numero' name='numero' type='text' className='form-control input-form-control'/>
                                                    <ErrorMessage name='numero' component={() => {
                                                        return <div className='error'>{errors.numero}</div>
                                                    }}/>
                                                </th>
                                                <td className='col-4'>
                                                    <PlanPremios/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='button-field col-1 mt-5 '>
                                        <button 
                                            type='button' 
                                            className='btn btn-success'
                                        >
                                            Agregar Resultado
                                        </button>
                                    </div>
                                </div>
                                <div className='button-field'>
                                    <button type="submit" className='btn'>Registrar Resultados</button>                                    
                                </div>
                            </Form>
                        </div>
                    )}
            </Formik>
        </div>
    );
}

export default ResultadoLoteriaFisica;
