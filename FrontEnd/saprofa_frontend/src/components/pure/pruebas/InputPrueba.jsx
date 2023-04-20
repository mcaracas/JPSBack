import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../../../styles/pruebas/pruebasForms.sass'

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Número requerido';
  } else if (!/^[0-9]$/.test(value)) {
    error = 'Debe ser un número entre 0 y 9';
  }
  return error;
}

const InputPrueba = ({ name, value, handlePruebaChange, idxPrueba, idxResultado, formik }) => {
  return (
    <div>
      <Field
        name={name}
        type='text'
        value={value}
        className='form-control mx-auto'
        onChange={(event) => handlePruebaChange(event.currentTarget.value, idxPrueba, idxResultado)}
        validate={validateNumber}
      />
      { formik.errors && formik.touched?.pruebas?.[idxPrueba]?.resultados?.[idxResultado] && 
        <ErrorMessage name={name} component={() => {
          return <div className='error'>{formik.touched?.pruebas?.[idxPrueba]?.resultados?.[idxResultado]}</div>
        }} />
      }
    </div>
  );
}


export default InputPrueba;
