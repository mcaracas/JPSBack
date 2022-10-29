import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import InputPrueba from '../pruebas/InputPrueba';

// TODO: check props to receive and information to send to Backend

const Pruebas3MonazosForm = () => {

    /**
     * An array containing objects with the property bolita
     * bolita is the number of the bolita in the test
     * and the value to put in the input field
     * @type {Array}
     */
    const [inputFields, setInputFields] = useState([{bolita: ''},{bolita: ''},{bolita: ''},{bolita: ''},{bolita: ''},{bolita: ''}]);
    
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
     * bolita is the number shown in the test 
     * and the value to put in the input
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

    function checkNumberOfTests(numberOfFields) {
        let difference = numberOfFields.length%3;
        if (numberOfFields.length % 3 !== 0) {
            alert(`Las pruebas deben ir en grupos de 3. Elimine ${difference} números o agregue ${3-difference} números`);
            return false;
        }
        return true;
    }

    return (
        <div className='container'>
            <Formik
                initialValues={{valija:''}}
                validate = { values => {
                    let errors = {};
                    if(!values.valija){
                        errors.valija = 'Valija requerida';	
                    }

                    for(let i in inputFields){
                        if(!inputFields[i].bolita){
                            errors.bolita = 'Falta algún campo';
                        }
                    }

                    if(errors.bolita){
                       console.log(errors.bolita);
                    }

                    return errors;
                }}
                onSubmit={
                    (values) => {
                        console.log(values);
                        console.log('Form submitted');
                        alert('Form submitted');
                    }
                }
                >
                {({ errors, }) => (
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
                                                <th>
                                                    <label htmlFor='valija'>Valija</label>
                                                    <Field 
                                                        id='valija' 
                                                        name='valija' 
                                                        type='text' 
                                                        className='form-control'
                                                    />
                                                    <ErrorMessage name='valija' component={() => {
                                                        return <div className='error'>{errors.valija}</div>
                                                    }}/>
                                                </th>
                                                {
                                                    inputFields.map((input, index) => {
                                                        return(
                                                            <InputPrueba
                                                                key={index}
                                                                index = { index } 
                                                                input = {input}
                                                                handleFormChange = { handleFormChange }
                                                                removeFields = { removeFields }
                                                            >
                                                            </InputPrueba>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='button-field col-1'>
                                        <button 
                                            type='button' 
                                            className='btn btn-success btn-sm'
                                            onClick={addFields}
                                        >
                                            Agregar Prueba
                                        </button>
                                    </div>
                                </div>
                                <div className='button-field'>
                                    <button type="submit" className='btn'>Registrar Pruebas</button>                                    
                                </div>
                            </Form>
                        </div>
                    )}
            </Formik>
        </div>
    );
};


export default Pruebas3MonazosForm;
