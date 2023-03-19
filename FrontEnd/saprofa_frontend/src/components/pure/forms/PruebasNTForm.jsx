import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'
import InputPrueba from '../pruebas/InputPrueba';
import { insertPrueba, insertListaPrueba } from '../../../services/axiosService';

const PruebasNTForm = ({IdDatoSorteo}) => {
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
        for(let i = 0; i < 5; i++){
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
    const [inputFields, setInputFields] = useState(initializeInputFields());

    /**
     * Function to write in the input fields
     * @param {int} index 
     * @param {event} event 
     */
     const handleFormChange = (index, event) => {
        let data = [...inputFields];
        //sets the value of the input field to uppercase
        data[index][event.target.name] = event.target.value.toUpperCase();
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

    /**
     * The tests have to be in group of five
     * @param {int} numberOfFields 
     * @returns {int} the number of fields left over from forming groups of five
     */
     function checkNumberOfTests(numberOfFields) {
        let difference = numberOfFields.length%5;
        if (numberOfFields.length % 5 !== 0) {
            return difference;
        }
        return 0;
    }

    /**
     * The list of tests is sent to the backend
     * @returns {Array} an array of objects with the id of the lottery and the number of the bolita of the test     
     */
    const testListSubmit = (values) => {
        const list = [];

        const idDatoSorteo = IdDatoSorteo;
        let numBolita = '';
        for (let i = 0; i < inputFields.length; i++){
            numBolita = `bolita${i}`;
            list.push({
                valija : values.valija,
                idDatoSorteo: idDatoSorteo,
                numero: inputFields[i][numBolita],
            });
        }
        return list;
    }


    return (
        <div className='container'>
            <Formik
                initialValues={{valija:''}}
                validate = { values => {
                    let errors = {};
                    let numBolita;
                    let numberOfFields = checkNumberOfTests(inputFields);
                    if(numberOfFields !== 0){
                        alert(`Las pruebas deben ir en grupos de 5. Elimine ${numberOfFields} pruebas o agregue ${5-numberOfFields} pruebas`);
                    }
                    values.valija = values.valija.toUpperCase();
                    if(!values.valija){
                        errors.valija = 'Valija requerida';	
                    } else if( values.valija !== 'A' && values.valija !== 'B' && values.valija !== 'C'){
                        errors.valija = 'Valija debe ser A, B o C';
                    }

                    for(let i = 0; i < inputFields.length; i++){
                        numBolita = `bolita${i}`;
                        // sets the value of the input field to values object
                        values[numBolita] = inputFields[i][numBolita];
                        if(!inputFields[i][numBolita]){
                           errors = {
                                 ...errors,
                                [numBolita]: 'Campo requerido',
                           }
                        }
                        else if(inputFields[i][numBolita] > 99 || inputFields[i][numBolita] < 0){
                            errors = {
                                ...errors,
                                [numBolita]: 'Debe ser un número entre 00 y 99',
                            }
                        } else if (isNaN(inputFields[i][numBolita]) && inputFields[i][numBolita] !== 'N/A') {
                            errors = {
                                ...errors,
                                [numBolita]: 'Debe ser un número o N/A',
                            }
                        }
                    }
                    return errors;
                }}
                onSubmit={
                    async (values)=>{
                        console.log(values);
                        let sent = true;
                        const listToSubmit = testListSubmit(values);
                        
                        insertListaPrueba(listToSubmit)
                            .then((response) => { 
                                if(response.status === 200){
                                    // alert('Prueba guardada con éxito');
                                }else{
                                    sent = false;
                                    throw new Error('Prueba no insertada');
                                }
                            }).catch((error) => { 
                                sent = false;
                                alert(`Algo salió mal: ${error}`);
                            }).finally(() => {
                                if(sent){
                                    alert('Pruebas guardadas con éxito');
                                }
                            })
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
                                                    <Field id='valija' name='valija' type='text' className='form-control'/>
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
}

export default PruebasNTForm;
