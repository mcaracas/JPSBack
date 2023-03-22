import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import PlanPremios from '../PlanPremios';
import { getPremioFromAdministracion, insertarPremios } from '../../../services/axiosService';
import SuccessModal from '../../modals/SuccessModal';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const planPremios = JSON.parse(sessionStorage.getItem('planPremios'));
const idPlanPremios = lottery?.planPremios;
const idDatoSorteo = lottery?.idInterno;
console.log('lottery:', lottery);


const ResultadoLoteriaFisica = ({ idSorteo }) => {
    const [tipoPremio, setTipoPremio] = useState('Premio Mayor');
    const [numeroResultado, setNumeroResultado] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [datosEnviados, setDatosEnviados] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
      }

    const handleTipoPremio = value => {
        setTipoPremio(value);
    };

    const [resultados, setResultados] = useState([]);
    const [resultado, setResultado] = useState({
        numeroResultado,
        numPremioPlan : idPlanPremios,
        idDatoSorteo,
        numFavorecido : '',
        seriePremio : '',
        tipoResultado: tipoPremio,
        verificado : true, //TODO: change this to the real data
        verificaAcumulado : true, //TODO: change this to the real data
        idDatoSorteoNavigation : null,
        numPremioPlanNavigation : null,
    });

    const formRef = useRef(null);

    const obtenerResultadoAdminitracion = async (id) => {
        try{
            // const response = await getPremioFromAdministracion(id);
            // const datos = response.data;
            // setResultado({
            //     ...datos,
            //     numFavorecido: datos.numFavorecido,
            //     seriePremio: datos.seriePremio,
            //     tipoResultado: datos.tipoResultado,
            // });
            //TODO: change this to the real data
            setResultado({
                ...resultado,
                numFavorecido: 72,
                seriePremio: 999,
                tipoResultado: tipoPremio,
            });
            if (resultado) {
                const formValues = {
                    numFavorecido: resultado.numFavorecido,
                    seriePremio: resultado.seriePremio,
                    tipoResultado: tipoPremio,
                };
                formRef.current.values.numFavorecido = formValues.numFavorecido.toString();
                formRef.current.values.seriePremio = formValues.seriePremio.toString();
                console.log('resultado:',resultado)
            }
        } catch (error) {
            setDatosEnviados(false);
            setTitulo('¡Error!');
            setMensaje(error);
            setShowSuccessModal(true);
        }
    }

    const agregarResultado = (values) => {
        if (resultado.numFavorecido === '' || resultado.seriePremio === '') {
            setDatosEnviados(false);
            setTitulo('¡Error!');
            setMensaje('Debe ingresar número y serie del premio');
            setShowSuccessModal(true);
            return;
        }
        setResultados([...resultados,{
            numeroResultado,
            numPremioPlan : idPlanPremios,
            idDatoSorteo,
            numFavorecido : formRef.current.values.numFavorecido.toString(),
            seriePremio : formRef.current.values.seriePremio.toString(),
            verificado : true, //TODO: change this to the real data
            verificaAcumulado : true, //TODO: change this to the real data
            tipoResultado: tipoPremio,
            idDatoSorteoNavigation : null,
            numPremioPlanNavigation : null,
        }]);
        setNumeroResultado(numeroResultado + 1);
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
        <>
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
                            setMensaje("No se han agregado resultados");
                            setTitulo("¡Operación Fallida!");
                            setShowSuccessModal(true);
                            return;
                        }
                        if(response.status === 200 ){
                            setMensaje("Datos de Resultados guardados exitosamente");
                            setTitulo("¡Operación Exitosa!");
                            setDatosEnviados(true);
                            setShowSuccessModal(true);
                        } else {
                            console.log('error');
                        }
                    }catch(error){
                        console.log(error);
                    }
                }
            }
                >
                {({ errors, isSubmitting, isValidating }) => (
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
                                                            validate={validateNumber}
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
                                                            validate={validateSerie}
                                                            />
                                                        <ErrorMessage name='seriePremio' component={() => {
                                                            return (
                                                                <div className='error'>{errors.seriePremio}</div>
                                                            )
                                                        }}/>
                                                    </th>
                                                    <td className='col-4'>
                                                        <PlanPremios idPlanPremios={ idPlanPremios } onSelectChange={ handleTipoPremio }/>
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
                                                onClick={() => obtenerResultadoAdminitracion(numeroResultado)}
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
                                <button type="submit" className='btn' disabled={isSubmitting || isValidating || datosEnviados} >Registrar Resultados</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
            <div className='mb-5' style={{height: '400px', overflowY:'auto'}}>
                <table className='table align-middle mt-5 col'>
                    <thead>
                        <tr>
                            <th colSpan={4}>Resultados Agregados</th>
                        </tr>  
                    </thead>
                    <tbody>
                        <tr>
                            <th>Numero Resultado</th>
                            <th>Número</th>
                            <th>Serie</th>
                            <th>Tipo de Premio</th>
                        </tr>
                        {resultados.map((resultado, index) => {
                            return (
                                <tr key={index}>
                                    <td className='col-1'>{resultado.numeroResultado}</td>
                                    <td>{resultado.numFavorecido}</td>
                                    <td>{resultado.seriePremio}</td>
                                    <td>
                                        <div className="container m-auto">
                                            <div className="row justify-content-center">
                                                <div className="m-auto col-10">
                                                    {/* TODO: add the real premio */}
                                                    {resultado.tipoResultado}
                                                </div>
                                                <div className="col-1">
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
        <SuccessModal 
            show={showSuccessModal}
            handleClose={handleCloseSuccessModal}
            titulo = {titulo}
            mensaje = {mensaje}
        />
    </>
    );
}

export default ResultadoLoteriaFisica;
