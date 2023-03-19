import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import PlanPremios from '../PlanPremios';

const ResultadoLoteriaFisica = () => {
    const [resultados, setResultados] = useState([]);

    const numeroRef = useRef('');
    const serieRef = useRef('');
    const tipoPremioRef = useRef('');

    const agregarResultado = (values) => {
        console.log('num:',values.numero.value); 
        console.log('serie:',values.serie.value); 
        setResultados([...resultados,{
            numero: values.numero.value,
            serie: values.serie.value,
            tipoPremio: '',
        }]);
        console.log('resultados:',resultados);
    }

    const removeFields = (index) => {
        let data = [...resultados];
        data.splice(index,1 );
        setResultados(data);
    }

    const validateSerie = (serie) => {
        if(!serie){
            return 'La serie es requerida';
        }
        else if(isNaN(serie)){
            return 'La serie debe ser un número';
        }
        else if(serie.length !== 3){
            return 'La serie debe tener 3 dígitos';
        }
        return '';
    }
    
    const validateNumber = (numero) => {
        if(!numero){
            return 'El número es requerido';
        }
        else if(isNaN(numero)){
            return 'El número debe ser un número';
        }
        else if(numero.length !== 2){
            return 'El número debe tener 2 dígitos';
        }
        return '';
    }
    
    return (
        <div className='container'>
            <Formik
            initialValues={{
                numero: '',
                serie: '',
                tipoPremio: '',
            }}
            onSubmit={
                async (values)=>{ 
                    console.log('values:',values);
                    console.log('resultados:',resultados);
                }
            }
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
                                                <th>
                                                    <label htmlFor='numero'>Número</label>
                                                    <Field 
                                                        id='numero' 
                                                        name='numero' 
                                                        type='text' 
                                                        className='form-control input-form-control' 
                                                        validate={validateNumber}
                                                        innerRef={numeroRef}
                                                        />
                                                    <ErrorMessage name='numero' component={() => {
                                                        return (
                                                            <div className='error'>{errors.numero}</div>
                                                        )
                                                    }}/>
                                                </th>
                                                <th>
                                                    <label htmlFor='serie'>Serie</label>
                                                    <Field 
                                                        id='serie' 
                                                        name='serie' 
                                                        type='text' 
                                                        className='form-control input-form-control' 
                                                        validate={validateSerie}
                                                        innerRef={serieRef}
                                                        />
                                                    <ErrorMessage name='serie' component={() => {
                                                        return (
                                                            <div className='error'>{errors.serie}</div>
                                                        )
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
                                            onClick={() => agregarResultado({numero:numeroRef.current,serie:serieRef.current})}
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
            <div>
                <table className='table align-middle mt-5 col'>
                    <thead>
                        <tr>
                            <th colSpan={3}>Resultados Agregados</th>
                        </tr>  
                    </thead>
                    <tbody>
                        <tr>
                            <th>Número</th>
                            <th>Serie</th>
                            <th>Tipo de Premio</th>
                        </tr>
                        {resultados.map((resultado, index) => {
                            return (
                                <tr key={index}>
                                    <td>{resultado.numero}</td>
                                    <td>{resultado.serie}</td>
                                    <td>
                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-12 col-md-6 text-center">
                                                    {/* TODO: add the real premio */}
                                                    {/* {resultado.tipoPremio} */}
                                                    1.000.000
                                                </div>
                                                <div class="col-12 col-md-6 d-flex justify-content-end align-items-start">
                                                    <i className='bi bi-x-square-fill closeX' onClick={() => removeFields(index)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ResultadoLoteriaFisica;
