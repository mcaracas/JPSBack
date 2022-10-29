import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

const InputPrueba = ({ index, input, handleFormChange, removeFields }) => {

    // function validate(value){
    //     let error;
    //     console.log('1');
    //     if (!value) {
    //         error = 'Campo requerido';
    //     }
    //     return error;
    // }

    return (
        <td key={index}>
            <div className='row'>
                <Field  id={index} 
                        name={`bolita`}
                        type='text' 
                        className='form-control col m-2' 
                        value={input.bolita}
                        // validate={validate}
                        onChange={event => handleFormChange(index, event)}
                />
                <i 
                    className='bi bi-x-square-fill col-1 me-2 closeX'
                    onClick={() => removeFields(index)}
                />
            </div>
            <ErrorMessage name={`bolita`} component={() => {
                return <div className='error'>{"Error"}</div>
            }}/> 
        </td>
    );
}


export default InputPrueba;
