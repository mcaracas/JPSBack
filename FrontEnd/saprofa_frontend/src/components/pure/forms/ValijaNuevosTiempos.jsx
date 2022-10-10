import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, Grid } from '@mui/material';

const pruebasSchema = Yup.object().shape(
    {
        valija : Yup.string()
                .required('Valija requerida'),
        
    }
);

const ValijaNuevosTiempos = () => {
    const initialValues = {
        valija : '',
        bolitas : []
    }
    return (
        // <div>
        //     <Formik>
        //         {/* onSubmit={async (values) => {
        //             await new Promise((r) => setTimeout(r,1000));
        //             alert(JSON.stringify(values,null,2));
        //             // We save the data in the localStorage
        //             await localStorage.setItem('credentials', values);
        //         }} */}
        //         <table className='table table-bordered'>
        //             <thead>
        //                 <tr>
        //                     <th colSpan={6}>Pruebas de bolitas Nuevos Tiempos y Reventados</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 <tr>
        //                     <th style={{width:'50px', height:'80px'}}>Valija <br/><input type={'text'}/></th>
        //                     <td style={{width:'50px', height:'80px'}}><input type={'text'}/></td>
        //                     <td style={{width:'50px', height:'80px'}}><input type={'text'}/></td>
        //                     <td style={{width:'50px', height:'80px'}}><input type={'text'}/></td>
        //                     <td style={{width:'50px', height:'80px'}}><input type={'text'}/></td>
        //                     <td style={{width:'50px', height:'80px'}}><input type={'text'}/></td>
        //                 </tr>
        //             </tbody>
        //         </table>
        //     </Formik>
        // </div>
                <Formik 
                    initialValues={{initialValues}}
                    validationSchema={pruebasSchema}
                    onSubmit={()=>{}}
                >
                    {({ values, 
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur
                    }) =>(
                        <Form>
                            <label htmlFor="valija">Valija</label>
                            <Field id="valija" type="text" name="valija" placeholder="Valija" size="3"/>
                            <Field id="bolitas[0]" type="number"/>
                            <Field id="bolitas[1]" type="number"/>
                            <Field id="bolitas[2]" type="number"/>
                            <Field id="bolitas[3]" type="number"/>
                            <Field id="bolitas[4]" type="number"/>
                            <Field id="bolitas[5]" type="number"/>
                            <Field id="bolitas[6]" type="number"/>
                            <Field id="bolitas[7]" type="number"/>
                            <Field id="bolitas[8]" type="number"/>
                            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                        </Form>
                    )}
                </Formik>
    );
};


export default ValijaNuevosTiempos;
