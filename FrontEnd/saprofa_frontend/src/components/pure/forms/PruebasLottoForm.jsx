import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import '../../../styles/pruebas/pruebasForms.sass'
import InputPrueba from '../pruebas/InputPrueba';

// TODO: check props to receive and information to send to Backend

/**
 * Validation schema for the form
 * @type {Yup.ObjectSchema}
 * valija: string, required
 * all the other fields must be number and required
 */

const pruebasSchema = Yup.object().shape({
    valija: Yup.string().required('Valija requerida'),
    bolita: Yup.number().required('Campo requerido')
});


const InputList = () => {

    /**
     * An array containing objects with the property bolita
     * bolita is the number of the bolita in the test
     * and the value to put in the input field
     * @type {Array}
     */
    const [inputFields, setInputFields] = useState([{ bolita: '' }, { bolita: '' }, { bolita: '' }, { bolita: '' }, { bolita: '' }]);

    /**
     * Function to write in the input fields
     * @param {int} index 
     * @param {event} event 
     */
    const handleFormChange = (index, event) => {
        console.log(inputFields)
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
        let newField = { bolita: '' };
        setInputFields([...inputFields, newField]);
    }

    /**
     * Removes an input field from the form with the given index
     * @param {int} index 
     */
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    }

    const checkNumberOfTests = () => {
        if (inputFields.length % 3 !== 0) {
            return false;
        }
    }

    return (
        <div className='container'>
            <Formik
                initialValues={{}}

                validate={(values) => {
                    let err = {};
                    if (!values.valija) {
                        err.valija = 'Valija requerida';
                    }
                    // if(!values.bolita) {
                    //     err.bolita = 'Campo requerido';
                    // }

                    return err;
                }}
                onSubmit={(values) => {
                    console.log('Form submitted');
                }}>
                {({ values, touched,
                    errors, isSubmitting, handleSubmit,
                    handleChange }) => (
                    <div className='container'>
                        <Form onSubmit={handleSubmit}>
                            <div className='row'>
                                <table className='table table-bordered align-middle col'>
                                    <thead>
                                        <tr>
                                            <th colSpan={11}>Pruebas realizadas antes del sorteo<br /> Números favorecidos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Valija <br />
                                                <Field id='valija' name='valija' type='text' className='form-control' />
                                                <ErrorMessage name='valija' component={
                                                    ({ children }) => <div className='text-danger'>{children}</div>
                                                } />
                                            </th>
                                            {inputFields.map((input, index) => {
                                                return (
                                                    <InputPrueba
                                                        key={index}
                                                        index={index}
                                                        input={input}
                                                        handleFormChange={handleFormChange}
                                                        removeFields={removeFields} />


                                                )
                                            }
                                            )
                                            }
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
