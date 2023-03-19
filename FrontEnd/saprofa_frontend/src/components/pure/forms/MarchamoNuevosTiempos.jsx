import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService';

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 * except for contingencia, this is optional
 */

const marchamoSchema = Yup.object().shape({
    aperturaNT : Yup.number().required('Este campo es requerido'),
    aperturaNTR : Yup.number().required('Este campo es requerido'),
    cierreNT : Yup.number().required('Este campo es requerido'),
    cierreNTR : Yup.number().required('Este campo es requerido'),
    contingencia1NT : Yup.number(),
    contingencia2NT : Yup.number(),
    contingenciaNTR : Yup.number()
});

let marchamoDefault = {
    idSorteo : 3,
    tipo : 'Apertura',
    valija : '',
    tipoMarchamo : 'ElectronicaNT',
    numeroMarchamo : '1525',
}


const buildMarchamoList = (values) => {

    const marchamos = [];

    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLE-000${values.aperturaNT}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLE-000${values.cierreNT}`,
        }
    );
    //TODO verificar NT y NTR
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'ElectronicaNTR',
            numeroMarchamo : `JPS-SLE-000${values.aperturaNTR}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'ElectronicaNTR',
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLE-000${values.cierreNTR}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Contingencia',
            numeroMarchamo : `JPS-SLE-000${values.contingencia1NT}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Contingencia',
            numeroMarchamo : `JPS-SLE-000${values.contingencia2NT}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'ElectronicaNTR',
            tipo : 'Contingencia',
            numeroMarchamo : `JPS-SLE-000${values.contingenciaNTR}`,
        }
    );
    
    return marchamos;
}

const MarchamoNuevosTiempos = (id) => {
    return (
        <div className='container'>
            <h1>Marchamos Nuevos Tiempos y Reventados</h1>
            <Formik
                initialValues={{}}
                validationSchema={marchamoSchema}
                onSubmit={async (values)=>{
                    const marchamoList = buildMarchamoList(values);
                    console.log(marchamoList);
                    insertMarchamo(marchamoList)
                        .then((response) => { 
                            if(response.status === 200){
                                alert('Marchamos guardados con éxito');
                            }else{
                                throw new Error('Marchamo no insertado');
                            }
                        }).catch((error) => { 
                            alert(`Algo salió mal: ${error}`);
                        })
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
                                <thead>
                                    <tr>
                                        <th colSpan={5} >        
                                            Numero de marchamos utilizados para los ficheros
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{fontWeight : 'bold'}}>
                                        <td rowSpan={3} className='text-center'>Marchamos</td>
                                        <td style={{color: 'red'}}>Nuevos Tiempos</td>
                                        <td style={{color: 'red'}}>Nuevos Tiempos Reventados</td>
                                    </tr>
                                    <tr style={{fontWeight : 'bold'}}>
                                        <td>Ficheros en Uso</td>
                                        <td>Ficheros en Uso</td>
                                    </tr>
                                    <tr style={{fontWeight : 'bold'}}>
                                        <td>Plastico</td>
                                        <td>Plastico</td>
                                    </tr>
                                    <tr>
                                        <td>Apertura</td>
                                        <td>JPS-SLE-000 <Field id='aperturaNT' name='aperturaNT' type='number' className='form-control'/>
                                            {
                                                errors.aperturaNT && touched.aperturaNT && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaNT'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='aperturaNTR' name='aperturaNTR' type='number' className='form-control'/>
                                        {
                                                errors.aperturaNTR && touched.aperturaNTR && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaNTR'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cierre</td>
                                        <td>JPS-SLE-000 <Field id='cierreNT' name='cierreNT' type='number' className='form-control'/>
                                            {
                                                errors.cierreNT && touched.cierreNT && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreNT'></ErrorMessage>
                                                    </div>
                                                )
                                            }</td>
                                        <td>JPS-SLE-000 <Field id='cierreNTR' name='cierreNTR' type='number' className='form-control'/>
                                            {
                                                errors.cierreNTR && touched.cierreNTR && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreNTR'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contingencia</td>
                                        <td style={{fontWeight : 'bold'}}>JPS-SLE-000 <Field id='contingencia1NT' name='contingencia1NT' type='number' className='form-control'/> JPS-SLE-000 <Field id='contingencia2NT' name='contingencia2NT' type='number' className='form-control'/>
                                            {
                                                errors.contingencia1NT && touched.contingencia1NT && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='contingencia1NT'></ErrorMessage>
                                                    </div>
                                                )
 
                                            }
                                            {
                                                errors.contingencia2NT && touched.contingencia2NT && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='contingencia2NT'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td style={{fontWeight : 'bold'}}>JPS-SLE-000 <Field id='contingenciaNTR' name='contingenciaNTR' type='number' className='form-control'/>
                                            {
                                                errors.contingenciaNTR && touched.contingenciaNTR && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='contingenciaNTR'></ErrorMessage>
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


MarchamoNuevosTiempos.propTypes = {
    marchamoApertNT: PropTypes.string,
    marchamoApertNTR: PropTypes.string,
};


export default MarchamoNuevosTiempos;
