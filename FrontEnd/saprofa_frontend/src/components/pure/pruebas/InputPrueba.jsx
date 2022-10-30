import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

const InputPrueba = ({ index, input, handleFormChange, removeFields, name }) => {

    // function validate(value){
    //     let error;
    //     //console.log(value);
    //     if (!value) {
    //         error = 'Campo requerido';
    //     }
    //     return error;
    // }

    return (
        <td key={index}>
            <div className='row'>
                <Field  id={index} 
                        name={`bolita${index}`}
                        type='text' 
                        className='form-control col' 
                        // value={input[name]}
                        //validate={ validate }
                        onChange={event => handleFormChange(index, event)}
                />
                <i 
                    className='bi bi-x-square-fill col-2 closeX'
                    onClick={() => removeFields(index)}                />
            </div>
            {/* <ErrorMessage name={name} component={() => {
                return <div className='error'>{"Campo Requerido"}</div>
            }}/>  */}
        </td>
    );
}


export default InputPrueba;
