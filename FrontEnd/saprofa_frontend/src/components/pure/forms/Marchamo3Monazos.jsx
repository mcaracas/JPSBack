import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const marchamoSchema = Yup.object().shape({
    aperturaValjA: Yup.number().required('El campo es requerido'),
    aperturaValjB: Yup.number().required('El campo es requerido'),
    cierrejValjA: Yup.number().required('El campo es requerido'),
    cierrejValjB: Yup.number().required('El campo es requerido'),
    contingencia: Yup.number()
});

const Marchamo3Monazos = () => {
    return (
        <div>
            <Formik
                initialValues={{}}
                validationSchema={marchamoSchema}
                onSubmit={()=>{}}
                >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <Form>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th colSpan={5}>Número de marchamos para los ficheros</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th colSpan={2}>Apertura</th>
                                        <th colSpan={2}>Cierre</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Valija A</th>
                                        <th>Valija B</th>
                                        <th>Valija A</th>
                                        <th>Valija B</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Plástico</td>
                                        <td>JPS-SLE-000 <Field id='aperturaValjA' name='aperturaValjA' type='number'/>
                                            {
                                                errors.aperturaValjA && touched.aperturaValjA && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaValjA'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='aperturaValjB' name='aperturaValjB' type='number'/>
                                            {
                                                errors.aperturaValjB && touched.aperturaValjB && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='aperturaValjB'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='cierrejValjA' name='cierrejValjA' type='number'/>
                                            {
                                                errors.cierrejValjA && touched.cierrejValjA && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierrejValjA'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>JPS-SLE-000 <Field id='cierrejValjB' name='cierrejValjB' type='number'/>
                                            {
                                                errors.cierrejValjB && touched.cierrejValjB && 
                                                (
                                                    <div>
                                                        <ErrorMessage name='cierrejValjB'></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contingencia</td>
                                        <td colSpan={2}>JPS-SLE-000 <Field id='contingencia' name='contingencia' type='number'/></td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    )}
            </Formik>
        </div>
    );
};


Marchamo3Monazos.propTypes = {

};


export default Marchamo3Monazos;
