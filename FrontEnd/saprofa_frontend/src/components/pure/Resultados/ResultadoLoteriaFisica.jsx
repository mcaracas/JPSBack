import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import PlanPremios from '../PlanPremios';
import { getPremioFromAdministracion } from '../../../services/axiosService';

const ResultadoLoteriaFisica = ({ num_sorteo, tipo_loteria }) => {
    const [resultados, setResultados] = useState([]);
    const [resultado, setResultado] = useState({});
    
    const formRef = useRef(null);

    const obtenerResultadoAdminitracion = async (id) => {
        try{
            // const premio = await getPremioFromAdministracion(id);
            // setResultado({
            //     numero: premio.numFavorecido,
            //     serie: premio.seriePremio,
            // });
            //TODO: change this to the real data
            setResultado({
                numero: 12,
                serie: 225,
            });
            if (resultado) {
                const formValues = {
                    numero: resultado.numero,
                    serie: resultado.serie,
                };
                formRef.current.setValues(formValues);
            }

            console.log("resultado:", resultado);
            // {
            //     idResultado : int,
            //     numPremioPlan : int,
            //     idDatoSorteo : int,
            //     numFavorecido : string,
            //     seriePremio : string,
            //     verificado : bool,
            //     verificaAcumulado : bool,
            //     idDatoSorteoNavigation : bool,
            //     numPremioPlanNavigation : int,
            // }
            

        } catch (error) {
            console.log(error);
        }
    }

    const agregarResultado = (values) => {
        setResultados([...resultados,{
            numero: values.numero,
            serie: values.serie,
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
        if(!serie || serie === ''){
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
        if(!numero || numero === ''){
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
                numero: resultado ? resultado.numero : '',
                serie: resultado ? resultado.serie : '',
                tipoPremio: '',
            }}
            innerRef = {formRef}
            onSubmit={
                async (values)=>{ 
                    console.log('values:',values);
                    console.log('resultados:',resultados);
                }
            }
                >
                {({ errors, handleSubmit, handleBlur }) => (
                        <div className='container-fluid'>
                            <Form>
                                <div className='row'>
                                    <div className='col-10'>
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
                                    </div>
                                    <div className='col-2'>
                                        <div className='button-field col-1 mt-5 '>
                                            <button 
                                                type='button' 
                                                className='btn btn-success'
                                                onClick={() => obtenerResultadoAdminitracion('1')}
                                            >
                                                Obtener Resultado
                                            </button>
                                        </div>
                                        <div className='button-field col-1 mt-5 '>
                                            <button 
                                                type='button' 
                                                className='btn btn-success'
                                                onClick={() => agregarResultado(resultado)}
                                            >
                                                Agregar Resultado
                                            </button>
                                        </div>
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
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-md-6 text-center">
                                                    {/* TODO: add the real premio */}
                                                    {/* {resultado.tipoPremio} */}
                                                    1.000.000
                                                </div>
                                                <div className="col-12 col-md-6 d-flex justify-content-end align-items-start">
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
