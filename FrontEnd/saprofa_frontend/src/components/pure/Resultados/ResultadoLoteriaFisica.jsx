import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import PlanPremios from '../PlanPremios';
import { getPremioFromAdministracion, insertarPremios } from '../../../services/axiosService';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const planPremios = JSON.parse(sessionStorage.getItem('planPremios'));
const idPlanPremios = lottery.planPremios;
const idDatoSorteo = lottery.idInterno;
console.log('lottery:', lottery);
console.log('PlanPremios:', planPremios);

const ResultadoLoteriaFisica = ({ idSorteo }) => {
    const [tipoPremio, setTipoPremio] = useState('');

    const handleTipoPremio = value => {
        setTipoPremio(value);
    };

    const [resultados, setResultados] = useState([]);
    const [resultado, setResultado] = useState({
        numeroResultado : 1,
        numPremioPlan : idPlanPremios,
        idDatoSorteo,
        numFavorecido : '',
        seriePremio : '',
        verificado : true, //TODO: change this to the real data
        verificaAcumulado : true, //TODO: change this to the real data
        idDatoSorteoNavigation : null,
        numPremioPlanNavigation : null,
    });

    const formRef = useRef(null);

    const obtenerResultadoAdminitracion = async (id) => {
        try{
            // const premio = await getPremioFromAdministracion(id);
            // setResultado({
            //     numero: premio.numFavorecido,
            //     seriePremio: premio.seriePremio,
            // });
            //TODO: change this to the real data
            setResultado({
                numFavorecido: 72,
                seriePremio: 999,
            });
            if (resultado) {
                const formValues = {
                    numFavorecido: resultado.numFavorecido,
                    seriePremio: resultado.seriePremio,
                };
                console.log('formValues:',formValues)
                formRef.current.setValues(formValues);
            }
            // {
            //     "tipoPremio":"",
            //     "idResultado":0,
            //     "numeroResultado":0,
            //     "numPremioPlan":1,
            //     "idDatoSorteo":1,
            //     "numFavorecido":"00",
            //     "seriePremio":"000",
            //     "verificado":true,
            //     "verificaAcumulado":true,
            //     "idDatoSorteoNavigation": null,
            //     "numPremioPlanNavigation": null
            //  }
            

        } catch (error) {
            console.log(error);
        }
    }

    const agregarResultado = (values) => {
        setResultados([...resultados,{
            numeroResultado : 1,
            numPremioPlan : idPlanPremios,
            idDatoSorteo,
            numFavorecido : values.numFavorecido.toString(),
            seriePremio : values.seriePremio.toString(),
            verificado : true, //TODO: change this to the real data
            verificaAcumulado : true, //TODO: change this to the real data
            idDatoSorteoNavigation : null,
            numPremioPlanNavigation : null,
        }]);
        // console.log('resultados:',resultados);
    }

    const removeFields = (index) => {
        let data = [...resultados];
        data.splice(index,1 );
        setResultados(data);
    }

    const validateSerie = (seriePremio) => {
        if(!seriePremio || seriePremio === ''){
            return 'La serie es requerida';
        }
        else if(isNaN(seriePremio)){
            return 'La serie debe ser un número';
        }
        else if(seriePremio.length !== 3){
            return 'La serie debe tener 3 dígitos';
        }
        return '';
    }
    
    const validateNumber = (numFavorecido) => {
        if(!numFavorecido || numFavorecido === ''){
            return 'El número es requerido';
        }
        else if(isNaN(numFavorecido)){
            return 'El número debe ser un número';
        }
        else if(numFavorecido.length !== 2){
            return 'El número debe tener 2 dígitos';
        }
        return '';
    }

    return (
        <div className='container'>
            <Formik
            initialValues={ resultado }
            innerRef = { formRef }
            onSubmit={
                async (values)=>{
                    try{
                        const response = await insertarPremios(resultados);
                        console.log('resultados a enviar:',resultados);
                        if(resultados.length === 0){
                            alert('No se han agregado resultados');
                        }
                        if(response.status === 200 ){
                            console.log('response:',response.data);
                        } else {
                            console.log('error');
                        }
                    }catch(error){
                        console.log(error);
                    }
                }
                

            }
                >
                {({ errors }) => (
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
                                                        <label htmlFor='numFavorecido'>Número</label>
                                                        <Field 
                                                            id='numFavorecido' 
                                                            name='numFavorecido' 
                                                            type='text' 
                                                            className='form-control input-form-control' 
                                                            // validate={validateNumber}
                                                            />
                                                        <ErrorMessage name='numFavorecido' component={() => {
                                                            return (
                                                                <div className='error'>{errors.numFavorecido}</div>
                                                            )
                                                        }}/>
                                                    </th>
                                                    <th>
                                                        <label htmlFor='seriePremio'>Serie</label>
                                                        <Field 
                                                            id='seriePremio' 
                                                            name='seriePremio' 
                                                            type='text' 
                                                            className='form-control input-form-control' 
                                                            // validate={validateSerie}
                                                            />
                                                        <ErrorMessage name='seriePremio' component={() => {
                                                            return (
                                                                <div className='error'>{errors.seriePremio}</div>
                                                            )
                                                        }}/>
                                                    </th>
                                                    <td className='col-4'>
                                                        <PlanPremios idPlanPremios={ idPlanPremios } onSelectChange={ handleTipoPremio }/>
                                                        {/* {console.log("tipoPremio:",tipoPremio)} */}
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
                                    <td>{resultado.numFavorecido}</td>
                                    <td>{resultado.seriePremio}</td>
                                    <td>
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-md-6 text-center">
                                                    {/* TODO: add the real premio */}
                                                    {/* {resultado.tipoPremio} */}
                                                    {tipoPremio}
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
