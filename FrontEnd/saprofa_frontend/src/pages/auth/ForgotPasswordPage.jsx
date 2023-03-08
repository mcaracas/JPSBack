import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ForgotPassword from '../../components/pure/forms/Forgotpassword';
import '../../styles/login.scss';

const ForgotPasswordPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Recuperar Contraseña"}></EncabezadoFranjas>
            <div className='login-card'>
                <ForgotPassword></ForgotPassword> {/** Form component */}
            </div>
        </div>
    );
}

export default ForgotPasswordPage;