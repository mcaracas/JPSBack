import React from 'react';
import LoginForm from '../../components/pure/forms/loginForm';
import '../../styles/login.scss';



const LoginPage = () => {
    return (
        <div>
            <header>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <div className="col-4 logo" >
                            <img className="card-img-top" src={require('./../../img/logo_peq.png')} 
                                alt='nombre' style={{height:'60px',width:'60px'}} />
                        </div>
                        <div className='col-1'>
                            <button className='btn'>
                                <i class="bi bi-question-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className='login-card'>
                <h3>Inicio de Sesión</h3>
                <LoginForm></LoginForm>
            </div>
        </div >
    );
}

export default LoginPage;
