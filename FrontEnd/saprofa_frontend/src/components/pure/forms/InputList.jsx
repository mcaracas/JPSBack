import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import '../../../styles/pruebas/pruebasForms.sass'

// TODO: check props to receive and information to send to Backend

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * valija: string, required
 * all the other fields must be number and required
 */


const pruebasSchema = Yup.object().shape(
    {
        valija : Yup.string().required('Valija requerida'),
        bolita1 : Yup.number().required('Campo requerido'),
        bolita2 : Yup.number().required('Campo requerido'),
    }
    );
    
    
const InputList = () => {

    
    const [inputFields, setInputFields] = useState([{bolita:''},{bolita:''},{bolita:''}]);

    /**
     * Function to write in the input fields
     * @param {int} index 
     * @param {event} event 
     */
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    /**
     * Adds a new input field to the form
     */
    const addFields = () => {
        let newField = {bolita:''};
        setInputFields([...inputFields, newField]);
    }

    /**
     * Removes an input field from the form with the given index
     * @param {int} index 
     */
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index,1 );
        setInputFields(data);
    }

    return (
        <div className='container'>
            <Formik
                initialValues={{}}
                validationSchema={pruebasSchema}
                onSubmit={()=>{}}
                >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <div className='container'>
                            <h1>Pruebas 3 Monazos</h1>
                            <Form>
                                <div className='row'>
                                    <table className='table table-bordered align-middle col'>
                                        <thead>
                                            <tr>
                                                <th colSpan={11}>Pruebas realizadas antes del sorte<br/> Números favorecidos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Valija <br/><Field id='valija' name='valija' type='text' className='form-control'/>
                                                        {
                                                            errors.valija && touched.valija && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='valija'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </th>
                                                {
                                                    inputFields.map((input, index) => {
                                                        return(
                                                            <td key={index}>
                                                                <div className='row'>
                                                                    <Field  id={index} 
                                                                            name='bolita'
                                                                            type='text' 
                                                                            className='form-control col m-4' 
                                                                            value={input.bolita}
                                                                            onChange={event => handleFormChange(index, event)}
                                                                    />
                                                                    <i 
                                                                        className='bi bi-x-square-fill col-1 me-3 closeX'
                                                                        onClick={() => removeFields(index)}
                                                                    />
                                                                </div>
                                                            </td>
                                                        )
                                                    })
                                                }

                                                {/* <td>
                                                    <div className='row'>
                                                        <Field id='bolita1' name='bolita1' type='number' className='form-control col m-4'/>
                                                        <i className='bi bi-x-square-fill col-1 me-3' style={{ color: 'red' }}></i>
                                                    </div>
                                                        {
                                                            errors.bolita1 && touched.bolita1 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita1'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td>
                                                <div className='row'>
                                                    <Field id='bolita2' name='bolita2' type='number' className='form-control col m-4'/>
                                                    <i className='bi bi-x-square-fill col-1 me-3' style={{ color: 'red' }}></i>
                                                </div>
                                                        {
                                                            errors.bolita2 && touched.bolita2 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita2'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td>
                                                <td><Field id='bolita3' name='bolita3' type='number' className='form-control'/>
                                                        {
                                                            errors.bolita3 && touched.bolita3 && 
                                                            (
                                                                <div style={{color:'red'}}>
                                                                    <ErrorMessage name='bolita3'></ErrorMessage>
                                                                </div>
                                                            )
                                                        }
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='button-field col-1'>
                                        <button 
                                            type='button' 
                                            className='btn btn-success btn-sm'
                                            onClick={addFields}
                                        >Agregar Prueba</button>
                                        {isSubmitting ? <p>Submitting...</p> : null}
                                    </div>
                                </div>
                                <div className='button-field'>
                                    <button type="submit" className='btn'>Registrar Pruebas</button>
                                    {isSubmitting ? <p>Submitting...</p> : null}
                                </div>
                            </Form>
                        </div>
                    )}
            </Formik>
        </div>
    );
};


InputList.propTypes = {

};


export default InputList;
