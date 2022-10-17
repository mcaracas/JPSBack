import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { insertMarchamo } from '../../../services/axiosService'


/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * all the fields must be numbers and required
 * except for contingencia, this is optional
 */
const marchamoSchema = Yup.object().shape({
    aperturaValjA: Yup.number().required('El campo es requerido'),
    aperturaValjB: Yup.number().required('El campo es requerido'),
    cierrejValjA: Yup.number().required('El campo es requerido'),
    cierrejValjB: Yup.number().required('El campo es requerido'),
    contingencia: Yup.number()
});

let marchamoDefault = {
    idSorteo : 2,
    tipo : 'Apertura',
    valija : 'A',
    tipoMarchamo : 'Electronica',
    numeroMarchamo : '1525',
}


const buildMarchamoList = (values) => {

    const marchamos = [];
    marchamos.push(
        {
            ...marchamoDefault,
            numeroMarchamo : `JPS-SLE-000${values.aperturaValjA}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Cierre',
            numeroMarchamo : `JPS-SLE-000${values.cierrejValjA}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            valija : 'B',
            numeroMarchamo : `JPS-SLE-000${values.aperturaValjB}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Cierre',
            valija : 'B',
            numeroMarchamo : `JPS-SLE-000${values.cierrejValjB}`,
        }
    );
    marchamos.push(
        {
            ...marchamoDefault,
            tipo : 'Contingencia',
            numeroMarchamo : `JPS-SLE-000${values.contingencia}`,
        }
    );
    
    return marchamos;
}

const Marchamo3Monazos = (id) => {
    return (
        <div className='container'>
            <h1>Marchamos 3 Monazos</h1>
            <Formik
                initialValues={{}}
                validationSchema={marchamoSchema}
                onSubmit={async (values)=>{
                    const marchamos = buildMarchamoList(values);
                    console.log(marchamos);
                    insertMarchamo(marchamos)
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
                                        <th colSpan={5}>Número de marchamos para los ficheros</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th colSpan={2}>Apertura</th>
                                        <th colSpan={2}>Cierre</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Valija A</th>
                                        <th>Valija B</th>
                                        <th>Valija A</th>
                                        <th>Valija B</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Plástico</td>
                                        <td>JPS-SLE-000 <Field id='aperturaValjA' name='aperturaValjA' type='number' className='form-control'/>
                                            {
                                                errors.aperturaValjA && touched.aperturaValjA && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaValjA'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='aperturaValjB' name='aperturaValjB' type='number' className='form-control'/>
                                            {
                                                errors.aperturaValjB && touched.aperturaValjB && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='aperturaValjB'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='cierrejValjA' name='cierrejValjA' type='number' className='form-control'/>
                                            {
                                                errors.cierrejValjA && touched.cierrejValjA && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierrejValjA'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='cierrejValjB' name='cierrejValjB' type='number' className='form-control'/>
                                            {
                                                errors.cierrejValjB && touched.cierrejValjB && 
                                                (
                                                    <div style={{color:'red'}}>
                                                        <ErrorMessage name='cierrejValjB'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contingencia</td>
                                        <td colSpan={2}>JPS-SLE-000 <Field id='contingencia' name='contingencia' type='number' className='form-control'/></td>
                                        <td colSpan={2}></td>
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


Marchamo3Monazos.propTypes = {

};


export default Marchamo3Monazos;
