import React from 'react';
import { Field } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

const InputPrueba = ({ index, input, handleFormChange, removeFields }) => {
    return (
        <td key={index}>
            <div className='row'>
                <Field  id={index} 
                        name='bolita'
                        type='text' 
                        className='form-control col m-2' 
                        value={input.bolita}
                        onChange={event => handleFormChange(index, event)}
                />
                <i 
                    className='bi bi-x-square-fill col-1 me-2 closeX'
                    onClick={() => removeFields(index)}
                />
            </div>
        </td>
    );
}


export default InputPrueba;
