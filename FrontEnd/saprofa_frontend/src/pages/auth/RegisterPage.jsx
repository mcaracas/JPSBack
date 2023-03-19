import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import RegisterForm from '../../components/pure/forms/registerForm';
import '../../styles/login.scss';

const RegisterPage = () => {
    return (
        <div>
            <EncabezadoFranjas title= {"Registro de Usuario"}></EncabezadoFranjas>
            <div className='login-card'>
                <h3>Registro de Usuario</h3>
                <RegisterForm></RegisterForm>
                <div className='mt-3'>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
