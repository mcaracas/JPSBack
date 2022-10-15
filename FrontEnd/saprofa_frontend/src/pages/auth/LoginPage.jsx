import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import LoginForm from '../../components/pure/forms/loginForm';
import '../../styles/login.scss';

const LoginPage = () => {
    return (
        <div>
            <EncabezadoFranjas titulo= {"Iniciar sesión"}></EncabezadoFranjas>
            <div className='login-card'>
                <h3>Inicio de Sesión</h3>
                <LoginForm></LoginForm> {/** Form component */}
            </div>
        </div>
    );
}

export default LoginPage;
