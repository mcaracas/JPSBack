import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

const InputPrueba = ({ index, input, handleFormChange, removeFields, name, errorMsg }) => {

    return (
        <td key={index}>
            <div className='row'>
                <Field  id={index} 
                        name={name}
                        type='text' 
                        className='form-control col' 
                        value={input[name]}
                        onChange={event => handleFormChange(index, event)}
                />
                <i 
                    className='bi bi-x-square-fill col-2 closeX'
                    onClick={() => removeFields(index)}                />
            </div>
            <ErrorMessage name={name} component={() => {
                return <div className='error'>{errorMsg}</div>
            }}/> 
        </td>
    );
}


export default InputPrueba;
