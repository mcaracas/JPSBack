import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import InputPrueba from '../pruebas/InputPrueba';

// TODO: check props to receive and information to send to Backend

const Pruebas3MonazosForm = () => {

   
    /**
     * Initialize an array with 6 fields, each field with an object with a bolita property
     * indicating its index
     * @var {bolita: object} its property bolita is the index of the field
     * @returns {Array} Array with 6 fields, each field containing an object with a bolita property
     * initialized empty
     */
    const initializeInputFields = () => {
        let numBolita = 'bolita';
        let inputFields = [{}];
        for(let i = 0; i < 6; i++){
            numBolita = `bolita${i}`;
            inputFields[i] = {
                [numBolita] : ''
            }
        }
        return inputFields;
    }

    /**
     * Hook useState on inputFields
     */
    const [inputFields, setInputFields] = useState([{bolita0: ''},{bolita1: ''},{bolita2: ''},{bolita3: ''},{bolita4: ''},{bolita5: ''}]);

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
        let numBolita = `bolita${inputFields.length}`;
        let newField = {[numBolita]:''};
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

    function checkIfAllFieldsAreFilled(numberOfFields) {
        let emptyFields = 0;
        for (let i = 0; i < numberOfFields.length; i++) {
            if (numberOfFields[i].bolita === '') {
                emptyFields++;
            }
        }
        if (emptyFields > 0) {
            alert(`Hay ${emptyFields} campos vacíos. Por favor, llene todos los campos`);
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
                    let numBolita;
                    if(!values.valija){
                        errors.valija = 'Valija requerida';	
                    }

                    for(let i = 0; i < inputFields.length; i++){
                        numBolita = `bolita${i}`;
                        if(!inputFields[i][numBolita]){
                           errors = {
                                 ...errors,
                                [numBolita]: 'Campo requerido',
                           }
                        }
                        if(inputFields[i][numBolita] > 7 || inputFields[i][numBolita] < 0){
                            errors = {
                                ...errors,
                                [numBolita]: 'Debe ser un número entre 0 y 7',
                            }
                        }
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
                        <div className='container-fluid'>
                            <Form>
                                <div className='row'>
                                    <table className='table table-bordered align-middle mt-5 col'>
                                        <thead>
                                            <tr>
                                                <th colSpan={11}>Pruebas realizadas antes del sorteo<br/> Números favorecidos</th>
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
                                                        as = 'select' 
                                                        className='form-control valija'
                                                    >
                                                        <option value='A' defaultValue>A</option>
                                                        <option value='B'>B</option>
                                                        <option value='C'>C</option>
                                                    </Field>
                                                    <ErrorMessage name='valija' component={() => {
                                                        return <div className='error'>{errors.valija}</div>
                                                    }}/>
                                                </th>
                                                {
                                                    inputFields.map((input, index) => {
                                                        let numBolita = `bolita${index}`;
                                                        return(
                                                            <InputPrueba
                                                                key={index}
                                                                index = { index } 
                                                                input = {input}
                                                                handleFormChange = { handleFormChange }
                                                                removeFields = { removeFields }
                                                                name = {numBolita}
                                                                errorMsg = {errors[numBolita]}
                                                            >
                                                            {/* <ErrorMessage name={`bolita${index}`} component={() => {
                                                                return <div className='error'>{errors[numBolita]}</div>
                                                            }}/>  */}
                                                            </InputPrueba>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='button-field col-1 mt-5 '>
                                        <button 
                                            type='button' 
                                            className='btn btn-success'
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
