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
    aperturaS1 : Yup.number().required('El campo es requerido'),
    cierreS : Yup.number().required('El campo es requerido'),
    aperturaS2 : Yup.number().required('El campo es requerido'),
    aperturaS3 : Yup.number().required('El campo es requerido'),
    aperturaS4 : Yup.number().required('El campo es requerido'),
    aperturaN: Yup.number().required('El campo es requerido'),
    cierreN: Yup.number().required('El campo es requerido'),
    aperturaAcumFich: Yup.number().required('El campo es requerido'),
    cierreAcumFich: Yup.number().required('El campo es requerido'),
    aperturaAcumTula: Yup.number().required('El campo es requerido'),
    cierreAcumTula: Yup.number().required('El campo es requerido')

});

let marchamoDefault = {
    idSorteo : 6,
    tipo : 'Apertura',
    valija : '',
    tipoMarchamo : 'Serie',
    numeroMarchamo : '1525',
}


const buildMarchamoList = (values) => {
    // console.log(values);
    const marchamos = [];

    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLT-S-0000${values.aperturaS1}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLT-S-0000${values.aperturaS2}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLT-S-0000${values.aperturaS3}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLT-S-0000${values.aperturaS4}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLT-S-0000${values.cierreS}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'Numero',
            numeroMarchamo : `JPS-SLT-N-0000${values.aperturaN}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Cierre',
            tipoMarchamo : 'Numero',
            numeroMarchamo : `JPS-SLT-N-0000${values.cierreN}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'AcumuladoFichero',
            numeroMarchamo : `JPS-SLT-OTROS 000${values.aperturaAcumFich}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'AcumuladoFichero',
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLT-OTROS 000${values.cierreAcumFich}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'AcumuladoTula',
            numeroMarchamo : `JPS-SLT-OTROS 000${values.aperturaAcumTula}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipoMarchamo : 'AcumuladoTula',
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLT-OTROS 000${values.cierreAcumTula}`,
        }
    );
    // console.log(marchamos);
    return marchamos;
}

const MarchamoPopular = (id) => {
    return (
        <div className='container'>
            <Formik
                initialValues={{}}
                validationSchema={marchamoSchema}
                onSubmit={async (values)=>{
                    const marchamoList = buildMarchamoList(values);
                    // console.log(values)
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
                                <thead className='thead-dark'>
                                    <tr>
                                        <th colSpan={3}>Numero de marchamo y valija </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Apertura</th>
                                        <th>Cierre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th rowSpan={4}>Series</th>
                                        <td >JPS-SLT-S-0000 <Field id='aperturaS1' name='aperturaS1' type='number' className='form-control'/>
                                            { 
                                                errors.aperturaS1 && touched.aperturaS1 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS1'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td rowSpan={4}>JPS-SLT-S-0000 <Field id='cierreS' name='cierreS' type='number' className='form-control'/>
                                            {
                                                errors.cierreS && touched.cierreS && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreS'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS2' name='aperturaS2' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS2 && touched.aperturaS2 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS2'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS3' name='aperturaS3' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS3 && touched.aperturaS3 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS3'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JPS-SLT-S-0000 <Field id='aperturaS4' name='aperturaS4' type='number' className='form-control'/>
                                            {
                                                errors.aperturaS4 && touched.aperturaS4 && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaS4'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Numeros</th>
                                        <td>JPS-SLT-N-0000 <Field id='aperturaN' name='aperturaN' type='number' className='form-control'/>
                                            {
                                                errors.aperturaN && touched.aperturaN && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLT-N-0000 <Field id='cierreN' name='cierreN' type='number' className='form-control'/>
                                            {
                                                errors.cierreN && touched.cierreN && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreN'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Acumulado</th>
                                        <td>
                                            JPS-OTROS 000 <Field id='aperturaAcumFich' name='aperturaAcumFich' type='number' className='form-control'/> fichero<br/>
                                            {
                                                errors.aperturaAcumFich && touched.aperturaAcumFich && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='aperturaAcumTula' name='aperturaAcumTula' type='number' className='form-control'/> tula
                                            {
                                                errors.aperturaAcumTula && touched.aperturaAcumTula && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaAcumTula'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                        </td>
                                        <td colSpan={2}>
                                        JPS-OTROS 000 <Field id='cierreAcumFich' name='cierreAcumFich' type='number' className='form-control'/> fichero<br/>
                                            {
                                                errors.cierreAcumFich && touched.cierreAcumFich && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierreAcumFich'></ErrorMessage>
                                                    </div>
                                                )
                                            } 
                                            JPS-OTROS 000 <Field id='cierreAcumTula' name='cierreAcumTula' type='number' className='form-control'/> tula
                                            {
                                                errors.cierreAcumTula && touched.cierreAcumTula && 
                                                (
                                                    <div style={{color:'red'}}>
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


MarchamoPopular.propTypes = {

};


export default MarchamoPopular;
