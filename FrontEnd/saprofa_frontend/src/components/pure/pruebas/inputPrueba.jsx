import React from 'react';
import { ErrorMessage, Field} from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

const InputPrueba = ({ testNum }) => {
    return (
        <div>
            {({ touched,
                errors,} ) => (
                    <td>
                        <div className='row'>
                            <Field id={`bolita${testNum}`} name={`bolita${testNum}`} type='number' className='form-control col m-4'/>
                            <i className='bi bi-x-square-fill col-1 me-3 closeX'></i>
                        </div>
                            {
                                errors.bolita1 && touched.bolita1 && 
                                (
                                    <div style={{color:'red'}}>
                                        <ErrorMessage name={`bolita${testNum}`}></ErrorMessage>
                                    </div>
                                )
                            }
                    </td>
            )}
        </div>
    );
}

export default InputPrueba;
